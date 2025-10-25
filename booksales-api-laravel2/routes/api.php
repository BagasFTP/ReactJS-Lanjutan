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
// 🔹 PUBLIC ROUTES (tanpa login, untuk tes React)
// ----------------------
// AUTHOR CRUD
Route::get('/authors', [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);
Route::post('/authors', [AuthorController::class, 'store']);
Route::put('/authors/{id}', [AuthorController::class, 'update']);
Route::delete('/authors/{id}', [AuthorController::class, 'destroy']);

// GENRE CRUD
Route::get('/genres', [GenreController::class, 'index']);
Route::get('/genres/{id}', [GenreController::class, 'show']);
Route::post('/genres', [GenreController::class, 'store']);
Route::put('/genres/{id}', [GenreController::class, 'update']);
Route::delete('/genres/{id}', [GenreController::class, 'destroy']);

// ----------------------
// 🔹 ADMIN ONLY (aktif nanti setelah login/token jadi)
// ----------------------
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('books', BookController::class);
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
});

// ----------------------
// 🔹 CUSTOMER ROUTES (transaksi pembelian buku)
// ----------------------
Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
});
