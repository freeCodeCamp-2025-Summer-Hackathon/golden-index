<?php

namespace App\Api\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Contracts\BelongsToUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\EventRegistration;

class AssignUserProcessor implements ProcessorInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private ProcessorInterface $persistProcessor
    ){
        
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $request = request();

        //dd('AssignUserProcessor: Processing data', [
        //    'method' => $request->getMethod(),
        //    'bearer_token' => $request->bearerToken(),
        //    'user_from_request' => optional($request->user())->id,
        //    'user_from_auth' => Auth::id(),
        //    'is_belongs_to_user' => $data instanceof BelongsToUser,
        //    'has_setUserId' => method_exists($data, 'setUserId'),
        //    'api_user' => Auth::guard('api')->user(),
        //    'web_user' => Auth::guard('web')->user(),
        //]);
        
        if (
            $request->isMethod('post') &&
            $data instanceof BelongsToUser &&
            method_exists($data, 'setUserId')
        ) {
            $user = Auth::guard('api')->user() ?? Auth::guard('web')->user();
            if (!$user) {
                throw new \Exception('No logged-in user detected in AssignUserProcessor');
            }
            $data->setUserId($user->id);
        }

        // Handle event_id for EventRegistration
        if ($data instanceof EventRegistration) {
            // Try to get event_id from various sources
            if (!$data->event_id) {
                // 1. From URI variables (if route is like /events/{eventId}/registrations)
                if (isset($uriVariables['eventId'])) {
                    $data->event_id = $uriVariables['eventId'];
                }
                // 2. From URI variables (if route uses 'event_id')
                elseif (isset($uriVariables['event_id'])) {
                    $data->event_id = $uriVariables['event_id'];
                }
                // 3. From request body
                elseif ($request->has('event_id')) {
                    $data->event_id = $request->input('event_id');
                }
                // 4. From request body (alternative naming)
                elseif ($request->has('eventId')) {
                    $data->event_id = $request->input('eventId');
                }
            }

            // Set default status if not provided
            if (!$data->event_registration_status) {
                $data->event_registration_status = 'pending';
            }

            // Generate registration_id if not set
            if (!$data->registration_id) {
                $data->registration_id = (string) \Illuminate\Support\Str::uuid();
            }

            Log::info('EventRegistration data before persist:', [
                'user_id' => $data->user_id,
                'event_id' => $data->event_id,
                'registration_id' => $data->registration_id,
                'status' => $data->event_registration_status,
            ]);
        }
        
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

}
