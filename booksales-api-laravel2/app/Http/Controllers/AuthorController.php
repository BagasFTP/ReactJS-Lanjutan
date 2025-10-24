<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AuthorController extends Controller
{
    // GET /api/authors
    public function index()
    {
        $authors = Author::select('id', 'name', 'country', 'birth_year', 'created_at')
            ->latest('id')
            ->get();

        return response()->json([
            'status' => true,
            'data'   => $authors,
        ], 200);
    }

    // POST /api/authors
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:100', 'unique:authors,name'],
            'country'     => ['nullable', 'string', 'max:100'],
            'birth_year'  => ['nullable', 'integer', 'digits:4'],
        ]);

        $author = Author::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Author berhasil ditambahkan',
            'data'    => $author,
        ], 201);
    }

    // GET /api/authors/{id}
    public function show($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json(['message' => 'Author tidak ditemukan'], 404);
        }

        return response()->json($author);
    }

    // PUT /api/authors/{id}
    public function update(Request $request, $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json(['message' => 'Author tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'name'        => ['sometimes', 'required', 'string', 'max:100', Rule::unique('authors', 'name')->ignore($author->id)],
            'country'     => ['sometimes', 'nullable', 'string', 'max:100'],
            'birth_year'  => ['sometimes', 'nullable', 'integer', 'digits:4'],
        ]);

        $author->update($validated);

        return response()->json($author);
    }

    // DELETE /api/authors/{id}
    public function destroy($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json(['message' => 'Author tidak ditemukan'], 404);
        }

        $author->delete();

        return response()->json(['message' => 'Author berhasil dihapus']);
    }
}
