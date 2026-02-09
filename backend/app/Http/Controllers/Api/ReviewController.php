<?php

namespace App\Http\Controllers\Api;
use App\Models\Review;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReviewController extends Controller
{

public function store(Request $request) {
    $validated = $request->validate([
        'author' => 'required|string|max:255',
        'quote' => 'required|string|min:10',
        'rating' => 'required|integer|between:1,5',
        'location' => 'nullable|string'
    ]);

    $review = Review::create($validated);
    return response()->json(['message' => 'Merci pour votre avis !'], 201);
}

}
