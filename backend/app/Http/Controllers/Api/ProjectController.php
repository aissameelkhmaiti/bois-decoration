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
    public function index()
    {
        return Project::with(['category', 'images'])->get();
    }

public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string',
        'description' => 'required',
        'client' => 'required',
        'category_id' => 'required|exists:categories,id',
        'cover_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        'images' => 'required|array',
        'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048'
    ]);

    //  Stockage cover photo
    $coverPath = null;
    if ($request->hasFile('cover_image')) {
        $coverPath = $request->file('cover_image')->store('projects/covers', 'public');
    }

    $project = Project::create([
        'title' => $request->title,
        'slug' => Str::slug($request->title),
        'description' => $request->description,
        'client' => $request->client,
        'category_id' => $request->category_id,
        'cover_image' => $coverPath
    ]);

    // 📸 Stockage images galerie
    foreach ($request->file('images') as $image) {
        $path = $image->store('projects/gallery', 'public');

        ProjectImage::create([
            'project_id' => $project->id,
            'image' => $path
        ]);
    }

    return response()->json(
        $project->load('images'),
        201
    );
}
    public function show($id)
    {
        return Project::with(['category', 'images'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $project->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'category_id' => $request->category_id
        ]);

        return response()->json($project);
    }

    public function destroy($id)
    {
        Project::findOrFail($id)->delete();
        return response()->json(['message' => 'Project deleted']);
    }
}
