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
        Schema::create('volunteer_time_log', function (Blueprint $table) {
            $table->id('volunteer_time_log_id');
            $table->timestamps();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('event_id');
            $table->string('log_method')->nullable();
            $table->text('dispute_reason')->nullable();
            $table->string('status')->nullable();
            $table->boolean('is_disputed')->default(false);
            $table->decimal('hours_logged', 8, 2)->default(0);
            $table->timestamp('check_in_time')->nullable();
            $table->timestamp('check_out_time')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('volunteer_time_log');
    }
};
