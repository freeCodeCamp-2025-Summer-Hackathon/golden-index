<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;
use App\Models\Event;
use App\Models\Organisation;
use App\Models\Category;
use App\Models\EventStatus;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{

    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('now', '+3 months');
        $endDate = $this->faker->dateTimeBetween($startDate, $startDate->format('Y-m-d H:i:s') . ' +8 hours');

        return [
            'organization_id' => Organisation::factory(),
            'event_title' => $this->faker->sentence(4),
            'event_description' => $this->faker->paragraphs(3, true),
            'start_datetime' => $startDate,
            'end_datetime' => $endDate,
            'location' => $this->faker->address,
            'event_address' => $this->faker->streetAddress,
            'is_virtual' => $this->faker->boolean(30),
            'max_volunteers' => $this->faker->numberBetween(5, 50),
            'current_volunteers' => 0,
            'is_urgent' => $this->faker->boolean(20),
            'recurrence_pattern' => $this->faker->optional()->randomElement(['weekly', 'monthly', 'daily']),
            'category_id' => Category::factory(),
            'event_status_id' => EventStatus::factory(),
            'is_high_risk' => $this->faker->boolean(10),
            'is_group_friendly' => $this->faker->boolean(70),
            'required_skills' => $this->faker->randomElements(['First Aid', 'Leadership', 'Communication', 'Physical Fitness', 'Computer Skills'], $this->faker->numberBetween(0, 3)),
        ];
    }

    public function virtual(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_virtual' => true,
            'event_address' => null,
            'location' => 'Online Event',
        ]);
    }

    public function urgent(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_urgent' => true,
        ]);
    }

    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_datetime' => $this->faker->dateTimeBetween('now', '+1 month'),
        ]);
    }

    public function past(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_datetime' => $this->faker->dateTimeBetween('-3 months', '-1 day'),
            'end_datetime' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ]);
    }

    public function full(): static
    {
        return $this->state(function (array $attributes) {
            $maxVolunteers = $this->faker->numberBetween(5, 20);
            return [
                'max_volunteers' => $maxVolunteers,
                'current_volunteers' => $maxVolunteers,
            ];
        });
    }
}
