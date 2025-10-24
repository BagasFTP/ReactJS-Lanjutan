<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'order_number', 'customer_id', 'book_id', 'total_amount',
    ];

    // relasi ke User (customer)
    public function user()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    // relasi ke Book
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
