import { apiSlice } from "../api/apiSlice";

const packagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPremiumFeatures: builder.query({
      query: () => ({
        url: "/admin/subscription-packages/list",
        method: "GET",
      }),
      providesTags: ["premiumFeatures"],
    }),
    updatePremiumFeatures: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/subscription-packages/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["premiumFeatures"],
    }),

    deletePremiumFeatures: builder.mutation({
      query: (id) => ({
        url: `/admin/subscription-packages/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["premiumFeatures"],
    }),

    CreatePremiumFeatures: builder.mutation({
      query: (data) => ({
        url: "/admin/subscription-packages/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["premiumFeatures"],
    }),
  }),
});

export const {
  useGetPremiumFeaturesQuery,
  useUpdatePremiumFeaturesMutation,
  useDeletePremiumFeaturesMutation,
  useCreatePremiumFeaturesMutation,
} = packagesApiSlice;
