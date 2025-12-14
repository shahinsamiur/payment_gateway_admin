import { apiSlice } from "../api/apiSlice";

const generalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGenarelSetting: builder.query({
      query: () => ({
        url: `/admin/general/edit`,
        method: "GET",
      }),
      providesTags: ["getGenarelSetting"],
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: `/admin/general/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["updateGenarelSetting"],
    }),
    getAllCostList: builder.query({
      query: () => ({
        url: `/admin/cost-center/all`,
        method: "GET",
      }),
      providesTags: ["getAllCostList"],
    }),
    updateCostList: builder.mutation({
      query: (data) => ({
        url: `/admin/cost-center/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllCostList"],
    }),
    updateAdsCost: builder.mutation({
      query: (data) => ({
        url: `/admin/ads-cost-store-or-update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllCostList"],
    }),
  }),
});

export const {
  useGetGenarelSettingQuery,
  useUpdateSettingsMutation,
  useGetAllCostListQuery,
  useUpdateCostListMutation,
  useUpdateAdsCostMutation,
} = generalApiSlice;
