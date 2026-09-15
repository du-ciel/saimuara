<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanMesinPakan extends Model
{
    protected $table = 'laporan_mesin_pakans';

    protected $fillable = [
        'tanggal_input',
        'pokdakan_id',
        'status_mesin',
        'produksi_pakan_kg',
        'bahan_baku_utama',
        'biaya_produksi_per_kg',
        'keterangan_kendala'
    ];

    protected $casts = [
        'tanggal_input' => 'date',
        'produksi_pakan_kg' => 'decimal:2',
        'biaya_produksi_per_kg' => 'decimal:2',
    ];

    public function pokdakan()
    {
        return $this->belongsTo(Pokdakan::class);
    }
}
