<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VolunteerTimeLog>
 */
class VolunteerTimeLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'volunteer_time_log_id' => $this->faker->uuid(),
            'user_id' => $this->faker->uuid(),
            'event_id' => $this->faker->uuid(),
            'check_in_time' => now(),
            'check_out_time' => now()->addHours(2),
            'log_method' => $this->faker->randomElement(['manual', 'QRCode']),
            'is_disputed' => false,
            'hours_logged' => 2.00,
            'dispute_reason' => null,
            'volunteer_time_log_status' => $this->faker->randomElement(['approved', 'pending', 'refused']),
        ];
    }
}
