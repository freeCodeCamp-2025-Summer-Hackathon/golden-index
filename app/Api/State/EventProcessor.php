<?php

namespace App\Api\State\Processors;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Models\Event;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class EventProcessor implements ProcessorInterface
{
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Event
    {
        /** @var Event $data */
        
        // Convert the model to array for validation, including both attributes and fillable properties
        $dataArray = [];
        
        // Get all fillable fields from the model
        foreach ($data->getFillable() as $field) {
            if (isset($data->$field)) {
                $dataArray[$field] = $data->$field;
            }
        }
        
        // Also check the raw attributes
        $attributes = $data->getAttributes();
        $dataArray = array_merge($dataArray, $attributes);
        
        // Validation rules
        $rules = [
            'organisation_id' => ['required', 'uuid', 'exists:organisations,organisation_id'],
            'event_title'     => ['required', 'string', 'max:100'],
            'start_datetime'  => ['required', 'date'],
            'end_datetime'    => ['required', 'date', 'after:start_datetime'],
            'location'        => ['required', 'string'],
            'event_status_id' => ['required', 'integer', 'exists:event_status,event_status_id'],
        ];

        $validator = Validator::make($dataArray, $rules);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        // Set system fields for new records
        if (!$data->event_id) {
            $data->event_id = (string) \Illuminate\Support\Str::uuid();
        }
        
        if (!isset($data->current_volunteers)) {
            $data->current_volunteers = 0;
        }

        // Save the event
        $data->saveOrFail();

        return $data;
    }
}
