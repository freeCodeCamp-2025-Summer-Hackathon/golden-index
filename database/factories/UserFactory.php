<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_name'         => $this->faker->name(),
            'user_email'        => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password'          => bcrypt('password'), // or use Hash::make()
            'remember_token'    => Str::random(10),
            'user_phone'        => $this->faker->phoneNumber(),
            'user_type'         => 'standard',
            'is_verified'       => true,
            'is_active'         => true,
            'profile_visibility'=> 'public',
            'privacy_settings'  => ['show_email' => false],
            'timezone'          => 'UTC',
            'role_ids'          => [1, 2], // example roles
            'cv_file_path'      => null,
            'date_created'      => now(),
            'last_login'        => now(),
            'verified'          => true,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
