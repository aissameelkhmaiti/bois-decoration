<?php

use App\Events\AppNotification;

/**
 * Déclenche une notification globale pour l'application.
 *
 * @param string $title   Le titre de la notification
 * @param string $message Le contenu du message
 * @param string $type    Le type (ex: 'contact', 'info', 'success', 'warning')
 * @return void
 */
if (!function_exists('notifyApp')) {
    function notifyApp($title, $message, $type = 'info')
    {
        // Cette ligne déclenche l'événement Laravel
        // Assure-toi que la classe AppNotification existe dans app/Events/
        event(new AppNotification($title, $message, $type));
    }
}

/**
 * Tu peux ajouter d'autres helpers ici plus tard.
 * Exemple : formatage de date, conversion de monnaie, etc.
 */