<?php

namespace App\Policies;

use App\Models\Peticione;
use App\Models\User;

class PeticionePolicy
{
    /**
     * Este método se ejecuta antes de cualquier otro método de la política.
     * Si el usuario es administrador (role_id == 1), se le otorga acceso total.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->role_id == 1) {
            return true; // El administrador tiene acceso total
        }
        return null; // Continuar con las verificaciones normales
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Peticione $peticione): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Peticione $peticione): bool
    {
        // Permitir al creador de la petición actualizarla
        return $user->role_id == 0 && $user->id == $peticione->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Peticione $peticione): bool
    {
        // Permitir al creador de la petición eliminarla
        return $user->role_id == 0 && $user->id == $peticione->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Peticione $peticione): bool
    {
        // Permitir al creador de la petición restaurarla
        return $user->role_id == 0 || $user->id == $peticione->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Peticione $peticione): bool
    {
        return true;
    }

    /**
     * Determine whether the user can change the state of the model.
     */
    public function cambiarEstado(User $user, Peticione $peticione): bool
    {
        return false;
    }
}