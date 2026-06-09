import { baseApi } from './baseApi';

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => '/about',
      providesTags: ['about'],
    }),

 

    createAbout: builder.mutation({
      query: (data) => ({
        url: '/about',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['about'],
    }),

    updateAbout: builder.mutation({
      query: (data ) => ({
        url: `/about`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['about'],
    }),


  }),
});

export const {
    useGetAboutQuery,
    useCreateAboutMutation,
    useUpdateAboutMutation,

} = aboutApi;