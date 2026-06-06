import { baseApi } from './baseApi';

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => '/skills',
      providesTags: ['skills'],
    }),

    createSkill: builder.mutation({
      query: (data) => ({
        url: '/skills',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['skills'],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['skills'],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useCreateSkillMutation,
  useDeleteSkillMutation,
} = skillsApi;