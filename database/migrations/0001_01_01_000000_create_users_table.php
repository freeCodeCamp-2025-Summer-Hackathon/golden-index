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
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('user_id')->primary();
            $table->string('user_name', 100);
            $table->string('user_email', 150)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 255);
            $table->rememberToken();
            $table->string('user_phone', 20)->nullable();
            $table->timestamp('date_created')->useCurrent();
            $table->timestamp('last_login')->nullable();
            $table->string('user_type', 20);
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('profile_visibility', 20)->default('public');
            $table->json('privacy_settings')->nullable();
            $table->string('timezone', 50)->nullable();
            $table->json('role_ids');
            $table->text('cv_file_path')->nullable();
            $table->timestamps();
            $table->boolean('verified')->default(false);
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('user_email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
