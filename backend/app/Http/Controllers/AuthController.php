<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        if ($user = User::create($request->validated())) {
            return response()->json([
                'code' => Response::HTTP_OK,
                'message' => 'Registered',
                'token' => $user->createToken("user_{$user->id}_auth_token")->plainTextToken,
            ]);
        }
    }

    public function login(LoginUserRequest $request)
    {
        if (Auth::attempt($request->validated())) {
            return response()->json([
                'code' => Response::HTTP_OK,
                'message' => 'Logged In',
                'token' => $request->user()->createToken("user_id_{$request->user()->id}_auth_token")->plainTextToken,
            ]);
        }

        throw ValidationException::withMessages([
            'email' => 'The provided credentials are invalid'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'Logged Out'
        ]);
    }
}
