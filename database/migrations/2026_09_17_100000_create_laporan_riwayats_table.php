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
        Schema::create('laporan_riwayats', function (Blueprint $table) {
            $table->id();
            $table->string('riwayatable_type');
            $table->unsignedBigInteger('riwayatable_id');
            $table->index(['riwayatable_type', 'riwayatable_id']);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('action')->default('edit');
            $table->json('perubahan');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_riwayats');
    }
};
