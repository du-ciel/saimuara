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
        Schema::create('pokdakans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pokdakan');
            $table->string('nama_ketua');
            $table->string('no_whatsapp');
            $table->string('pekon_desa');
            $table->string('kecamatan');
            $table->string('kabupaten_kota');
            $table->string('no_badan_hukum_sk')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->integer('tahun_anggaran');
            $table->integer('jumlah_mesin_pakan')->default(0);
            $table->text('spesifikasi_mesin')->nullable();
            $table->integer('jumlah_kolam_ras')->default(0);
            $table->text('spesifikasi_kolam')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pokdakans');
    }
};
