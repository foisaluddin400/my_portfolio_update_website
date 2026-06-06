import { baseApi } from './baseApi';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['profile'],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),

    createProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['profile'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useCreateProfileMutation,
} = profileApi;