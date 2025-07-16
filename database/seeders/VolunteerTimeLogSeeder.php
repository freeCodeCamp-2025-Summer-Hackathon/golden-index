<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\VolunteerTimeLog;
use Illuminate\Support\Str;

class VolunteerTimeLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Generate mock event IDs
        $mockEventIds = collect([
            uuid_create(UUID_TYPE_RANDOM),
            uuid_create(UUID_TYPE_RANDOM),
            uuid_create(UUID_TYPE_RANDOM)
        ]);

        User::all()->each(function ($user) use ($mockEventIds) {
            $mockEventIds->each(function ($eventId) use ($user) {
                VolunteerTimeLog::factory()->create([
                    'user_id' => $user->id,
                    'event_id' => $eventId,
                ]);
            });
        });
    }
}

