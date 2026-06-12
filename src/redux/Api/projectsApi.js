import { baseApi } from "./baseApi";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ projectType, seeAll } = {}) => {
        let url = "/projects";
        const params = new URLSearchParams();

        if (projectType) params.append("projectType", projectType);
        if (seeAll) params.append("seeAll", seeAll);

        const queryString = params.toString();
        return queryString ? `${url}?${queryString}` : url;
      },
      providesTags: ["projects"],
    }),
    getSingleProject: builder.query({
      query: (id) => `/projects/${id}`,
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetSingleProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
