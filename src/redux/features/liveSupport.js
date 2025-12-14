import { config } from "@/config/config";
import { liveSupportApiSlice } from "../api/apiSlice";

const liveSupportApi = liveSupportApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ page, userId, status }) =>
        `/live-chat/conversations?page=${page}&user_id=${userId}&status=${status}&limit=${config.dataLimit}`,
      providesTags: ["liveSupport"],
    }),
    getSingleMessage: builder.query({
      query: (id) => `/live-chat/conversations/${id}`,
      providesTags: ["conversation"],
    }),
    updateConversation: builder.mutation({
      query: ({ conversationId, data }) => ({
        url: `/live-chat/conversations/${conversationId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["liveSupport"],
    }),
    saveSupportFile: builder.mutation({
      query: (data) => ({
        url: "/files/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetSingleMessageQuery,
  useUpdateConversationMutation,
  useSaveSupportFileMutation,
} = liveSupportApi;
