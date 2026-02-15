<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Ici, on ne fait QUE créer le contact. 
        // L'Observer s'occupe de l'Event et du Mail automatiquement.
        Contact::create($validated);

        return response()->json(['message' => 'Message envoyé avec succès !'], 201);
    }
}