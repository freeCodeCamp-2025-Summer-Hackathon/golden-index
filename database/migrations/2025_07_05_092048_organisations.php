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
        Schema::create('organisations', function (Blueprint $table) {
            $table->uuid('organisation_id');
            $table->string('organisation_name');
            $table->text('organisation_description')->nullable();
            $table->string('organisation_email')->unique();
            $table->string('organisation_phone')->nullable();
            $table->text('organisation_address')->nullable();
            $table->string('website')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->json('contact_info')->nullable();
            $table->text('mission_statement')->nullable();
            $table->string('org_type');
            $table->timestamp('created_at');
            $table->timestamp('updated_at')->nullable();
        });

        Schema::create('users_organisations', function (Blueprint $table) {
            $table->uuid('user_id');
            $table->uuid('organisation_id');
            $table->primary(['user_id', 'organisation_id']);
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('organisation_id')->references('organisation_id')->on('organisations')->onDelete('cascade');
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('organisations');
            Schema::dropIfExists('user_organisations');
        }
};
