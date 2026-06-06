import { baseApi } from './baseApi';

export const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResume: builder.query({
      query: () => '/resume',
      providesTags: ['resume'],
    }),

    getSingleResume: builder.query({
      query: (id) => `/resume/${id}`,
    }),

    createResume: builder.mutation({
      query: (data) => ({
        url: '/resume',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['resume'],
    }),

    updateResume: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/resume/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['resume'],
    }),

    deleteResume: builder.mutation({
      query: (id) => ({
        url: `/resume/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['resume'],
    }),
  }),
});

export const {
  useGetResumeQuery,
  useGetSingleResumeQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
} = resumeApi;