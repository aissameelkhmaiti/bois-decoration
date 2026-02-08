<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'client',
        'cover_image',
        'category_id'
    ];

      protected $appends = ['cover_url'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProjectImage::class);
    }
       public function getCoverUrlAttribute()
    {
        if (!$this->cover_image) {
            return null;
        }

        // L'image est stockée dans storage/app/public/projects/covers/xxx.jpg
        // Elle sera accessible via public/storage/projects/covers/xxx.jpg
        return url('storage/' . $this->cover_image);
    }

      
}
