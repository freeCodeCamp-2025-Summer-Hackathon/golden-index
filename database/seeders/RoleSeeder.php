<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
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
