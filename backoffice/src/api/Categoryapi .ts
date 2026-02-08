import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {type Category } from '../types/category';

// Configuration de l'URL de base de votre API
const BASE_URL = 'http://localhost:8000/api'; // Ajustez selon votre configuration

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    // Récupérer toutes les catégories
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
    
    // Récupérer une catégorie par ID
    getCategoryById: builder.query<Category, number>({
      query: (id) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),
    
    // Créer une nouvelle catégorie
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (newCategory) => ({
        url: '/categories',
        method: 'POST',
        body: newCategory,
      }),
      invalidatesTags: ['Category'],
    }),
    
    // Mettre à jour une catégorie
    updateCategory: builder.mutation<Category, { id: number; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Category', id }, 'Category'],
    }),
    
    // Supprimer une catégorie
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;