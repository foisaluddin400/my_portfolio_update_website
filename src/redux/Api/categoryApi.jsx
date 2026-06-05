import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => {
        return {
          url: "/blogs",
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),

    getShortCategory: builder.query({
      query: ({searchTerm, category }) => {
        return {
          url: `/article/get-all-article?searchTerm=${searchTerm}&category=${category}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),
  }),
});

export const { useGetCategoryQuery, useGetShortCategoryQuery } = settingApi;
