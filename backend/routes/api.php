<?php 

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProjectController;

Route::post('/login', [AuthController::class, 'login']);

  // Routes protégées (Backoffice)
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('projects', ProjectController::class);
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);  
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/users', [AuthController::class, 'index']);
    Route::put('/users/{id}', [AuthController::class, 'update']);
    Route::delete('/users/{id}', [AuthController::class, 'destroy']);
  
});