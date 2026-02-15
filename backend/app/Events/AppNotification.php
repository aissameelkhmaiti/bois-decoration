<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AppNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public string $title,
        public string $message,
        public string $type = 'info'
    ) {}

    public function broadcastOn(): array
    {
        return [new PrivateChannel('admin-notifications')];
    }

    // ✅ AJOUTEZ CETTE MÉTHODE
    public function broadcastAs(): string
    {
        return 'app.notification';
    }

    // ✅ AJOUTEZ AUSSI CECI pour contrôler les données envoyées
    public function broadcastWith(): array
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'type' => $this->type,
            'timestamp' => now()->toIso8601String(),
        ];
    }
}