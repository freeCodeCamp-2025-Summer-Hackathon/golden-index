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
        Schema::create('volunteers', function (Blueprint $table) {
            $table->uuid('volunteer_id')->primary(); // custom UUID primary key
            $table->uuid('user_id')->unique(); // one-to-one with users table
            $table->string('onboarding_status')->default('pending'); // pending, in_progress, approved, etc.
            $table->text('bio')->nullable();
            $table->json('skills')->nullable();
            $table->text('experience')->nullable();
            $table->string('availability')->nullable();
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteers');
    }
};
