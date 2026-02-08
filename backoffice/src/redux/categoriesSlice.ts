// src/redux/categoriesSlice.ts
import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import {type Category } from '../types/category';

// Action asynchrone pour récupérer les catégories
export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:8000/api/categories'); // Remplace par ton backend
    if (!response.ok) {
      throw new Error('Impossible de charger les catégories');
    }
    const data: Category[] = await response.json();
    return data;
  }
);

interface CategoriesState {
  data: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  data: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erreur inconnue';
      });
  },
});

export default categoriesSlice.reducer;
