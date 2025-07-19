<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'view volunteers',
            'manage volunteers',
            'view organisations',
            'manage organisations',
            'view organisers',
            'manage organisers',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign permissions to roles
        $volunteer = Role::firstOrCreate(['name' => 'volunteer']);
        $volunteer->givePermissionTo(['view volunteers']);

        $eventOrganiser = Role::firstOrCreate(['name' => 'event-organiser']);
        $eventOrganiser->givePermissionTo(['view organisers']);

        $orgAdmin = Role::firstOrCreate(['name' => 'organisation-admin']);
        $orgAdmin->givePermissionTo([
            'view organisations',
            'manage organisations',
            'view organisers',
            'manage organisers',
        ]);

        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());
    }
}
