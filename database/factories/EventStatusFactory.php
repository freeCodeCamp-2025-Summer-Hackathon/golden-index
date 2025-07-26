<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventStatus>
 */
class EventStatusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = [
            ['name' => 'draft', 'description' => 'Event is being planned'],
            ['name' => 'published', 'description' => 'Event is live and accepting volunteers'],
            ['name' => 'full', 'description' => 'Event has reached maximum volunteers'],
            ['name' => 'in_progress', 'description' => 'Event is currently happening'],
            ['name' => 'completed', 'description' => 'Event has finished'],
            ['name' => 'cancelled', 'description' => 'Event has been cancelled'],
        ];

        $status = $this->faker->randomElement($statuses);

        return [
            'event_status_name' => $status['name'],
            'description' => $status['description'],
        ];
    }
}
