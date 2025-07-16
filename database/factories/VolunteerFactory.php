<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Volunteer>
 */
class VolunteerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'volunteer_id' => $this->faker->uuid(),
            'onboarding_status' => 'pending',
            'bio' => $this->faker->paragraph(),
            'skills' => json_encode($this->faker->randomElements(['PHP', 'JavaScript', 'React', 'Laravel'], 2)),
            'experience' => $this->faker->sentence(),
            'availability' => $this->faker->randomElement(['full-time', 'part-time', 'weekends']),
        ];
    }
}
