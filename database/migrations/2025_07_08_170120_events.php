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
            $table->uuid('organisation_id');
            $table->string('event_title');
            $table->text('event_description')->nullable();
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->string('location')->nullable();
            $table->string('event_address')->nullable();
            $table->boolean('is_virtual')->default(false);
            $table->integer('max_volunteers')->nullable();
            $table->integer('current_volunteers')->default(0);
            $table->boolean('is_urgent')->default(false);
            $table->string('recurrence_pattern')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('event_status_id')->nullable()->default(1); // Assuming 1 is the default status ID
            $table->boolean('is_high_risk')->default(false);
            $table->boolean('is_group_friendly')->default(false);
            $table->json('required_skills')->nullable();
            $table->timestamps();

            // Foreign keys (optional, depending on your existing tables)
            $table->foreign('organisation_id')->references('organisation_id')->on('organisations')->onDelete('cascade');
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('set null');
            $table->foreign('event_status_id')->references('event_status_id')->on('event_status')->onDelete('set null');
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
