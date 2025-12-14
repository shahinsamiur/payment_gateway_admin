import { apiSlice } from "../api/apiSlice";
import { setSiteData } from "../slices/authSlice";

const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => "/admin/dashboard/index",
      providesTags: ["getIndex"],
    }),
    getSiteData: builder.query({
      query: () => ({
        url: "/site-data",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSiteData(data));
        } catch (error) {
          console.error("Failed to fetch site data:", error);
        }
      },
      providesTags: ["getSiteData"],
    }),
    getTransactionData: builder.query({
      query: () => ({
        url: "/admin/daily-transaction-record/index",
        method: "GET",
      }),
      providesTags: ["transactionData"],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetSiteDataQuery,
  useGetTransactionDataQuery,
} = dashboardApiSlice;
