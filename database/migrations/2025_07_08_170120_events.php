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
            $table->string('title');
            $table->text('description')->nullable();
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->string('location')->nullable();
            $table->string('address')->nullable();
            $table->boolean('is_virtual')->default(false);
            $table->integer('max_volunteers')->nullable();
            $table->integer('current_volunteers')->default(0);
            $table->boolean('is_urgent')->default(false);
            $table->string('recurrence_pattern')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('event_status_id')->nullable();
            $table->boolean('is_high_risk')->default(false);
            $table->boolean('is_group_friendly')->default(false);
            $table->json('required_skills')->nullable();
            $table->timestamps();

            // Foreign keys (optional, depending on your existing tables)
            $table->foreign('organization_id')->references('id')->on('organisations')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('event_categories')->onDelete('set null');
            $table->foreign('event_status_id')->references('id')->on('event_statuses')->onDelete('set null');
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
