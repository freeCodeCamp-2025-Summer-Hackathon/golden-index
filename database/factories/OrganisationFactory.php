<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrganisationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organisation_id' => $this->faker->uuid(),
            'organisation_name' => $this->faker->company(),
            'organisation_description' => $this->faker->paragraph(),
            'organisation_email' => $this->faker->unique()->companyEmail(),
            'organisation_phone' => $this->faker->phoneNumber(),
            'organisation_address' => $this->faker->address(),
            'website' => $this->faker->url(),
            'is_verified' => $this->faker->boolean(),
            'is_active' => $this->faker->boolean(),
            'contact_info' => [
                'facebook' => $this->faker->url(),
                'twitter' => $this->faker->url(),
                'linkedin' => $this->faker->url(),
                'instagram' => $this->faker->url(),
            ],
            'mission_statement' => $this->faker->sentence(),
            'org_type' => $this->faker->randomElement(['non-profit', 'for-profit', 'government', 'community-based']),
        ];
    }
}