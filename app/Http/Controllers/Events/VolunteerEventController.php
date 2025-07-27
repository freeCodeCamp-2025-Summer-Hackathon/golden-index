<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Volunteer;

class VolunteerEventController extends Controller
{
    public function upcoming(Request $request)
    {
        $volunteer = Volunteer::where('user_id', $request->user()->id)->firstOrFail();

        $events = $volunteer->registeredEvents()
            ->upcoming()
            ->with('organisation', 'status', 'category')
            ->get();

        return response()->json($events);
    }

    public function past(Request $request)
    {
        $volunteer = Volunteer::where('user_id', $request->user()->id)->firstOrFail();

        $events = $volunteer->registeredEvents()
            ->past()
            ->with('organisation', 'status', 'category')
            ->get();

        return response()->json($events);
    }
}
