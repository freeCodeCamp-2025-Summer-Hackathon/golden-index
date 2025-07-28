<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EventRegistration;
use App\Models\User;
use App\Models\Event;

class EventRegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $events = Event::all();

        if ($users->isEmpty() || $events->isEmpty()) {
            $this->command->warn('No users or events found. Skipping event registration seeding.');
            return;
        }

        // Create some registrations using existing users and events
        for ($i = 0; $i < 20; $i++) {
            EventRegistration::factory()
                ->state([
                    'user_id' => $users->random()->id,
                    'event_id' => $events->random()->event_id,
                ])
                ->create();
        }

        // Create some approved registrations
        EventRegistration::factory()
            ->approved()
            ->count(10)
            ->state([
                'user_id' => $users->random()->id,
                'event_id' => $events->random()->event_id,
            ])
            ->create();
    }
}
