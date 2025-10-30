<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\TransactionController;

// 🧩 Route publik
Route::get('/ping', fn () => response()->json(['message' => 'pong']));
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// 🧩 Route yang butuh autentikasi (token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    // CRUD Genre
    Route::apiResource('genres', GenreController::class);

    // CRUD Author
    Route::apiResource('authors', AuthorController::class);

    // CRUD Book
    Route::apiResource('books', BookController::class);

    // CRUD Transaction
    Route::apiResource('transactions', TransactionController::class);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
