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
        Schema::create('laporan_mesin_pakans', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_input');
            $table->foreignId('pokdakan_id')->constrained()->cascadeOnDelete();
            $table->string('status_mesin'); // e.g., 'Baik', 'Rusak Ringan', 'Rusak Berat'
            $table->decimal('produksi_pakan_kg', 10, 2)->default(0);
            $table->string('bahan_baku_utama');
            $table->decimal('biaya_produksi_per_kg', 12, 2)->default(0);
            $table->text('keterangan_kendala')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_mesin_pakans');
    }
};
