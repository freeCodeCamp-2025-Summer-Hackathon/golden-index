<?php

namespace Database\Factories;

use App\Models\EventRegistration;
use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EventRegistration>
 */
class EventRegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {        
        // Get a random user id from the user table
        $userId = User::inRandomOrder()->first()->id;
        
        return [
            'event_registration_id' => $this->faker->uuid(),
            'user_id' => $userId, 
            'event_id' => null, //$eventId fetch from frontent
            'event_registration_status' => $this->faker->randomElement(['pending', 'approved', 'rejected']), // Randomly selects one of three status array elements
            'created_at' => now(),
            'updated_at' => null,
            'approved_at' => null, // This will later be set to a valid datetime on the condition that if event_registration_status selects 'approved'
            'notes' => $this->faker->sentence(), // Set a random sentence as notes
        ];  
    }
}
