import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:8000/api/quotes';

export interface Quote {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  city?: string;
  project_type: string;
  description: string;
  budget?: string;
  photo?: string;
  created_at: string;
}

interface PaginatedQuotes {
  data: Quote[];
  current_page: number;
  last_page: number;
  total: number;
}

interface QuotesState {
  data: PaginatedQuotes | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  };
};

export const fetchQuotes = createAsyncThunk<PaginatedQuotes, { page: number; search: string } | undefined>(
  'quotes/fetchQuotes',
  async (arg) => {
    const page = arg?.page ?? 1;
    const search = arg?.search ?? '';
    const response = await fetch(`${API_URL}?page=${page}&search=${encodeURIComponent(search)}`, {
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Erreur chargement devis');
    return await response.json();
  }
);

export const deleteQuote = createAsyncThunk<number, number>(
  'quotes/deleteQuote',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    if (!response.ok) throw new Error('Erreur suppression');
    return id;
  }
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: { data: null, status: 'idle', error: null } as QuotesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        if (state.data) {
          state.data.data = state.data.data.filter(q => q.id !== action.payload);
        }
      });
  },
});

export default quotesSlice.reducer;