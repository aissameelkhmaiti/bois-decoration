import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// ✅ Récupérer tous les users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data; // array d'utilisateurs
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

//  Ajouter un user
export const addUser = createAsyncThunk(
  'users/addUser',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type" est géré automatiquement par le navigateur pour FormData
        }
      });
      return res.data.user; // On retourne l'objet user contenu dans la réponse
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

//  UPDATE user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (
    { id, formData }: { id: number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/users/${id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

//  DELETE user
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.message || 'Erreur lors du chargement';
    });

    // updateUser
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.message || 'Erreur lors de la mise à jour';
    });

    // deleteUser
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.users = state.users.filter(u => u.id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.message || 'Erreur lors de la suppression';
    });


    // addUser
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload?.message || 'Erreur lors de l’ajout';
    });
  },
});

export default usersSlice.reducer;
