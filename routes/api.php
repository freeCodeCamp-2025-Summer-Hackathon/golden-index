<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Organisation;

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

Route::post('/organisations', function (Request $request) {
    $validate = $request->validate([
        'organisation_name' => 'required|string',
        'organisation_description' => 'nullable|string',
        'organisation_email' => 'required|email|unique:organisations,organisation_email',
        'organisation_phone' => 'nullable|string',
        'organisation_address' => 'nullable|string',
        'website' => 'nullable|url',
        'contact_info' => 'nullable|array',
        'mission_statement' => 'nullable|string',
        'org_type' => 'required|string',
    ]);
    try {
        $organisation = Organisation::create($validate);

    return response()->json($organisation, 201);
    }
    catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
})->middleware('auth:api');

Route::get('/organisations', function (Request $request) {
    return Organisation::all();
})->middleware('auth:api');

