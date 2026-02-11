// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import projectsReducer from './projectsSlice';
import usersReducer from './usersSlice';
import quoteReducer from './quotesSlice';

import reviewReducer from './reviewSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    projects: projectsReducer,
    users: usersReducer,
    quotes: quoteReducer,
    reviews: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
