<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Peticione extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descripcion',
        'destinatario',
        'firmantes',
        'estado',
    ];

    /**
     * Relación con el modelo Categoria.
     */
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    /**
     * Relación con el modelo User (usuario que creó la petición).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación con el modelo File (archivos asociados a la petición).
     */
    public function files()
{
    return $this->hasMany(File::class, 'peticione_id');
}

    /**
     * Relación muchos a muchos con el modelo User (usuarios que firmaron la petición).
     */
    public function firmas()
{
    return $this->belongsToMany(User::class, 'firmas', 'peticion_id', 'user_id')->withTimestamps();
}
}