<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Organisation;
use App\Models\Event;
use App\Models\VolunteerTimeLog;
use App\Models\EventRegistration;
use App\Http\Controllers\Events\VolunteerEventController;
use App\Http\Controllers\Events\OrganisationEventController;
use App\Models\User;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::middleware('auth:sanctum')->group(function () {
    // Volunteers
    Route::get('/volunteer/events/upcoming', [VolunteerEventController::class, 'upcoming']);
    Route::get('/volunteer/events/past', [VolunteerEventController::class, 'past']);
    // Organisation-admins
    Route::get('/organisation/events/upcoming', [OrganisationEventController::class, 'upcomingEvents']);
    Route::get('/organisation/events/past', [OrganisationEventController::class, 'pastEvents']);
});

Route::post('/volunteers', function (Request $request) {
    return response()->json([
        'authenticated_user_id' => $request->user()?->id,
        'user' => $request->user(),
    ]);
})->middleware('auth:api');

Route::post('/volunteer-time-log', function (Request $request) {
    $validated = $request->validate([
        'volunteer_time_log_id' => 'required|uuid',
        'user_id' => 'required|uuid|exists:users,id',
        'event_id' => 'required|uuid|exists:events,id',
        'check_in_time' => 'required|date',
        'check_out_time' => 'required|date|after_or_equal:check_in_time',
        'log_method' => 'required|string|in:manual,auto',
        'dispute_reason' => 'nullable|string',
        'volunteer_time_log_status' => 'required|string|in:pending,approved,rejected',
        'is_disputed' => 'required|boolean',
        'hours_logged' => 'required|numeric|min:0',
        'created_at' => 'nullable|date',
        'updated_at' => 'nullable|date',
    ]);

    $log = VolunteerTimeLog::create([
        'id' => $validated['volunteer_time_log_id'],
        'user_id' => $validated['user_id'],
        'event_id' => $validated['event_id'],
        'check_in_time' => $validated['check_in_time'],
        'check_out_time' => $validated['check_out_time'],
        'log_method' => $validated['log_method'],
        'dispute_reason' => $validated['dispute_reason'],
        'volunteer_time_log_status' => $validated['volunteer_time_log_status'],
        'is_disputed' => $validated['is_disputed'],
        'hours_logged' => $validated['hours_logged'],
        'created_at' => $validated['created_at'] ?? now(),
        'updated_at' => $validated['updated_at'],
    ]);

    return response()->json($log, 201);
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
        'organisationName' => 'required|string',
        'organisationDescription' => 'nullable|string',
        'organisationEmail' => 'required|email|unique:organisations,organisation_email',
        'organisationPhone' => 'nullable|string',
        'organisationAddress' => 'nullable|string',
        'website' => 'nullable|url',
        'contactInfo' => 'nullable|array',
        'missionStatement' => 'nullable|string',
        'orgType' => 'required|string',
    ]);
    $organisation = Organisation::create($validate);

    return response()->json($organisation, 201);
})->middleware('auth:api');

Route::get('/organisations', function (Request $request) {
    return Organisation::all();
})->middleware('auth:api');

// to get all event registrations
Route::get('/event_registration', function (Request $request) {
    return EventRegistration::all();
})->middleware('auth:api');

// ['user_id', 'event_id', 'event_registration_status', 'created_at', 'updated_at', 'approved_at', 'notes'];

Route::post('/event_registration', function (Request $request) {
    $validated = $request->validate([
        'user_id' => 'required|uuid|exists:users, user_id',
        'event_id' => 'required|uuid|exists:events,event_id',
        'event_registration_status' => 'required|string|in:pending,approved, rejected',
        'notes' => 'nullable|string'
    ]);
    $registration = EventRegistration::create([
        'user_id' => $validated['user_id'],
        'event_id' => $validated['event_id'],
        'event_registration_status' => $validated['event_registration_status'],
        'notes' => $validated['notes'],
    ]);
  return response()->json($registration, 201);
})->middleware('auth:api');