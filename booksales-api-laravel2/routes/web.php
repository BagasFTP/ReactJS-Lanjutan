<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => redirect('/api/ping'));

Route::get('/authors', fn() => redirect('/api/authors'));

Route::get('/genres', fn() => redirect('/api/genres'));
