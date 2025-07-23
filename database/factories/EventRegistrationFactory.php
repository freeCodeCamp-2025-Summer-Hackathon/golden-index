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
        // Select a random user with 'user' role and same for event
        $user = User::role('user', 'volunteer')->inRandomOrder()->first();
        $event = Event::inRandomOrder()->first();

        return [
            'registration_id' => $this->faker->uuid(),
            'user_id' => $user ? $user->id : null, // returns id of user or event if the $user or $event variables are not null
            'event_id' => $event ? $event->id : null,
            'event_registration_status' => $this->faker->randomElement(['pending', 'approved', 'rejected']), // randomly selects one of three status array elements
            'created_at' => now(),
            'updated_at' => now(),
            'approved_at' => null, // this will later be set to a valid datetime on the condition that if event_registration_status selects 'approved'
            'notes' => $this->faker->sentence(), // sets a random sentence as notes
        ];  
    }
}
