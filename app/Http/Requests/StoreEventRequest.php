<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create events');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'organization_id' => ['required', 'uuid', 'exists:organisations,organisation_id'],
            'event_title' => ['required', 'string', 'max:100'],
            'event_description' => ['nullable', 'string'],
            'start_datetime' => ['required', 'date', 'after:now'],
            'end_datetime' => ['required', 'date', 'after:start_datetime'],
            'location' => ['required', 'string'],
            'event_address' => ['nullable', 'string'],
            'is_virtual' => ['boolean'],
            'max_volunteers' => ['nullable', 'integer', 'min:1'],
            'is_urgent' => ['boolean'],
            'recurrence_pattern' => ['nullable', 'string', 'max:100'],
            'category_id' => ['nullable', 'integer', 'exists:categories,category_id'],
            'event_status_id' => ['required', 'integer', 'exists:event_status,event_status_id'],
            'is_high_risk' => ['boolean'],
            'is_group_friendly' => ['boolean'],
            'required_skills' => ['nullable', 'array'],
            'required_skills.*' => ['string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'start_datetime.after' => 'The event must start in the future.',
            'end_datetime.after' => 'The event must end after it starts.',
            'organization_id.exists' => 'The selected organization does not exist.',
        ];
    }
}
