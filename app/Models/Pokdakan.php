<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokdakan extends Model
{
    protected $fillable = [
        'nama_pokdakan',
        'nama_ketua',
        'no_whatsapp',
        'pekon_desa',
        'kecamatan',
        'kabupaten_kota',
        'no_badan_hukum_sk',
        'latitude',
        'longitude',
        'tahun_anggaran',
        'jumlah_mesin_pakan',
        'spesifikasi_mesin',
        'jumlah_kolam_ras',
        'spesifikasi_kolam',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function laporanMesinPakan()
    {
        return $this->hasMany(LaporanMesinPakan::class);
    }

    public function laporanKolamRas()
    {
        return $this->hasMany(LaporanKolamRas::class);
    }
}
