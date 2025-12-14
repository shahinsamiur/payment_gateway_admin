import { apiSlice } from "../api/apiSlice";

const pagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postPages: builder.mutation({
      query: (body) => ({
        url: "/admin/content-page-store-or-update",
        method: "POST",
        body: body,
      }),
    }),
    getPages: builder.query({
      query: (page_name) => ({
        url: `/content/pages/${page_name}`,
        method: "GET",
      }),
    }),
    getFaq: builder.query({
      query: () => ({
        url: `/faqs`,
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    postFaq: builder.mutation({
      query: (body) => ({
        url: "/admin/faq-store",
        method: "POST",
        body: body,
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ body, id }) => {
        return {
          url: `/admin/faq-update/${id}`,
          method: "POST",
          body: body,
        };
      },
    }),
    removeFaq: builder.mutation({
      query: (id) => ({
        url: `/admin/faq-delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  usePostPagesMutation,
  useGetPagesQuery,
  useGetFaqQuery,
  usePostFaqMutation,
  useUpdateFaqMutation,
  useRemoveFaqMutation,
} = pagesApiSlice;
