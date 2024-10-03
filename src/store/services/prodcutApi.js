import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const id = "66f25a8262c70c829f0556b9";

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Product', 'Cart'],
  endpoints: (builder) => ({

    addProduct: builder.mutation({
      query: (body) => ({
        url: `product?userId=${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),
    
    editProduct: builder.mutation({
      query: ({ productSlug, updatedProduct }) => ({
        url: `product/${productSlug}?userId=${id}`,
        method: 'PATCH',
        body: updatedProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),

    getProducts: builder.query({
      query: () => 'product/',
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    getProductBySlug: builder.query({
      query: (productSlug) => `product/${productSlug}`,
      providesTags: (result, error, productSlug) => [{ type: 'Product', id: productSlug }],
    }),

    deleteProduct: builder.mutation({
      query: (productSlug) => ({
        url: `product/${productSlug}?userId=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),

    // Add a query to get cart data
    getCart: builder.query({
      query: () => `cart?userId=${id}`,
      providesTags: [{ type: 'Cart' }],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetCartQuery,
} = productsApi;
