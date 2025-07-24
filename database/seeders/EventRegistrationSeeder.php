<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\EventRegistration;

class EventRegistrationSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 event registrations using the factory
        EventRegistration::factory()->count(5)->create();
        
        // To add later: ->each(function ($user) {
          //  $user->assignRole('user'); // note: should probably set this to volunteer
        
    
    }
}