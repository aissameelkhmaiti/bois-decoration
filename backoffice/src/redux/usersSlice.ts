import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// --- Types ---
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'actif' | 'inactif';
  avatar?: string;
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

interface UsersState {
  users: User[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  pagination: null,
  loading: false,
  error: null,
};

// --- Thunks ---

// FETCH avec pagination et recherche
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page = 1, search = '' }: { page?: number; search?: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/users?page=${page}&search=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data; // Retourne l'objet paginé de Laravel
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Erreur de connexion');
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/register`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, formData }: { id: number; formData: FormData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      // On utilise POST avec _method=PUT pour supporter l'envoi de fichiers (Avatar)
      const res = await axios.post(`${API_URL}/users/${id}?_method=PUT`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// --- Slice ---
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
        };
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur lors du chargement';
      })
      // Add User
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.unshift(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.users[index] = action.payload;
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;