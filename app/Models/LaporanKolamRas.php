<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanKolamRas extends Model
{
    protected $table = 'laporan_kolam_ras';

    protected $fillable = [
        'tanggal_input',
        'pokdakan_id',
        'siklus_ke',
        'status_siklus',
        'tanggal_tebar',
        'komoditas_ikan',
        'jumlah_benih_ekor',
        'ukuran_benih_cm',
        'kondisi_air',
        'kendala_penyakit',
        'tanggal_panen',
        'total_panen_kg',
        'harga_jual_per_kg',
        'total_pendapatan',
    ];

    protected $casts = [
        'tanggal_input' => 'date',
        'tanggal_tebar' => 'date',
        'tanggal_panen' => 'date',
        'total_panen_kg' => 'decimal:2',
        'harga_jual_per_kg' => 'decimal:2',
        'total_pendapatan' => 'decimal:2',
    ];

    public function pokdakan()
    {
        return $this->belongsTo(Pokdakan::class);
    }
}
