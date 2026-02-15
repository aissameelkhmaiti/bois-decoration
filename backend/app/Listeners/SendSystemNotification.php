<?php

namespace App\Listeners;

use App\Events\AppNotification;
use App\Models\User;
use App\Notifications\SystemNotification;

class SendSystemNotification
{
    public function handle(AppNotification $event): void
    {
        // On récupère l'admin (le premier utilisateur par exemple)
        $admin = User::first();
        if ($admin) {
            $admin->notify(new SystemNotification(
                $event->title,
                $event->message,
                $event->type
            ));
        }


    }
}