import { apiSlice } from "../api/apiSlice";

const CurrencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getcurrencyConversionRate: builder.query({
      query: () => ({
        url: "/admin/currency-conversion-rate/index",
        method: "GET",
      }),
      providesTags: ["currencyConversionRate"],
    }),

    addCurrency: builder.mutation({
      query: (data) => ({
        url: "/admin/currency-conversion-rate/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["currencyConversionRate"],
    }),
    updateCurrency: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/currency-conversion-rate/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["currencyConversionRate"],
    }),
    deleteCurrency: builder.mutation({
      query: (id) => ({
        url: `/admin/currency-conversion-rate/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["currencyConversionRate"],
    }),
  }),
});

export const {
  useGetcurrencyConversionRateQuery,
  useDeleteCurrencyMutation,
  useUpdateCurrencyMutation,
  useAddCurrencyMutation,
} = CurrencyApiSlice;
