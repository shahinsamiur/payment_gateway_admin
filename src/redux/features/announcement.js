import { apiSlice } from "../api/apiSlice";

const announcementSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncement: builder.query({
      query: () => `/admin/get-announcement`,
      providesTags: ["announcements"],
    }),
    updateAnnouncement: builder.mutation({
      query: (data) => ({
        url: `/admin/update-announcement`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["announcements"],
    }),
  }),
});

export const { useGetAnnouncementQuery, useUpdateAnnouncementMutation } =
  announcementSlice;
