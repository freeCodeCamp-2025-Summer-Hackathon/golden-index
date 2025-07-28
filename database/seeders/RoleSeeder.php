<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'super-admin']);
        Role::firstOrCreate(['name' => 'organisation-admin']);
        Role::firstOrCreate(['name' => 'volunteer']);
        Role::firstOrCreate(['name' => 'event-organiser']);
        Role::firstOrCreate(['name' => 'user']);

        $user = User::where('email', 'shirleen@duck.com')->first();
        $user = User::where('email', 'vero.mestre11@gmail.com')->first();
        $user = User::where('email', 'adnanakbar.0207@gmail.com')->first();

        if ($user) {
            $user->assignRole('super-admin');
            echo "User assigned super-admin role.";
        } else {
            echo "User not found.";
        // Just create the roles - assignment happens in DatabaseSeeder
        $roles = [
            'super-admin',
            'organisation-admin', 
            'volunteer',
            'event-organiser',
            'user'
        ];

        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
            $this->command->info("Created role: {$roleName}");
        }
    }
}
}