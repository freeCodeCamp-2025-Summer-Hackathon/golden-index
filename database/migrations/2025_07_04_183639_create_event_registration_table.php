<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('event_registration', function (Blueprint $table) {
            $table->uuid('registration_id')->primary();
            $table->uuid('user_id');
            $table->uuid('event_id');
            $table->enum('event_registration_status', ['pending', 'approved', 'rejected'])->default('approved');
            $table->timestamps(); // This creates created_at and updated_at automatically
            $table->dateTime('approved_at')->nullable(); // Fixed: should be nullable
            $table->text('notes')->nullable();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('event_id')->references('event_id')->on('events')->onDelete('cascade');

            // Indexes for performance
            $table->index(['user_id', 'event_id']);
            $table->index('event_registration_status');
            
            // Prevent duplicate registrations
            $table->unique(['user_id', 'event_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_registration');
    }
};
