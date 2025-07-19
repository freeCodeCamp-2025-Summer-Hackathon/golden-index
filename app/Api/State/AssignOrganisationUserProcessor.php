<?php

namespace App\Api\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Contracts\BelongsToUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AssignOrganisationUserProcessor implements ProcessorInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private ProcessorInterface $persistProcessor
    ){}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        $organisation = $this->persistProcessor->process($data, $operation, $uriVariables, $context);

        $user = Auth::guard('api')->user() ?? Auth::guard('web')->user();

        if (!$user) {
            throw new \Exception('No logged-in user detected in AssignOrganisationUserProcessor');
        }

        if (!$user->hasRole('organisation')) {
            $user->assignRole('organisation');
        }
        
        $organisation->users()->syncWithoutDetaching([$user->id]);

        return $organisation;
    }
}