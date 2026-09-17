<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class LaporanRiwayat extends Model
{
    protected $table = 'laporan_riwayats';

    protected $fillable = [
        'riwayatable_type',
        'riwayatable_id',
        'user_id',
        'action',
        'perubahan',
        'catatan',
    ];

    protected $casts = [
        'perubahan' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function riwayatable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
