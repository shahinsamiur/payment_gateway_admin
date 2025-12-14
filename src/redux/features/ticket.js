import { config } from "@/config/config";
import { apiSlice } from "../api/apiSlice";

const ticketApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    drawList: builder.query({
      query: ({ perPage, page, date }) => ({
        url: `/admin/draw-list/${perPage}?page=${page}&draw_date=${date}`,
        method: "GET",
      }),
      providesTags: ["DrawList"],
    }),

    ongoingTicketBuyerList: builder.query({
      query: ({ page }) => ({
        url: `/admin/ticket-purchase-history?paginate=${config.dataLimit}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["ongoingTicketBuyerList"],
    }),

    getDrawSettings: builder.query({
      query: () => ({
        url: `/admin/draw-setting`,
        method: "GET",
      }),
      providesTags: ["getDrawSettings"],
    }),

    updateDrawSettings: builder.mutation({
      query: (data) => ({
        url: "/admin/draw-setting-configuration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getDrawSettings"],
    }),

    drawWinners: builder.mutation({
      query: (data) => ({
        url: "/admin/manually-select-draw-winner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["drawWinners"],
    }),
    getTicket: builder.query({
      query: () => ({
        url: "/daily-draws/V1/get-ticket-data",
        method: "GET",
      }),
      providesTags: ["ticket"],
    }),
  }),
});

export const {
  useOngoingTicketBuyerListQuery,
  useDrawListQuery,
  useGetDrawSettingsQuery,
  useUpdateDrawSettingsMutation,
  useDrawWinnersMutation,
  useGetTicketQuery,
} = ticketApiSlice;
