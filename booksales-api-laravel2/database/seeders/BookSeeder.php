<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        Book::updateOrCreate(
            ['title' => 'Laskar Pelangi'],
            [
                'author_id' => 1,
                'genre' => 'Fantasy',
                'publication_year' => 2005,
                'price' => 120000.00,
                'cover_url' => 'https://cdn.gramedia.com/uploads/items/laskar_pelangi.jpg',
            ]
        );

        Book::updateOrCreate(
            ['title' => 'A Game of Thrones'],
            [
                'author_id' => 2,
                'genre' => 'Fantasy',
                'publication_year' => 1996,
                'price' => 200000.00,
                'cover_url' => 'https://m.media-amazon.com/images/I/81r+LN6S8EL._AC_UF1000,1000_QL80_.jpg',
            ]
        );

        Book::updateOrCreate(
            ['title' => 'Filosofi Kopi'],
            [
                'author_id' => 3,
                'genre' => 'Science',
                'publication_year' => 2006,
                'price' => 75000.00,
                'cover_url' => 'https://cdn.gramedia.com/uploads/items/9786024246948_Filosofi-Kopi.jpg',
            ]
        );
    }
}
