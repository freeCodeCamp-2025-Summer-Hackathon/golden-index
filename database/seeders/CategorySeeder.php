<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $categories = [
            [
                'category_id' => 1,
                'category_name' => 'Community Development',
                'category_description' => 'Support the well-being and growth of local neighborhoods through hands-on service, nonprofit engagement, and mentorship. Whether it\'s helping at community centers, joining local clean-up efforts, or guiding youth, this category is all about strengthening communities from within.',
            ],
            [
                'category_id' => 2,
                'category_name' => 'Animal Welfare',
                'category_description' => 'Contribute to the protection and care of animals through activities in shelters, rescue programs, and conservation initiatives. Volunteers play a vital role in giving animals a second chance, preserving habitats, and promoting compassionate treatment.',
            ],
            [
                'category_id' => 3,
                'category_name' => 'Environmental Conservation',
                'category_description' => 'Make a direct impact on the planet by participating in sustainability and restoration efforts. This category includes everything from planting trees and maintaining trails to supporting eco-education and wildlife protection programs aimed at preserving our natural world.',
            ],
            [
                'category_id' => 4,
                'category_name' => 'Healthcare Support',
                'category_description' => 'Help improve the health and well-being of individuals by supporting hospitals, clinics, and public health programs. Volunteer roles can range from administrative assistance to mental health support and educational outreach, offering care where it\'s needed most.',
            ],
            [
                'category_id' => 5,
                'category_name' => 'Education & Literacy',
                'category_description' => 'Empower others through education by tutoring students, supporting teachers, or assisting in libraries. Volunteers help bridge learning gaps, promote literacy, and create better educational outcomes for children and adults alike.',
            ],
            [
                'category_id' => 6,
                'category_name' => 'Disaster Relief & Recovery',
                'category_description' => 'Be part of critical response and recovery efforts when disaster strikes. From emergency assistance to long-term rebuilding, volunteers help communities regain stability and hope through vital aid and support services.',
            ],
            [
                'category_id' => 7,
                'category_name' => 'Social Impact & Advocacy',
                'category_description' => 'Drive meaningful change by supporting causes that address inequality, support vulnerable populations, and influence public policy. Opportunities include fundraising, refugee aid, elderly care, and advocacy campaigns—each contributing to a more just and compassionate society.',
            ],
        ];

        Category::insert($categories);
    }
}
