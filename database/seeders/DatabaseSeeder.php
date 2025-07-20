<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            VolunteerSeeder::class,
            OrganisationSeeder::class,,
            EventStatusSeeder::class,
            EventSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'shirleen@duck.com'],
            [
                'name' => 'Shirleen Kneppers',
                'password' => Hash::make('F^bnYD#nb6M8oG'),
            ]
        );
    }
}
