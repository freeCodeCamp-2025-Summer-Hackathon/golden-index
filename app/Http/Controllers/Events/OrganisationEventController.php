<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class OrganisationEventController extends Controller
{
    public function upcomingEvents(Request $request)
    {
        $orgIds = $request->user()->organisations->pluck('organisation_id');

        $events = Event::whereIn('organisation_id', $orgIds)
            ->upcoming()
            ->with('status', 'category')
            ->get();

        return response()->json($events);
    }

    public function pastEvents(Request $request)
    {
        $orgIds = $request->user()->organisations->pluck('organisation_id');

        $events = Event::whereIn('organisation_id', $orgIds)
            ->past()
            ->with('status', 'category')
            ->get();

        return response()->json($events);
    }

}
