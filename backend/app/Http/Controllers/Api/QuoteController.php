<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Jobs\GenerateQuotePdf;
use Illuminate\Support\Facades\Storage;

class QuoteController extends Controller
{
    /**
     * Liste tous les devis
     */
    public function index(Request $request)
{
    // 1. On commence la requête
    $query = Quote::query();
 
    if ($request->has('search') && $request->search != '') {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('full_name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('project_type', 'like', "%{$search}%");
        });
    }

    // 3. Tri par date (le plus récent en premier)
    $query->latest();

 
    $quotes = $query->paginate(10);

    return response()->json($quotes);
}

    /**
     * Création d'un devis et d'un utilisateur
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'    => 'required|string|max:255',
            'phone'        => 'required|string|max:30',
            'email'        => 'required|email',
            'city'         => 'nullable|string|max:255',
            'project_type' => 'required|string',
            'description'  => 'required|string',
            'budget'       => 'nullable|string',
            'photo'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', 
        ]);

        try {
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('quotes', 'public');
                $validated['photo'] = $path;
            }

            $user = User::firstOrCreate(
                ['email' => $validated['email']],
                [
                    'name'     => $validated['full_name'],
                    'password' => Hash::make(Str::random(12)), 
                    'role'     => 'client',
                    'status'   => 'actif',
                ]
            );

            $quote = Quote::create($validated);

            GenerateQuotePdf::dispatch($quote);

            return response()->json([
                'message' => 'Quote sent successfully and account created',
                'quote_id' => $quote->id,
                'user_created' => $user->wasRecentlyCreated 
            ], 201);
            
        } catch (\Exception $e) {
            Log::error('Quote & User storage error: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred.'], 500);
        }
    }

    /**
     * Afficher un devis spécifique
     */
    public function show($id)
    {
        $quote = Quote::find($id);

        if (!$quote) {
            return response()->json(['message' => 'Quote not found'], 404);
        }

        return response()->json($quote);
    }

    /**
     * Mettre à jour un devis
     */
    public function update(Request $request, $id)
    {
        $quote = Quote::find($id);

        if (!$quote) {
            return response()->json(['message' => 'Quote not found'], 404);
        }

        $validated = $request->validate([
            'full_name'    => 'sometimes|string|max:255',
            'phone'        => 'sometimes|string|max:30',
            'email'        => 'sometimes|email',
            'city'         => 'nullable|string|max:255',
            'project_type' => 'sometimes|string',
            'description'  => 'sometimes|string',
            'budget'       => 'nullable|string',
            'photo'        => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        try {
            if ($request->hasFile('photo')) {
                // Optionnel : supprimer l'ancienne photo si nécessaire
                if ($quote->photo) {
                    Storage::disk('public')->delete($quote->photo);
                }
                $path = $request->file('photo')->store('quotes', 'public');
                $validated['photo'] = $path;
            }

            $quote->update($validated);

            return response()->json([
                'message' => 'Quote updated successfully',
                'quote' => $quote
            ]);
        } catch (\Exception $e) {
            Log::error('Quote update error: ' . $e->getMessage());
            return response()->json(['message' => 'Update failed'], 500);
        }
    }

    /**
     * Supprimer un devis
     */
    public function destroy($id)
    {
        $quote = Quote::find($id);

        if (!$quote) {
            return response()->json(['message' => 'Quote not found'], 404);
        }

        try {
            // Supprimer la photo physiquement si elle existe
            if ($quote->photo) {
                Storage::disk('public')->delete($quote->photo);
            }

            $quote->delete();

            return response()->json(['message' => 'Quote deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Quote deletion error: ' . $e->getMessage());
            return response()->json(['message' => 'Deletion failed'], 500);
        }
    }
}