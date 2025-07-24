<?php

namespace App\Api\State;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Contracts\BelongsToUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AssignEventRegistrationUserProcessor implements ProcessorInterface
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

        if (
            $request->isMethod('post') &&
            $data instanceof BelongsToUser &&
            method_exists($data, 'setUserId')
        ) {
            $user = Auth::guard('api')->user() ?? Auth::guard('web')->user();
            if (!$user) {
                throw new \Exception('No logged-in user detected in AssignEventRegistrationUserProcessor');
            }
            // assign user/volunteer ID based on role 
            // allows user role because the user may be registering for an event for the first time
            // allows volunteer role because the user may have already registered for an event as a volunteer before
            elseif ($user->hasRole('user') && method_exists($data, 'setUserId')) { 
                $data->setUserId($user->id);
                $user->assignRole('volunteer'); // ensure user has volunteer role if its their first time registering 
            }
            elseif ($user->hasRole('volunteer') && method_exists($data, 'setVolunteerId')) {
                $data->setVolunteerId($user->id);
            }
        }
        
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

}