<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_path',
        'peticione_id',
    ];

    public function peticione()
    {
        return $this->belongsTo(Peticione::class);
    }
}