<?php

namespace App\Api\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventProvider implements ProviderInterface
{
    public function __construct(private Request $request)
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $user = $this->request->user();
        
        Log::info('EventProvider - Debug:', [
            'user_id' => $user?->id,
            'user_authenticated' => $user ? 'yes' : 'no',
            'operation' => $operation->getShortName(), // Get or GetCollection
            'total_events_in_db' => Event::count(),
        ]);

        // Build the query
        $query = Event::query();

        // Apply filtering based on user role (if authenticated)
        if ($user && $user->hasRole('super-admin')) {
            Log::info('EventProvider - Super admin: no filtering');
            // No filtering for super-admins
        } elseif ($user) {
            // Apply organization filtering for other authenticated users
            $userOrganisations = $user->organisations()->pluck('organisation_id');
            if ($userOrganisations->isNotEmpty()) {
                $query->whereIn('organisation_id', $userOrganisations);
            } else {
                Log::info('EventProvider - User has no organizations');
                return []; // Return empty array, not collect([])
            }
        }
        // If no user, still proceed (since security is disabled)

        // Handle single item requests (GET /api/events/{id})
        if (isset($uriVariables['id'])) {
            $event = $query->where('event_id', $uriVariables['id'])->first();
            Log::info('EventProvider - Single event result:', [
                'found' => $event ? 'yes' : 'no'
            ]);
            return $event;
        }

        // Handle collection requests (GET /api/events)
        // The key fix: return a simple array or the query result directly
        $events = $query->get();
        
        Log::info('EventProvider - Collection result:', [
            'count' => $events->count(),
            'return_type' => gettype($events),
        ]);

        // Return the collection directly - API Platform will handle pagination
        return $events->toArray(); // Convert to plain array
    }
}
