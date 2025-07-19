<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::firstOrCreate(['name' => 'super-admin']);
        Role::firstOrCreate(['name' => 'organisation-admin']);
        Role::firstOrCreate(['name' => 'organisation']);
        Role::firstOrCreate(['name' => 'volunteer']);
        Role::firstOrCreate(['name' => 'event-organiser']);
        Role::firstOrCreate(['name' => 'user']);
        
        $user = User::where('email', 'akanniwilliams@gmail.com')->first();

        if ($user) {
            $user->assignRole('super-admin');
            echo "User assigned super-admin role.";
        } else {
            echo "User not found.";
        }
    }
}
