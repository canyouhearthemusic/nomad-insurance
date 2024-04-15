<?php

namespace App\Http\Controllers;

use App\Actions\Users\RegisterUser;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request, RegisterUser $action)
    {
        if ($user = $action->handle($request)) {
            return response()->json([
                'user' => $user,
                'token' => $user->createToken("user_id_{$user->id}_auth_token")->plainTextToken,
            ]);
        }
    }

    public function login(LoginUserRequest $request)
    {
        if (Auth::attempt($request->validated())) {

            $request->user()->tokens()->delete();
            
            return response()->json([
                'user' => $request->user(),
                'token' => $request->user()->createToken("user_id_{$request->user()->id}_auth_token")->plainTextToken,
            ]);
        }

        throw ValidationException::withMessages([
            'email' => 'The provided credentials are invalid'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged Out'
        ]);
    }
}
