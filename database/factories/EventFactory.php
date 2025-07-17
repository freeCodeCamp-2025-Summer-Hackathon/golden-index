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




            'onboarding_status' => 'pending',
            'bio' => $this->faker->paragraph(),
            'skills' => json_encode($this->faker->randomElements(['PHP', 'JavaScript', 'React', 'Laravel'], 2)),
            'experience' => $this->faker->sentence(),
            'availability' => $this->faker->randomElement(['full-time', 'part-time', 'weekends']),
        ];
    }
}
