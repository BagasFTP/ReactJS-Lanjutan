<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('authors')->insert([
            ['name' => 'J. K. Rowling',        'country' => 'UK',     'birth_year' => 1965],
            ['name' => 'George R. R. Martin',  'country' => 'USA',    'birth_year' => 1948],
            ['name' => 'Agatha Christie',      'country' => 'UK',     'birth_year' => 1890],
            ['name' => 'Haruki Murakami',      'country' => 'Japan',  'birth_year' => 1949],
            ['name' => 'Yuval Noah Harari',    'country' => 'Israel', 'birth_year' => 1976],
        ]);
    }
}
