<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Organisation;
use App\Models\Event;
use App\Models\VolunteerTimeLog;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('/volunteers', function (Request $request) {
    return response()->json([
        'authenticated_user_id' => $request->user()?->id,
        'user' => $request->user(),
    ]);
})->middleware('auth:api');

//Added GET and POST routes for Events
//Route::get('/event', function (Request $request) {
//    return Event::all();
//})->middleware('auth:api');

//Route::post('/event', function (Request $request) {
//
//    $validated = $request->validate([
//        'organisation_id' => 'required|uuid',
//        'event_title' => 'required|string|max:255',
//        'event_description' => 'nullable|string',
//        'start_datetime' => 'required|date',
//        'end_datetime' => 'required|date|after_or_equal:start_datetime',
//        'location' => 'nullable|string|max:255',
//        'event_address' => 'nullable|string|max:255',
//        'is_virtual' => 'boolean',
//        'max_volunteers' => 'required|integer|min:1',
//        'current_volunteers' => 'integer|min:0',
//        'is_urgent' => 'boolean',
//        'recurrence_pattern' => 'nullable|string|in:daily,weekly,monthly,none',
//        'category_id' => 'nullable|uuid',
//        'event_status_id' => 'nullable|integer', // Assuming this is an integer ID
//        'is_high_risk' => 'boolean',
//        'is_group_friendly' => 'boolean',
//        'required_skills' => 'nullable|array',
//    ]);
//
//    $event = Event::create([
//        'event_id' => $request->input('event_id', (string) Str::uuid()),
//        'organisation_id' => $validated['organisation_id'],
//        'event_title' => $validated['event_title'],
//        'event_description' => $validated['event_description'],
//        'start_datetime' => $validated['start_datetime'],
//        'end_datetime' => $validated['end_datetime'],
//        'location' => $validated['location'],
//        'event_address' => $validated['event_address'],
//        'is_virtual' => $validated['is_virtual'] ?? false,
//        'max_volunteers' => $validated['max_volunteers'],
//        'current_volunteers' => $validated['current_volunteers'] ?? 0,
//        'is_urgent' => $validated['is_urgent'] ?? false,
//        'recurrence_pattern' => $validated['recurrence_pattern'],
//        'category_id' => $validated['category_id'],
//    ]);
//    return response()->json($event, 201);
//})->middleware('auth:api');
//
//
//
//Route::get('/volunteer-time-log', function (Request $request) {
//    return VolunteerTimeLog::all();
//})->middleware('auth:api');
//
//Route::post('/volunteer-time-log', function (Request $request) {
//    $validated = $request->validate([
//        'volunteer_time_log_id' => 'required|uuid',
//        'user_id' => 'required|uuid|exists:users,id',
//        'event_id' => 'required|uuid|exists:events,id',
//        'check_in_time' => 'required|date',
//        'check_out_time' => 'required|date|after_or_equal:check_in_time',
//        'log_method' => 'required|string|in:manual,auto',
//        'dispute_reason' => 'nullable|string',
//        'volunteer_time_log_status' => 'required|string|in:pending,approved,rejected',
//        'is_disputed' => 'required|boolean',
//        'hours_logged' => 'required|numeric|min:0',
//        'created_at' => 'nullable|date',
//        'updated_at' => 'nullable|date',
//    ]);
//
//    $log = VolunteerTimeLog::create([
//        'id' => $validated['volunteer_time_log_id'],
//        'user_id' => $validated['user_id'],
//        'event_id' => $validated['event_id'],
//        'check_in_time' => $validated['check_in_time'],
//        'check_out_time' => $validated['check_out_time'],
//        'log_method' => $validated['log_method'],
//        'dispute_reason' => $validated['dispute_reason'],
//        'volunteer_time_log_status' => $validated['volunteer_time_log_status'],
//        'is_disputed' => $validated['is_disputed'],
//        'hours_logged' => $validated['hours_logged'],
//        'created_at' => $validated['created_at'] ?? now(),
//        'updated_at' => $validated['updated_at'],
//    ]);
//
//    return response()->json($log, 201);
//})->middleware('auth:api');

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
    $organisation = Organisation::create($validate);

    return response()->json($organisation, 201);
})->middleware('auth:api');

Route::get('/organisations', function (Request $request) {
    return Organisation::all();
})->middleware('auth:api');

