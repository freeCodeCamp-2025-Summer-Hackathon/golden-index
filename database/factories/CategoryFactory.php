<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            ['name' => 'Environment', 'description' => 'Environmental conservation and cleanup activities'],
            ['name' => 'Education', 'description' => 'Teaching and educational support'],
            ['name' => 'Healthcare', 'description' => 'Medical and health-related volunteering'],
            ['name' => 'Community', 'description' => 'Community building and social activities'],
            ['name' => 'Animals', 'description' => 'Animal welfare and care'],
            ['name' => 'Elderly Care', 'description' => 'Supporting elderly community members'],
            ['name' => 'Youth Programs', 'description' => 'Programs focused on children and teenagers'],
            ['name' => 'Food Security', 'description' => 'Food banks and meal programs'],
        ];

        $category = $this->faker->randomElement($categories);

        return [
            'category_name' => $category['name'],
            'category_description' => $category['description'],
        ];
    }
}
