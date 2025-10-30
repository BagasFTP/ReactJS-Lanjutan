<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Genre extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug']; // pastikan slug fillable

    protected static function booted(): void
    {
        static::saving(function (Genre $genre) {
            // jika slug kosong, generate dari name
            if (blank($genre->slug) && filled($genre->name)) {
                $base = Str::slug($genre->name);
                $slug = $base;
                $i = 2;
                // pastikan unik jika ada unique index
                while (static::where('slug', $slug)->where('id', '!=', $genre->id)->exists()) {
                    $slug = "{$base}-{$i}";
                    $i++;
                }
                $genre->slug = $slug;
            }
        });
    }
}
