import { config } from "@/config/config";
import { apiSlice } from "../api/apiSlice";

const jobsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/admin/job/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getSubCategories: builder.query({
      query: () => ({
        url: "/admin/job/sub-categories",
        method: "GET",
      }),
      providesTags: ["SubCategories"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/job/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/job/categories/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/job/categories/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Categories"],
    }),
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/job/sub-categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategories"],
    }),
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/job/sub-categories/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/job/sub-categories/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["SubCategories"],
    }),
    getContinents: builder.query({
      query: () => ({
        url: "/admin/country/categories",
        method: "GET",
      }),
      providesTags: ["Continents"],
    }),
    getCountries: builder.query({
      query: ({ country_category_id, search, page }) => ({
        url: `/admin/country/countries?country_category_id=${country_category_id}&search=${search}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["countries"],
    }),
    addContinent: builder.mutation({
      query: (data) => ({
        url: "/admin/country/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Continents"],
    }),
    updateContinent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/country/categories/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Continents"],
    }),
    deleteContinent: builder.mutation({
      query: (id) => ({
        url: `/admin/country/categories/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Continents"],
    }),
    addCountry: builder.mutation({
      query: (data) => ({
        url: "/admin/country/countries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["countries"],
    }),
    updateCountry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/country/countries/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["countries"],
    }),
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `/admin/country/countries/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["countries"],
    }),
    getJobs: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/jobs/show?paginate=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["jobs"],
    }),
    getPendingJobs: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/jobs/show?paginate=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["pending-jobs"],
    }),
    jobStatusUpdate: builder.mutation({
      query: (data) => ({
        url: "admin/jobs/update/status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs", "pending-jobs"],
    }),
    jobReports: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/report/show?paginate=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["job-reports"],
    }),
    satisfyAllSubmission: builder.mutation({
      query: (jobId) => ({
        url: `/admin/jobs/makeSatisfiedAllSubmissionsOnSpecificJob/${jobId}`,
        method: "POST",
      }),
      invalidatesTags: ["jobs"],
    }),
    getJobSubmissions: builder.query({
      query: ({ jobId, page, status, search }) => {
        return {
          url: `/allsubmittedjobs/${jobId}?paginate=${config.dataLimit}&page=${page}&status=${status}&search=${search}`,
          method: "GET",
        };
      },
      providesTags: ["job-submissions"],
    }),
    getSingleSubmission: builder.query({
      query: (id) => ({
        url: `/admin/job-with-submitted-task/get-single-submission/${id}`,
        method: "GET",
      }),
      providesTags: ["job-single-submissions"],
    }),
    updateJobReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/report/update-status/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["job-reports"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetContinentsQuery,
  useGetCountriesQuery,
  useAddContinentMutation,
  useUpdateContinentMutation,
  useDeleteContinentMutation,
  useAddCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
  useGetJobsQuery,
  useJobStatusUpdateMutation,
  useGetPendingJobsQuery,
  useJobReportsQuery,
  useSatisfyAllSubmissionMutation,
  useGetJobSubmissionsQuery,
  useGetSingleSubmissionQuery,
  useUpdateJobReportMutation,
} = jobsApiSlice;
