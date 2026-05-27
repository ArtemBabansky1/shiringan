<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name'     => explode('@', $data['email'])[0],
            'email'    => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        Profile::create(['user_id' => $user->id]);

        $request->session()->regenerate();
        auth()->login($user);

        return response()->json(['user' => $this->userShape($user)]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Неверный email или пароль'],
            ]);
        }

        $request->session()->regenerate();
        auth()->login($user);

        return response()->json(['user' => $this->userShape($user)]);
    }

    public function logout(Request $request)
    {
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['ok' => true]);
    }

    public function me(Request $request)
    {
        return response()->json(['user' => $this->userShape($request->user())]);
    }

    private function userShape(User $user): array
    {
        return ['id' => $user->id, 'email' => $user->email];
    }
}
