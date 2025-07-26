<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('event_id')->primary();
            $table->uuid('organization_id');
            $table->string('event_title', 100);
            $table->text('event_description')->nullable();
            $table->timestamp('start_datetime');
            $table->timestamp('end_datetime');
            $table->text('location');
            $table->text('event_address')->nullable();
            $table->boolean('is_virtual')->default(false);
            $table->integer('max_volunteers')->nullable();
            $table->integer('current_volunteers')->default(0);
            $table->boolean('is_urgent')->default(false);
            $table->string('recurrence_pattern', 100)->nullable();
            $table->integer('category_id')->nullable();
            $table->integer('event_status_id');
            $table->boolean('is_high_risk')->default(false);
            $table->boolean('is_group_friendly')->default(false);
            $table->json('required_skills')->nullable();
            $table->timestamps();

            // Foreign keys
            $table->foreign('organization_id')->references('organisation_id')->on('organisations');
            $table->foreign('category_id')->references('category_id')->on('categories');
            $table->foreign('event_status_id')->references('event_status_id')->on('event_status');
            
            // Indexes for performance
            $table->index(['start_datetime', 'end_datetime']);
            $table->index('event_status_id');
            $table->index('category_id');
            $table->index('is_urgent');
            $table->index('organization_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
