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
        Schema::create('volunteer_time_logs', function (Blueprint $table) {
            $table->uuid('volunteer_time_log_id');
            $table->uuid('user_id');
            $table->uuid('event_id');
            $table->timestamp('check_in_time')->nullable();
            $table->timestamp('check_out_time')->nullable();
            $table->string('log_method')->nullable();
            $table->text('dispute_reason')->nullable();
            $table->string('volunteer_time_log_status')->nullable();
            $table->boolean('is_disputed')->default(false);
            $table->decimal('hours_logged', 8, 2)->default(0);
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();

            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('event_id')->references('event_id')->on('events');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteer_time_logs');
    }
};
