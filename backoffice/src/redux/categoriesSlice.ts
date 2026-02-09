// src/redux/categoriesSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { type Category } from '../types/category';

const API_URL = 'http://localhost:8000/api/categories';

// --- Interface de la réponse Laravel ---
interface PaginatedCategories {
  data: Category[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

// Helper pour récupérer le token
const getAuthHeader = (): HeadersInit => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

// -----------------------------
// Thunks
// -----------------------------

// Récupérer les catégories avec pagination et recherche
export const fetchCategories = createAsyncThunk<PaginatedCategories, { page: number; search: string } | undefined>(
  'categories/fetchCategories',
  async (arg) => {
    // On donne des valeurs par défaut si arg est undefined
    const page = arg?.page ?? 1;
    const search = arg?.search ?? '';
    
    const url = `${API_URL}?page=${page}&search=${encodeURIComponent(search)}`;
    const response = await fetch(url, { headers: { ...getAuthHeader() } });
    
    if (!response.ok) throw new Error('Impossible de charger les catégories');
    return (await response.json()) as PaginatedCategories;
  }
);

export const createCategory = createAsyncThunk<Category, { name: string; description?: string }>(
  'categories/createCategory',
  async (data) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Impossible de créer la catégorie');
    return (await response.json()) as Category;
  }
);

export const updateCategory = createAsyncThunk<Category, { id: number; data: { name: string; description?: string } }>(
  'categories/updateCategory',
  async ({ id, data }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { ...getAuthHeader() },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Impossible de mettre à jour');
    return (await response.json()) as Category;
  }
);

export const deleteCategory = createAsyncThunk<number, number>(
  'categories/deleteCategory',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (!response.ok) throw new Error('Impossible de supprimer');
    return id;
  }
);

// -----------------------------
// Slice
// -----------------------------
interface CategoriesState {
  data: PaginatedCategories | null; // Changé de Category[] à PaginatedCategories
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  data: null, // Initialisé à null
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCategories.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<PaginatedCategories>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erreur inconnue';
      })

      // CREATE
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        // Optionnel : Recharger la liste via fetchCategories après un ajout 
        // ou l'ajouter manuellement au début du tableau :
        if (state.data) {
          state.data.data = [action.payload, ...state.data.data];
        }
      })

      // UPDATE
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        if (state.data) {
          const index = state.data.data.findIndex(c => c.id === action.payload.id);
          if (index >= 0) state.data.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
        if (state.data) {
          state.data.data = state.data.data.filter(c => c.id !== action.payload);
        }
      });
  },
});

export default categoriesSlice.reducer;