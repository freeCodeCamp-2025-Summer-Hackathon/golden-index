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
            $table->uuid('registration_id')->primary();
            $table->uuid('user_id');
            $table->uuid('event_id');
            $table->enum('event_registration_status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->dateTime('created_at');
            $table->dateTime('updated_at')->nullable(true);
            $table->dateTime('approved_at');
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
