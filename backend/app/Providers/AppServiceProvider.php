<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Event;
use App\Models\Contact;
use App\Observers\ContactObserver;
use App\Events\AppNotification;
use App\Listeners\SendSystemNotification;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 1. Enregistre l'Observer pour le modèle Contact
        Contact::observe(ContactObserver::class);

        // 2. Lie l'événement global au Listener qui gère les notifications
        // Event::listen(
        //     AppNotification::class,
        //     SendSystemNotification::class
        // );
    }
}
