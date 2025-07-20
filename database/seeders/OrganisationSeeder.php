<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Organisation;
use Illuminate\Support\Str;

class OrganisationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->organisationAdmin()
            ->count(5)
            ->create()
            ->each(function ($user) {
                $user->assignRole('organisation-admin');

                $organisation = Organisation::factory()->create();
                $user->organisations()->attach($organisation->organisation_id);
            });
    }
}
