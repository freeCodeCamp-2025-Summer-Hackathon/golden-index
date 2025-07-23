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
            OrganisationSeeder::class,
            EventStatusSeeder::class,
            EventSeeder::class,
            VolunteerTimeLogSeeder::class,
            EventRegistrationSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'shirleen@duck.com'],
            [
                'name' => 'Shirleen Kneppers',
                'password' => Hash::make('F^bnYD#nb6M8oG'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'vero.mestre11@gmail.com'],
            [
                'name' => 'Vero Mestre',
                'password' => Hash::make('eCk58Uw$fL.i3m4'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'adnanakbar.0207@gmail.com'],
            [
                'name' => 'Adnan Akbar',
                'password' => Hash::make('A9fX&2bQ7mL6T1z'),
            ]
        );
    }
}
