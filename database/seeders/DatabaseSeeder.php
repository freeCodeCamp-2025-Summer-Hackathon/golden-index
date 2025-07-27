<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // First create foundational data INCLUDING roles
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            OrganisationSeeder::class,
            EventStatusSeeder::class,
            EventSeeder::class,
            VolunteerSeeder::class,
            VolunteerTimeLogSeeder::class,
        ]);

        // Create users with roles (roles now exist)
        $users = [
            [
                'email' => 'shirleen@duck.com',
                'name' => 'Shirleen Kneppers',
                'password' => 'F^bnYD#nb6M8oG',
                'role' => 'super-admin'
            ],
            [
                'email' => 'shirleen@redpecil.dev',
                'name' => 'Jaqlin Hunt',
                'password' => 'MusgnX#XNfQS7m',
                'role' => 'volunteer'
            ],
            [
                'email' => 'shirleenjvr@gmail.com',
                'name' => 'Organisation Admin',
                'password' => 'cVT$G7%9qd7MkT',
                'role' => 'organisation-admin'
            ],
            [
                'email' => 'vero.mestre11@gmail.com',
                'name' => 'Vero Mestre',
                'password' => 'eCk58Uw$fL.i3m4',
                'role' => 'super-admin'
            ],
            [
                'email' => 'akanniwilliams@gmail.com',
                'name' => 'Williams Akanni',
                'password' => 'hznKq3YXPSvJgFR',
                'role' => 'volunteer'
            ]
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'id' => Str::uuid(),
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'email_verified_at' => now(),
                ]
            );

            // Assign role using Spatie (roles now exist)
            $user->assignRole($userData['role']);
            $this->command->info("Created user {$user->email} with role {$userData['role']}");
        }
    }
}
