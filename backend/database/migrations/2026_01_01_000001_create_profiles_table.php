<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->foreignId('user_id')->primary()->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('total_days')->default(100);
            $table->date('start_date');
            $table->text('task_defs')->default('{}');
            $table->text('task_gains')->default('{}');
            $table->text('week_sched')->default('{}');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
