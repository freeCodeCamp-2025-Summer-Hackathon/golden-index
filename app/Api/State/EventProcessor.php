<?php

namespace App\Api\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EventProcessor implements ProcessorInterface
{
    public function __construct(private Request $request)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Event
    {
        /** @var Event $data */
        
        // Get raw request data directly
        $requestData = $this->request->all();
        
        Log::info('EventProcessor - Raw request data:', $requestData);
        Log::info('EventProcessor - Model data before fill:', [
            'attributes' => $data->getAttributes(),
            'fillable' => $data->getFillable(),
        ]);
        
        // Fill the model with request data
        $data->fill($requestData);
        
        Log::info('EventProcessor - Model data after fill:', [
            'attributes' => $data->getAttributes(),
            'organisation_id' => $data->organisation_id ?? 'NOT_SET',
            'event_title' => $data->event_title ?? 'NOT_SET',
        ]);
        
        // Set system fields
        if (!$data->event_id) {
            $data->event_id = (string) \Illuminate\Support\Str::uuid();
        }
        
        if (!isset($data->current_volunteers)) {
            $data->current_volunteers = 0;
        }

        // Validate required fields
        $required = ['organisation_id', 'event_title', 'start_datetime', 'end_datetime', 'location', 'event_status_id'];
        $missing = [];
        
        foreach ($required as $field) {
            if (empty($data->$field)) {
                $missing[] = $field;
            }
        }
        
        if (!empty($missing)) {
            Log::error('Missing required fields:', [
                'missing' => $missing,
                'request_data' => $requestData,
                'model_data' => $data->getAttributes()
            ]);
            throw new \InvalidArgumentException('Missing required fields: ' . implode(', ', $missing));
        }

        // Save the event
        $data->saveOrFail();
        
        Log::info('Event saved successfully:', ['event_id' => $data->event_id]);
        
        return $data;
    }
}
