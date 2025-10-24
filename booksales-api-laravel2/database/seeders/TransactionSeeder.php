<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        Transaction::updateOrCreate(
            ['order_number' => 'ORD-0001'],
            ['customer_id' => 2, 'book_id' => 1, 'total_amount' => 250000.00]
        );

        Transaction::updateOrCreate(
            ['order_number' => 'ORD-0002'],
            ['customer_id' => 2, 'book_id' => 2, 'total_amount' => 50000.00]
        );
    }
}
