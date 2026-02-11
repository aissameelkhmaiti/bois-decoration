import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =  'http://localhost:8000/api/reviews';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async ({ page, search }: { page: number; search: string }) => {
    const response = await axios.get(API_URL, {
      params: { page, search }
    });
    return response.data; // Doit retourner { data: [], last_page: 5, ... }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    data: { data: [], last_page: 1 },
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erreur lors du chargement';
      });
  },
});

export default reviewsSlice.reducer;