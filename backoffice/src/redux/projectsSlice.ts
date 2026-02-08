// src/redux/projectsSlice.ts
import { createSlice, createAsyncThunk,type PayloadAction } from '@reduxjs/toolkit';
import {type Project } from '../types/project';

export const fetchProjects = createAsyncThunk<Project[]>(
  'projects/fetchProjects',
  async () => {
    const response = await fetch('http://localhost:8000/api/projects'); // ton endpoint réel
    if (!response.ok) throw new Error('Impossible de charger les projets');
    const data: Project[] = await response.json();
    return data;
  }
);

interface ProjectsState {
  data: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectsState = {
  data: [],
  status: 'idle',
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Erreur inconnue';
      });
  },
});

export default projectsSlice.reducer;
