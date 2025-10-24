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
                'genre' => 'Novel',
                'publication_year' => 2005,
                'price' => 120000.00,
            ]
        );

        Book::updateOrCreate(
            ['title' => 'A Game of Thrones'],
            [
                'author_id' => 2,            
                'genre' => 'Fantasy',
                'publication_year' => 1996,
                'price' => 200000.00,
            ]
        );
    }
}
