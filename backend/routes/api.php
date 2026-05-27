<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgressController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login',    [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me',      [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile',    [ProfileController::class, 'show']);
    Route::patch('profile',  [ProfileController::class, 'update']);

    Route::get('progress',          [ProgressController::class, 'index']);
    Route::patch('progress',        [ProgressController::class, 'toggle']);
    Route::put('progress/bulk',     [ProgressController::class, 'bulk']);
    Route::delete('progress',       [ProgressController::class, 'reset']);
});
