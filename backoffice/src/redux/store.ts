// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import projectsReducer from './projectsSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    projects: projectsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
