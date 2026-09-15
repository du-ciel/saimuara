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
        Schema::create('laporan_kolam_ras', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_input');
            $table->foreignId('pokdakan_id')->constrained()->cascadeOnDelete();
            $table->integer('siklus_ke');
            $table->string('status_siklus'); // e.g., 'Berjalan', 'Panen', 'Gagal'
            $table->date('tanggal_tebar');
            $table->string('komoditas_ikan');
            $table->integer('jumlah_benih_ekor');
            $table->string('ukuran_benih_cm');
            $table->text('kondisi_air')->nullable();
            $table->text('kendala_penyakit')->nullable();
            $table->date('tanggal_panen')->nullable();
            $table->decimal('total_panen_kg', 10, 2)->nullable();
            $table->decimal('harga_jual_per_kg', 12, 2)->nullable();
            $table->decimal('total_pendapatan', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_kolam_ras');
    }
};
