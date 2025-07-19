<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Optional: disable foreign key checks temporarily (ONLY while events table is not seeded)
        DB::statement('PRAGMA foreign_keys = OFF');

        // Create events
        Event::factory()->count(50)->create();

        // Re-enable foreign key checks
        DB::statement('PRAGMA foreign_keys = ON');
    }
}
