<?php

namespace App\Http\Controllers\Api;

use App\Models\Review;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * READ ALL : Récupérer tous les avis
     */
    public function index(Request $request)
{
    // 1. On initialise la requête
    $query = Review::query();

    // 2. On ajoute la logique de recherche (si le paramètre 'search' est présent)
    if ($request->has('search') && !empty($request->search)) {
        $searchTerm = $request->search;
        $query->where(function($q) use ($searchTerm) {
            $q->where('author', 'LIKE', "%{$searchTerm}%")
              ->orWhere('quote', 'LIKE', "%{$searchTerm}%")
              ->orWhere('location', 'LIKE', "%{$searchTerm}%");
        });
    }

    // 3. On trie par date et on utilise la pagination de Laravel
    // paginate(10) retournera automatiquement la structure { data: [], last_page: x, total: y, ... }
    $reviews = $query->orderBy('created_at', 'desc')->paginate(10);

    return response()->json($reviews, 200);
}

    /**
     * CREATE : Enregistrer un nouvel avis (déjà fait)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'author'   => 'required|string|max:255',
            'quote'    => 'required|string|min:10',
            'rating'   => 'required|integer|between:1,5',
            'location' => 'nullable|string'
        ]);

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Merci pour votre avis !',
            'data' => $review
        ], 201);
    }

    /**
     * READ ONE : Afficher un avis spécifique
     */
    public function show($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Avis non trouvé'], 404);
        }

        return response()->json($review, 200);
    }

    /**
     * UPDATE : Modifier un avis existant
     */
    public function update(Request $request, $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Avis non trouvé'], 404);
        }

        $validated = $request->validate([
            'author'   => 'sometimes|required|string|max:255',
            'quote'    => 'sometimes|required|string|min:10',
            'rating'   => 'sometimes|required|integer|between:1,5',
            'location' => 'nullable|string'
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Avis mis à jour avec succès',
            'data' => $review
        ], 200);
    }

    /**
     * DELETE : Supprimer un avis
     */
    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Avis non trouvé'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'Avis supprimé définitivement'], 200);
    }
}