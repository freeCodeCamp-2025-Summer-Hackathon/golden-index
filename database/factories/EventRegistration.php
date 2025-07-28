<?php

namespace Database\Factories;

use App\Models\EventRegistration;
use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventRegistrationFactory extends Factory
{
    protected $model = EventRegistration::class;

    public function definition(): array
    {
        return [
            'registration_id' => $this->faker->uuid(), // Added parentheses
            'user_id' => null, // Will be set by seeder or state
            'event_id' => null, // Will be set by seeder or state
            'event_registration_status' => 'pending', // Default to pending
            'approved_at' => null,
            'notes' => $this->faker->optional()->sentence(),
        ];
    }

    public function pending(): static
    {
        return $this->state([
            'event_registration_status' => 'pending',
            'approved_at' => null,
        ]);
    }

    public function approved(): static
    {
        return $this->state([
            'event_registration_status' => 'approved',
            'approved_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    public function rejected(): static
    {
        return $this->state([
            'event_registration_status' => 'rejected',
            'approved_at' => null,
        ]);
    }

    // Add helper states for testing
    public function forUser($userId): static
    {
        return $this->state([
            'user_id' => $userId,
        ]);
    }

    public function forEvent($eventId): static
    {
        return $this->state([
            'event_id' => $eventId,
        ]);
    }
}
