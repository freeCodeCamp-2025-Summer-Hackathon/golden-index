<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventStatus;

class EventStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'event_status_id' => 1,
                'event_status_name' => 'upcoming',
                'description' => 'Event is scheduled to happen in the future',
            ],
            [
                'event_status_id' => 2,
                'event_status_name' => 'ongoing',
                'description' => 'Event is currently happening',
            ],
            [
                'event_status_id' => 3,
                'event_status_name' => 'completed',
                'description' => 'Event has already taken place',
            ],
            [
                'event_status_id' => 4,
                'event_status_name' => 'delayed',
                'description' => 'Event has been delayed',
            ],
            [
                'event_status_id' => 5,
                'event_status_name' => 'cancelled',
                'description' => 'Event has been cancelled',
            ],
        ];

        EventStatus::insert($statuses);
    }
}
