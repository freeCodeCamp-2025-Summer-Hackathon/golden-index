<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organisation_id' => $this->faker->uuid(),
            'event_title' => $this->faker->sentence(),
            'event_description' => $this->faker->paragraph(),
            'start_datetime' => $this->faker->date('Y-m-d H:i:s'),
            'end_datetime' => $this->faker->date('Y-m-d H:i:s'),
            'location' => $this->faker->address(),
            'event_address' => $this->faker->address(),
            'is_virtual' => $this->faker->boolean(),
            'max_volunteers' => $this->faker->numberBetween(1, 20),
            'current_volunteers' => $this->faker->numberBetween(0, 20), 
            'is_urgent' => $this->faker->boolean(),
            'recurrence_pattern' => $this->faker->randomElement(['daily', 'weekly', 'monthly', 'none']),
            'category_id' => $this->faker->uuid(),
            'event_status_id' => $this->faker->uuid(),
            'is_high_risk' => $this->faker->boolean(),
            'is_group_friendly' => $this->faker->boolean(),
            'required_skills' => json_encode($this->faker->randomElements(['PHP', 'JavaScript', 'React', 'Laravel'], 2)),
            'created_at' => now(),
            'updated_at' => null,
        ];
    }
}
