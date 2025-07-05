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
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('organisations');
        }
};
