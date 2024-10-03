import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const id = "66f25a8262c70c829f0556b9";

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({

    getCategories: builder.query({
      query: () => 'categories/',
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    addCategory: builder.mutation({
      query: (body) => ({
        url: `categories?userId=${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
       // Query for getting single category
       getCategoryById: builder.query({
        query: (id) => ({
          url: `categories/${id}`,
        }),
        providesTags: [{ type: 'Category', id: 'LIST' }],
      }),
 // Edit Category
 editCategory: builder.mutation({
  query: ({ id,userId, updatedCategory }) => ({
    url: `categories/${id}?userId=${userId}`,
    method: 'PATCH',
    body: updatedCategory,
  }),
  invalidatesTags: [{ type: 'Category', id: 'LIST' }],
}),

// / delete category by id and userId
    deleteCategory: builder.mutation({
      query: ({id,userId}) => ({
        // url: `order/${id}`,
        url: `categories/${id}?userId=${userId}`,
       
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }, { type: 'Category' }],
    }),

  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation,useEditCategoryMutation,useGetCategoryByIdQuery ,useDeleteCategoryMutation} = categoryApi;
