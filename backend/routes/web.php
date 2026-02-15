<?php

use Illuminate\Support\Facades\Route;
use Pusher\Pusher;

Route::get('/test-pusher-direct', function () {
    try {
        // On récupère proprement les variables depuis le .env via la config Laravel
        $pusher = new Pusher(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            [
                'cluster' => config('broadcasting.connections.pusher.options.cluster'),
                'useTLS' => true
            ]
        );

        $result = $pusher->trigger(
            'admin-notifications',
            'test-direct',
            [
                'message' => 'Test SÉCURISÉ via .env à ' . now(),
                'test' => true
            ]
        );

        return response()->json([
            'success' => true,
            'pusher_response' => $result,
            'message' => 'Event envoyé en utilisant les variables .env !'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
});