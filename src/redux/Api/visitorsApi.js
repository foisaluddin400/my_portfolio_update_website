import { baseApi } from './baseApi';

export const visitorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    trackVisitor: builder.mutation({
      query: (data) => ({
        url: '/visitors/track',
        method: 'POST',
        body: data,
      }),
    }),

    getVisitorsStats: builder.query({
      query: () => '/visitors/stats',
    }),

    getAllVisitors: builder.query({
      query: () => '/visitors',
    }),
  }),
});

export const {
  useTrackVisitorMutation,
  useGetVisitorsStatsQuery,
  useGetAllVisitorsQuery,
} = visitorsApi;