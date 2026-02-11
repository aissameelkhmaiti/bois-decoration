export interface Review {
  id: number;
  author: string;   // Nom du client
  quote: string;    // Le message/témoignage
  rating: number;   // Note entre 1 et 5
  location?: string; // Ville ou pays (optionnel)
  status?: string;   // 'Approuvé', 'En attente', etc. (si tu gères la modération)
  created_at?: string;
  updated_at?: string;
}

// Type utilisé pour la création (POST)
export interface CreateReviewDto {
  author: string;
  quote: string;
  rating: number;
  location?: string;
}

// Type utilisé pour la réponse paginée de Laravel
export interface PaginatedReviewResponse {
  data: Review[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}