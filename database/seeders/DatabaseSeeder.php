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
            VolunteerSeeder::class
        ]);

        User::firstOrCreate(
            ['email' => 'akanniwilliams@gmail.com'],
            [
                'name' => 'Williams Akanni',
                'password' => Hash::make('hznKq3YXPSvJgFR'),
            ]
        );
    }
}
