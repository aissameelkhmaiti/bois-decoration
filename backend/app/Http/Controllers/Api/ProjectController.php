<?php

namespace App\Http\Controllers\Api;

use App\Models\ProjectImage;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Liste tous les projets avec leurs relations
     */
    public function index(Request $request)
    {
        // On commence la requête en chargeant la catégorie associée
        $query = Project::with('category', 'images');

        // 1. Filtrer par catégorie (ex: ?category_id=interior-decoration)
        if ($request->has('category_id') && $request->category_id !== 'all') {
            // Si votre colonne en DB est l'ID numérique
            $query->where('category_id', $request->category_id);

        }

        // 2. Recherche textuelle (ex: ?search=cuisine)
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%");
        }

        // 3. Trier par les plus récents
        $query->latest();

        // Retourner les résultats paginés (12 par page pour une grille de 3 ou 4)
        return $query->paginate(12);
    }


    /**
     * Créer un nouveau projet
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        // Stockage de l'image de couverture
        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = $request->file('cover_image')->store('projects/covers', 'public');
        }

        // Création du projet
        $project = Project::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'client' => $request->client,
            'category_id' => $request->category_id,
            'cover_image' => $coverPath
        ]);

        // Stockage des images de galerie
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('projects/gallery', 'public');

                ProjectImage::create([
                    'project_id' => $project->id,
                    'image' => $path
                ]);
            }
        }

        // Retourner le projet avec ses relations
        return response()->json(
            $project->load(['category', 'images']),
            201
        );
    }

    /**
     * Afficher un projet spécifique
     */
    public function show($id)
    {
        return Project::with(['category', 'images'])->findOrFail($id);
    }

    /**
     * Mettre à jour un projet
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        // Mise à jour de l'image de couverture si fournie
        if ($request->hasFile('cover_image')) {
            // Supprimer l'ancienne image de couverture
            if ($project->cover_image && Storage::disk('public')->exists($project->cover_image)) {
                Storage::disk('public')->delete($project->cover_image);
            }

            // Stocker la nouvelle image
            $coverPath = $request->file('cover_image')->store('projects/covers', 'public');
            $project->cover_image = $coverPath;
        }

        // Mise à jour des données du projet
        $project->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'client' => $request->client,
            'category_id' => $request->category_id,
            'cover_image' => $project->cover_image // Utiliser la nouvelle image ou garder l'ancienne
        ]);

        // Ajout de nouvelles images à la galerie si fournies
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('projects/gallery', 'public');

                ProjectImage::create([
                    'project_id' => $project->id,
                    'image' => $path
                ]);
            }
        }

        // Retourner le projet mis à jour avec ses relations
        return response()->json(
            $project->load(['category', 'images'])
        );
    }

    /**
     * Supprimer un projet
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        // Supprimer l'image de couverture du storage
        if ($project->cover_image && Storage::disk('public')->exists($project->cover_image)) {
            Storage::disk('public')->delete($project->cover_image);
        }

        // Supprimer les images de galerie du storage
        foreach ($project->images as $image) {
            if (Storage::disk('public')->exists($image->image)) {
                Storage::disk('public')->delete($image->image);
            }
        }

        // Supprimer le projet (les images de la BDD seront supprimées via cascade ou manuellement)
        $project->delete();

        return response()->json([
            'message' => 'Projet supprimé avec succès'
        ], 200);
    }

    /**
     * Supprimer une image spécifique de la galerie
     * Route optionnelle : DELETE /api/projects/{id}/images/{imageId}
     */
    public function deleteImage($projectId, $imageId)
    {
        $project = Project::findOrFail($projectId);
        $image = ProjectImage::where('project_id', $project->id)
            ->where('id', $imageId)
            ->firstOrFail();

        // Supprimer le fichier du storage
        if (Storage::disk('public')->exists($image->image)) {
            Storage::disk('public')->delete($image->image);
        }

        // Supprimer l'enregistrement de la BDD
        $image->delete();

        return response()->json([
            'message' => 'Image supprimée avec succès'
        ], 200);
    }
}