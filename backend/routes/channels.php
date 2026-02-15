<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('admin-notifications', function ($user) {
    return (int) $user->id === 1; // Ou ta logique pour vérifier si c'est l'admin
});