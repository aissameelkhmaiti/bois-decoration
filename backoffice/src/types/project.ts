// src/types/project.ts

export interface ProjectImage {
  id: number;
  project_id: number;
  image: string; // Chemin relatif (ex: 'projects/gallery/xxx.png')
  url: string;   // URL complète générée par Laravel (ex: 'http://localhost:8000/storage/projects/gallery/xxx.png')
  created_at: string;
  updated_at: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_url: string | null;
  category_id: number;
  client: string | null;
  category: ProjectCategory;
  created_at: string;
  updated_at: string;
  images: ProjectImage[];
}

// Type pour le formulaire de création/édition
export interface ProjectFormData {
  title: string;
  description: string;
  client: string;
  category_id: string;
}

// Type pour les catégories dans le state Redux
export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}