import { config } from "@/config/config";
import { apiSlice } from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, search, ...filters }) => {
        const params = new URLSearchParams({
          page,
          search,
          ...filters,
        }).toString();
        return {
          url: `/admin/user/all?paginate=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    getPendingUsersVerification: builder.query({
      query: ({ page, search }) => ({
        url: `/admin/pending-verification-list?paginate=${config.dataLimit}&page=${page}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["pending-users"],
    }),
    userActiveInactive: builder.mutation({
      query: (id) => ({
        url: `/admin/user/active/toggle/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["users", "user"],
    }),
    userVerificationStatusUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/verification-status-update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pending-users", "users"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    toggleUserRole: builder.mutation({
      query: (id) => ({
        url: `/admin/user/admin/toggle/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["users"],
    }),
    adjustUserBalance: builder.mutation({
      query: (data) => ({
        url: "/admin/transaction-admin/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getPendingDeactivations: builder.query({
      query: ({ page, status }) => ({
        url: `/admin/request-for-deactivation?paginate=${config.dataLimit}page=${page}&status=${status}`,
        method: "GET",
      }),
      providesTags: ["pending-deactivations"],
    }),
    updateDeactivationRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/request-for-deactivation/${id}/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pending-deactivations"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPendingUsersVerificationQuery,
  useUserActiveInactiveMutation,
  useUserVerificationStatusUpdateMutation,
  useGetSingleUserQuery,
  useToggleUserRoleMutation,
  useAdjustUserBalanceMutation,
  useGetPendingDeactivationsQuery,
  useUpdateDeactivationRequestMutation,
} = userApiSlice;
