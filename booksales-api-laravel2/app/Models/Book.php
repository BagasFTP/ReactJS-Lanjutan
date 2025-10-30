<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'genre',              // string (bukan FK) sesuai migrasi kamu
        'publication_year',
        'author_id',
        'cover_url',
        'price',              // <- tambahkan ini
    ];

    public function author() {
        return $this->belongsTo(Author::class);
    }
}
