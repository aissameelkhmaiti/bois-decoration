import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import { type Project } from '../types/project';

const API_URL = 'http://localhost:8000/api/projects';

// -----------------------------
// Types
// -----------------------------
interface PaginationMeta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

interface PaginatedProjectsResponse extends PaginationMeta {
  data: Project[];
}

interface ProjectsState {
  items: Project[];
  pagination: PaginationMeta | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// -----------------------------
// Helper
// -----------------------------
const getAuthHeader = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// -----------------------------
// Thunks
// -----------------------------

export const fetchProjects = createAsyncThunk<
  PaginatedProjectsResponse,
  { page?: number; search?: string }
>('projects/fetchProjects', async ({ page = 1, search = '' }) => {
  const url = `${API_URL}?page=${page}&search=${encodeURIComponent(search)}`;
  const response = await fetch(url, { headers: getAuthHeader() });

  if (!response.ok) throw new Error('Impossible de charger les projets');
  return response.json();
});

export const createProject = createAsyncThunk<Project, FormData>(
  'projects/createProject',
  async (formData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    });

    if (!response.ok) throw new Error('Impossible de créer le projet');
    return response.json();
  }
);

export const updateProject = createAsyncThunk<
  Project,
  { id: number; formData: FormData }
>('projects/updateProject', async ({ id, formData }) => {
  // If using Laravel, we often need POST + _method=PUT for FormData/File uploads
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'POST', 
    headers: getAuthHeader(),
    body: formData,
  });

  if (!response.ok) throw new Error('Impossible de mettre à jour le projet');
  return response.json();
});

export const deleteProject = createAsyncThunk<number, number>(
  'projects/deleteProject',
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });

    if (!response.ok) throw new Error('Impossible de supprimer le projet');
    return id;
  }
);

// -----------------------------
// Slice
// -----------------------------
const initialState: ProjectsState = {
  items: [],
  pagination: null,
  status: 'idle',
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
          per_page: action.payload.per_page,
        };
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erreur inconnue';
      })
      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearError } = projectsSlice.actions;
export default projectsSlice.reducer;