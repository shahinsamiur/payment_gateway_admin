import { apiSlice } from "../api/apiSlice";

const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "/admin/get-services",
        method: "GET",
      }),
      providesTags: ["services"],
    }),
    storeService: builder.mutation({
      query: (data) => ({
        url: "/admin/store-service/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/update-service/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-service/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useStoreServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApiSlice;
