<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles first
        Role::firstOrCreate(['name' => 'super-admin']);
        Role::firstOrCreate(['name' => 'organisation-admin']);
        Role::firstOrCreate(['name' => 'volunteer']);
        Role::firstOrCreate(['name' => 'event-organiser']);
        Role::firstOrCreate(['name' => 'user']);

        // Assign roles to existing users
        $roleAssignments = [
            'shirleen@duck.com' => 'super-admin',
            'vero.mestre11@gmail.com' => 'super-admin',
            'shirleenjvr@gmail.com' => 'organisation-admin',
            'shirleen@redpecil.dev' => 'volunteer',
            'akanniwilliams@gmail.com' => 'volunteer',
        ];

        foreach ($roleAssignments as $email => $roleName) {
            $user = User::where('email', $email)->first();
            if ($user) {
                $user->assignRole($roleName);
                $this->command->info("Role '{$roleName}' assigned to {$user->email}");
            } else {
                $this->command->warn("User with email {$email} not found");
            }
        }
    }
}
