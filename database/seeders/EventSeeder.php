<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventStatus;
use App\Models\Category;
use App\Models\Organisation;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        // Create event statuses first
        $statuses = [
            ['event_status_name' => 'draft', 'description' => 'Event is being planned'],
            ['event_status_name' => 'published', 'description' => 'Event is live and accepting volunteers'],
            ['event_status_name' => 'full', 'description' => 'Event has reached maximum volunteers'],
            ['event_status_name' => 'in_progress', 'description' => 'Event is currently happening'],
            ['event_status_name' => 'completed', 'description' => 'Event has finished'],
            ['event_status_name' => 'cancelled', 'description' => 'Event has been cancelled'],
        ];

        foreach ($statuses as $status) {
            EventStatus::firstOrCreate(
                ['event_status_name' => $status['event_status_name']],
                $status
            );
        }

        // Create categories
        $categories = [
            ['category_name' => 'Environment', 'category_description' => 'Environmental conservation and cleanup activities'],
            ['category_name' => 'Education', 'category_description' => 'Teaching and educational support'],
            ['category_name' => 'Healthcare', 'category_description' => 'Medical and health-related volunteering'],
            ['category_name' => 'Community', 'category_description' => 'Community building and social activities'],
            ['category_name' => 'Animals', 'category_description' => 'Animal welfare and care'],
            ['category_name' => 'Elderly Care', 'category_description' => 'Supporting elderly community members'],
            ['category_name' => 'Youth Programs', 'category_description' => 'Programs focused on children and teenagers'],
            ['category_name' => 'Food Security', 'category_description' => 'Food banks and meal programs'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['category_name' => $category['category_name']],
                $category
            );
        }

        // Create sample events (only if we have organisations)
        if (Organisation::count() > 0) {
            // Get existing statuses and categories instead of creating new ones
            $publishedStatus = EventStatus::where('event_status_name', 'published')->first();
            $categories = Category::all();

            Event::factory()
                ->count(25)
                ->state([
                    'event_status_id' => $publishedStatus->event_status_id,
                    'category_id' => $categories->random()->category_id,
                    'organization_id' => Organisation::inRandomOrder()->first()->organisation_id,
                ])
                ->create();

            // Create some specific event types
            Event::factory()
                ->virtual()
                ->count(5)
                ->state([
                    'event_status_id' => $publishedStatus->event_status_id,
                    'category_id' => $categories->random()->category_id,
                    'organization_id' => Organisation::inRandomOrder()->first()->organisation_id,
                ])
                ->create();

            Event::factory()
                ->urgent()
                ->count(3)
                ->state([
                    'event_status_id' => $publishedStatus->event_status_id,
                    'category_id' => $categories->random()->category_id,
                    'organization_id' => Organisation::inRandomOrder()->first()->organisation_id,
                ])
                ->create();
        }
    }
}
