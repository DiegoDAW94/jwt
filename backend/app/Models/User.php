<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Relación con el modelo Peticione (peticiones creadas por el usuario).
     */
    public function peticione()
    {
        return $this->hasMany(Peticione::class);
    }

    /**
     * Relación muchos a muchos con el modelo Peticione (peticiones firmadas por el usuario).
     */
    public function firmas()
    {
        return $this->belongsToMany(Peticione::class, 'peticione_user', 'user_id', 'peticione_id')->withTimestamps();
    }

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * Métodos requeridos para JWT.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}