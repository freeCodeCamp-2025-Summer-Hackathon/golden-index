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
            CategorySeeder::class,
            EventSeeder::class,
            VolunteerTimeLogSeeder::class,
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
            ['email' => 'akanniwilliams@gmail.com'],
            [
                'name' => 'Williams Akanni',
                'password' => Hash::make('hznKq3YXPSvJgFR'),
            ]
        );
    }
}
