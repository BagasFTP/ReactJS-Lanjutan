<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    // ADMIN ONLY → Read All
    public function index()
    {
        $transactions = Transaction::with(['user', 'book'])->get();

        if ($transactions->isEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'Resource data not found!',
                'data'    => [],
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get all resources',
            'data'    => $transactions,
        ], 200);
    }

    // CUSTOMER ONLY → Create
    public function store(Request $request)
    {
        $data = $request->validate([
            'order_number' => ['required','string','max:50','unique:transactions,order_number'],
            'book_id'      => ['required','exists:books,id'],
            'total_amount' => ['required','numeric','min:0'],
        ]);

        $customerId = $request->user()->id;

        // Validasi tambahan: pastikan buku ada
        $book = Book::find($data['book_id']);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        $trx = Transaction::create([
            'order_number' => $data['order_number'],
            'customer_id'  => $customerId,
            'book_id'      => $data['book_id'],
            'total_amount' => $data['total_amount'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Transaction created',
            'data'    => $trx->load(['user','book']),
        ], 201);
    }

    // CUSTOMER ONLY → Show (hanya miliknya)
    public function show($id, Request $request)
    {
        $trx = Transaction::with(['user','book'])->find($id);
        if (!$trx) return response()->json(['message' => 'Transaction not found'], 404);

        if ($request->user()->role === 'customer' && $trx->customer_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden: not your transaction'], 403);
        }

        return response()->json([
            'success' => true,
            'message' => 'Get resource',
            'data'    => $trx,
        ], 200);
    }

    // CUSTOMER ONLY → Update (hanya miliknya)
    public function update(Request $request, $id)
    {
        $trx = Transaction::find($id);
        if (!$trx) return response()->json(['message' => 'Transaction not found'], 404);

        if ($request->user()->role === 'customer' && $trx->customer_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden: not your transaction'], 403);
        }

        $data = $request->validate([
            'order_number' => ['sometimes','required','string','max:50', Rule::unique('transactions','order_number')->ignore($trx->id)],
            'book_id'      => ['sometimes','required','exists:books,id'],
            'total_amount' => ['sometimes','required','numeric','min:0'],
        ]);

        $trx->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Transaction updated',
            'data'    => $trx->load(['user','book']),
        ], 200);
    }

    // ADMIN ONLY → Destroy
    public function destroy($id)
    {
        $trx = Transaction::find($id);
        if (!$trx) return response()->json(['message' => 'Transaction not found'], 404);

        $trx->delete();

        return response()->json([
            'success' => true,
            'message' => 'Transaction deleted',
        ], 200);
    }
}
