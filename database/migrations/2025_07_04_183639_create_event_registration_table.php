<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_registration', function (Blueprint $table) {
            $table->uuid('event_registration_id')->primary();
            $table->uuid('user_id')->nullable(true); // both user and event id's will be set to a valid one later
            $table->uuid('event_id')->nullable(true);
            $table->enum('event_registration_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->dateTime('created_at');
            $table->dateTime('updated_at')->nullable(true);
            $table->dateTime('approved_at')->nullable(true);
            $table->text('notes')->nullable(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registration');
    }
};
