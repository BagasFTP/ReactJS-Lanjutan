<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Semua route API ada di sini. Sanctum dipakai untuk autentikasi token.
| Role dibedakan: admin vs customer (user biasa).
|--------------------------------------------------------------------------
*/

// ----------------------
// 🔹 AUTH ROUTES
// ----------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// ----------------------
// 🔹 PUBLIC ROUTES (tanpa login)
// ----------------------
// Author Routes (Public sementara)
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);
Route::post('/authors', [AuthorController::class, 'store']); // <— sekarang public

// Genre Routes (Public sementara)
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/genres/{id}', [GenreController::class, 'show']);
Route::post('/genres', [GenreController::class, 'store']); // <— sekarang public

// ----------------------
// 🔹 ADMIN ONLY ROUTES
// ----------------------
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {

    // CRUD Author & Genre (jika nanti login sudah aktif, bisa pindah ke sini)
    Route::put('/authors/{id}', [AuthorController::class, 'update']);
    Route::delete('/authors/{id}', [AuthorController::class, 'destroy']);

    Route::put('/genres/{id}', [GenreController::class, 'update']);
    Route::delete('/genres/{id}', [GenreController::class, 'destroy']);

    // Books CRUD (optional)
    Route::apiResource('books', BookController::class);

    // Transaction (Admin access: Read All + Delete)
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});

// ----------------------
// 🔹 CUSTOMER ROUTES
// ----------------------
Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    // Transaction (Customer access: Create, Show, Update)
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
});
