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
            EventSeeder::class,
        ]);

        User::firstOrCreate(
            ['email' => 'vero.mestre11@gmail.com'],
            [
                'name' => 'Verónica Mestre',
                'password' => Hash::make('eCk58Uw$fL.i3m4'),
            ]
        );
    }
}
