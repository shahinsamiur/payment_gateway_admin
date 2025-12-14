import { config } from "@/config/config";
import { apiSlice } from "../api/apiSlice";

const managerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllManagers: builder.query({
      query: ({ search, page }) =>
        `/admin/manager/report?paginate=${config.dataLimit}&search=${search}&page=${page}`,
      providesTags: ["manager"],
    }),
    addManager: builder.mutation({
      query: (data) => ({
        url: "/admin/manager/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["manager"],
    }),
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/admin/manager/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["manager"],
    }),
    getManagerDetails: builder.query({
      query: ({ id, page }) =>
        `/admin/manager/report-details/${id}?paginate=${config.dataLimit}&page=${page}`,
      providesTags: ["manager-details"],
    }),
  }),
});

export const {
  useGetAllManagersQuery,
  useAddManagerMutation,
  useDeleteManagerMutation,
  useGetManagerDetailsQuery,
} = managerSlice;
