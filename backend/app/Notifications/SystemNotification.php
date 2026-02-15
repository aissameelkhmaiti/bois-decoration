<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class SystemNotification extends Notification
{
    use Queueable;

    // Définition des propriétés pour stocker les données
    public $action;
    public $message;
    public $type;

    /**
     * Le constructeur reçoit maintenant les données dynamiques
     */
    public function __construct($action, $message, $type = 'info')
    {
        $this->action = $action;
        $this->message = $message;
        $this->type = $type;
    }

    /**
     * Canaux de diffusion : Base de données (stockage) et Broadcast (Pusher)
     */
    public function via($notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Structure pour le stockage en base de données (table 'notifications')
     */
    public function toDatabase($notifiable): array
    {
        return [
            'action' => $this->action,
            'message' => $this->message,
            'type' => $this->type,
        ];
    }

    /**
     * Structure pour la diffusion temps réel (Pusher)
     */
    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'action' => $this->action,
            'message' => $this->message,
            'type' => $this->type,
        ]);
    }

    /**
     * Représentation générique (utilisée par défaut)
     */
    public function toArray($notifiable): array
    {
        return [
            'action' => $this->action,
            'message' => $this->message,
            'type' => $this->type,
        ];
    }
}