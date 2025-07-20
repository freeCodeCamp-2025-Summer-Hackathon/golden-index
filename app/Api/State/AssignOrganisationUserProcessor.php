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
        $user = Auth::guard('api')->user() ?? Auth::guard('web')->user();

        if (!$user) {
            throw new \Exception('No logged-in user detected in AssignOrganisationUserProcessor');
        }

        // If user already has organisation role, reject the creation request
        if ($user->hasRole('organisation')) {
            // Log::info('User already has organisation role; preventing duplicate organisation creation.');
            throw new \Exception('User is already an organisation.');
        }

        // Otherwise, create organisation and assign role
        try {
            $organisation = $this->persistProcessor->process($data, $operation, $uriVariables, $context);

            $user->assignRole('organisation');

            $organisation->users()->syncWithoutDetaching([$user->id]);

            return $organisation;

        } catch (\Throwable $e) {
            // Log::error('AssignOrganisationUserProcessor error: ' . $e->getMessage());
            throw $e;
        }
    }
}