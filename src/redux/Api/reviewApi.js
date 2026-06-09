import { baseApi } from './baseApi';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => '/reviews',
      providesTags: ['review'],
    }),

    getSingleReview: builder.query({
      query: (id) => `/reviews/${id}`,
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),

 updateReview: builder.mutation({
  query: ({ id, data }) => ({
    url: `/reviews/${id}`,
    method: 'PUT',
    body: data,        
  }),
}),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['review'],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetSingleReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;