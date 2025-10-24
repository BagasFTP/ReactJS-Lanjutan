<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // GET /api/books
    public function index()
    {
        $books = Book::with('author')->orderBy('id')->get();
        return response()->json(['data' => $books]);
    }

    // GET /api/books/{book}
    public function show(Book $book)
    {
        $book->load('author');
        return response()->json(['data' => $book]);
    }

    // POST /api/books
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'genre'             => 'required|string|max:100',
            'publication_year'  => 'required|integer',
            'author_id'         => 'required|exists:authors,id',
        ]);

        $book = Book::create($validated);
        return response()->json(['data' => $book->load('author')], 201);
    }

    // PUT /api/books/{book}
    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title'             => 'sometimes|required|string|max:255',
            'genre'             => 'sometimes|required|string|max:100',
            'publication_year'  => 'sometimes|required|integer',
            'author_id'         => 'sometimes|required|exists:authors,id',
        ]);

        $book->update($validated);
        return response()->json(['data' => $book->load('author')]);
    }

    // DELETE /api/books/{book}
    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(null, 204);
    }
}
