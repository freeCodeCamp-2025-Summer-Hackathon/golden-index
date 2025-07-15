<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Support\Str;

class VolunteerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(10)
            ->create()
            ->each(function ($user) {
                $user->assignRole('volunteer');

                Volunteer::create([
                    'volunteer_id' => (string) Str::uuid(),
                    'user_id' => $user->id,
                    'onboarding_status' => 'pending',
                    'bio' => 'I love volunteering!',
                    'skills' => ['communication', 'teamwork'],
                    'experience' => '2 years in community service',
                    'availability' => 'weekends',
                ]);
            });
    }
}
