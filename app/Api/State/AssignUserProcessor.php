<?php

namespace App\Api\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Contracts\BelongsToUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
        
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

}
