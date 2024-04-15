<?php

namespace App\Actions\Users;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterUser
{
    public function handle(Request $request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
    }
}