import { baseApi } from './baseApi';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => '/review',
      providesTags: ['review'],
    }),

    getSingleReview: builder.query({
      query: (id) => `/review/${id}`,
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: '/review',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),

    updateReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/review/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
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