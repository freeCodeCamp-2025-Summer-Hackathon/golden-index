<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\VolunteerTimeLog;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class VolunteerTimeLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Optional: disable foreign key checks temporarily (ONLY while events table is not seeded)
        DB::statement('PRAGMA foreign_keys = OFF');

        $users = User::pluck('id')->all();

        if (empty($users)) {
            throw new \Exception("No users found. Seed users first.");
        }

        VolunteerTimeLog::factory()
            ->count(50)
            ->make() // creates models in memory, doesn't hit the DB yet
            ->each(function ($log) use ($users) {
                $log->user_id = collect($users)->random();
                $log->event_id = Str::uuid(); // placeholder for now
                $log->save();
            });

        DB::statement('PRAGMA foreign_keys = ON');
    }
}
