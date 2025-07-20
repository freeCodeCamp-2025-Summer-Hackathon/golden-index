<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/volunteers', function (Request $request) {
    return response()->json([
        'authenticated_user_id' => $request->user()?->id,
        'user' => $request->user(),
    ]);
})->middleware('auth:api');

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (! $token = JWTAuth::attempt($credentials)) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /** @var User $user */
    $user = JWTAuth::user(); // <- This fetches the user from the token manually

    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames(),
        ],
    ]);
});

Route::get('/jwt-debug', function (Request $request) {
    return [
        'user' => auth('api')->user(),
        'token' => $request->bearerToken(),
    ];
})->middleware('auth:api');