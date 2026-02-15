<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\ContactController;
use App\Models\Quote; // <--- TRÈS IMPORTANT : Importez le modèle

/*
|--------------------------------------------------------------------------
| Public Routes (Client-side)
|--------------------------------------------------------------------------
*/
// Routes Publiques
Route::get('/projects/front', [ProjectController::class, 'index']); // Accessible à tous
Route::get('/categories/front', [CategoryController::class, 'index']); // Pour charger les filtres
// Authentification
Route::post('/login', [AuthController::class, 'login']);
Route::get('/projects/front/{id}', [ProjectController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store']);

// Devis (Quotes)
Route::post('/quotes', [QuoteController::class, 'store']);
Route::apiResource('reviews', ReviewController::class);
// Route de Polling : Vérifie si le PDF est prêt
Route::get('/quotes/{quote}/status', function (Quote $quote) {
    return response()->json([
        'ready'   => !is_null($quote->pdf_path),
        'pdf_url' => $quote->pdf_path ? asset('storage/' . $quote->pdf_path) : null,
        // Optionnel : on peut ajouter le message si c'est prêt
        'message' => !is_null($quote->pdf_path) ? 'Le devis est prêt' : 'Génération en cours...'
    ]);
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin/Backoffice)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Gestion des utilisateurs
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);  
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/users', [AuthController::class, 'index']);
    Route::put('/users/{id}', [AuthController::class, 'update']);
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);

    Route::get('/quotes', [QuoteController::class, 'index']);
    
    // Ressources CMS
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('projects', ProjectController::class);
});