// src/types.ts
export interface ProjectImage {
  id: number;
  project_id: number;
  image: string;
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
