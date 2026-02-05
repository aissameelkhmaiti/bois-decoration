<?php 

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProjectController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);  

    // Routes protégées (Backoffice)
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('projects', ProjectController::class);
});