<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class GenreController extends Controller
{
    /**
     * GET /api/genres
     */
    public function index()
    {
        $genres = Genre::select('id', 'name', 'slug', 'created_at')
            ->latest('id')
            ->get();

        return response()->json([
            'status' => true,
            'data'   => $genres,
        ], 200);
    }

    /**
     * POST /api/genres
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', 'unique:genres,name'],
            'slug' => ['nullable', 'string', 'max:150', 'unique:genres,slug'],
        ]);

        // Auto-generate slug jika tidak dikirim
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $genre = Genre::create($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Genre berhasil ditambahkan',
            'data'    => $genre,
        ], 201);
    }

    /**
     * GET /api/genres/{id}
     */
    public function show($id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        return response()->json($genre, 200);
    }

    /**
     * PUT /api/genres/{id}
     */
    public function update(Request $request, $id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:100', Rule::unique('genres', 'name')->ignore($genre->id)],
            'slug' => ['sometimes', 'nullable', 'string', 'max:150', Rule::unique('genres', 'slug')->ignore($genre->id)],
        ]);

        // Jika name diubah tapi slug tidak dikirim, boleh auto-update slug (opsional)
        if (array_key_exists('name', $validated) && !array_key_exists('slug', $validated)) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $genre->update($validated);

        return response()->json([
            'status'  => true,
            'message' => 'Genre berhasil diperbarui',
            'data'    => $genre,
        ], 200);
    }

    /**
     * DELETE /api/genres/{id}
     */
    public function destroy($id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json(['message' => 'Genre not found'], 404);
        }

        $genre->delete();

        return response()->json([
            'status'  => true,
            'message' => 'Genre berhasil dihapus',
        ], 200);
    }
}
