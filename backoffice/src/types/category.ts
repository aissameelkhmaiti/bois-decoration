// src/types.ts
export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  description?: string; // facultatif si ton backend ne le fournit pas
  count?: number;       // facultatif si tu veux afficher un nombre d'articles
}
