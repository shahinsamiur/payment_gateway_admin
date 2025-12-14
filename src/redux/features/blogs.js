import { config } from "@/config/config";
import { apiSlice } from "../api/apiSlice";

const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page }) =>
        `/admin/blogs?paginate=${config.dataLimit}&page=${page}`,
      providesTags: ["blogs"],
    }),
    getSingleBlog: builder.query({
      query: (id) => `/admin/blogs/${id}`,
      providesTags: ["blog"],
    }),
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/admin/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/blogs/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog", "blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/admin/blogs/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
