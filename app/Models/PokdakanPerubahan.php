<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PokdakanPerubahan extends Model
{
    protected $table = 'pokdakan_perubahans';

    protected $fillable = [
        'pokdakan_id',
        'user_id',
        'data_lama',
        'data_baru',
        'perubahan',
        'alasan',
        'status',
        'reviewed_by',
        'catatan_review',
        'reviewed_at',
    ];

    protected $casts = [
        'data_lama' => 'array',
        'data_baru' => 'array',
        'perubahan' => 'array',
        'reviewed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function pokdakan(): BelongsTo
    {
        return $this->belongsTo(Pokdakan::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
