<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'image'
    ];

    /**
     * Ajouter l'attribut 'url' automatiquement aux réponses JSON
     */
    protected $appends = ['url'];

    /**
     * Accessor pour générer l'URL complète de l'image
     * 
     * @return string|null
     */
    public function getUrlAttribute()
    {
        return $this->image 
            ? asset('storage/' . $this->image) 
            : null;
    }

    /**
     * Relation avec le projet
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}