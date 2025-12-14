import { config } from "@/config/config";
import { apiSlice } from "../api/apiSlice";

const financialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWithDrawRequest: builder.query({
      query: ({ status, payment_method, page }) => ({
        url: `/admin/deposit-withdraw-manual/all-transactions?paginate=${config.dataLimit}&status=${status}&payment_method=${payment_method}&type=withdrawal&page=${page}`,
        method: "GET",
      }),
      providesTags: ["withdrawRequest"],
    }),
    updaeWithDrawRequest: builder.mutation({
      query: (data) => ({
        url: "/admin/deposit-withdraw-manual/update-status",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["withdrawRequest"],
    }),
    getDepositRequest: builder.query({
      query: ({ status, payment_method, page }) => ({
        url: `/admin/deposit-withdraw-manual/all-transactions?paginate=${config.dataLimit}&status=${status}&payment_method=${payment_method}&type=deposit&page=${page}`,
        method: "GET",
      }),
      providesTags: ["depositRequest"],
    }),
    updaeDepositRequest: builder.mutation({
      query: (data) => ({
        url: "/admin/deposit-withdraw-manual/update-status",
        method: "POST",
        body: data,
      }),
    }),
    getTransactionHistory: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/transaction/transactionReport?paginate=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["transactionHistory"],
    }),
    getTransactionQuery: builder.query({
      query: () => {
        return {
          url: `/admin/transaction/transaction_query_options`,
          method: "GET",
        };
      },
      providesTags: ["transactionQuery"],
    }),
    getAdvertisements: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/advertisement-list?paginate=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["advertisement"],
    }),
    updateAdvertisementStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/ads-approval/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["advertisement"],
    }),
    getPaymentGateway: builder.query({
      query: () => ({
        url: "/all-payment-methods",
        method: "GET",
      }),
      providesTags: ["paymentGateway"],
    }),
    addMobileBankingPaymentGateway: builder.mutation({
      query: (data) => ({
        url: "/admin/mobile-banking-information-manual-deposit/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updateMobileBankingPaymentGateway: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/mobile-banking-information-manual-deposit/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    deleteMobileBankingPaymentGateway: builder.mutation({
      query: (id) => ({
        url: `/admin/mobile-banking-information-manual-deposit/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["paymentGateway"],
    }),

    addBankTransferDetails: builder.mutation({
      query: (data) => ({
        url: "/admin/bank-information-manual-deposit/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updateBankTransferDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/bank-information-manual-deposit/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    deleteBankTransferDetails: builder.mutation({
      query: (id) => ({
        url: `/admin/bank-information-manual-deposit/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["paymentGateway"],
    }),

    addCryptoTransferDetails: builder.mutation({
      query: (data) => ({
        url: "/admin/crypto-transfer-information-manual-deposit/store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updateCryptoTransferDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/crypto-transfer-information-manual-deposit/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    deleteCryptoTransferDetails: builder.mutation({
      query: (id) => ({
        url: `/admin/crypto-transfer-information-manual-deposit/delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["paymentGateway"],
    }),

    addPaymentGateway: builder.mutation({
      query: (data) => ({
        url: "/admin/manual-payment-method-store",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updatePaymentGateway: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/manual-payment-method-update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    deletePaymentGateway: builder.mutation({
      query: (id) => ({
        url: `/admin/manual-payment-method-delete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    getMobileBankingDeposit: builder.query({
      query: ({ page, status, method_name }) => ({
        url: `/admin/mobile-banking-information-manual-deposit?type=deposit&page=${page}&status=${status}&method_name=${method_name}&paginate=${config.dataLimit}`,
        method: "GET",
      }),
      providesTags: ["mobile-banking-deposit"],
    }),
    getMobileBankingWithdraw: builder.query({
      query: ({ page, status, method_name }) => ({
        url: `/admin/mobile-banking-information-manual-deposit?type=withdraw&page=${page}&status=${status}&method_name=${method_name}&paginate=${config.dataLimit}`,
        method: "GET",
      }),
      providesTags: ["mobile-banking-withdraw"],
    }),
    getBankTransferDeposit: builder.query({
      query: ({ page, status, method_name }) => ({
        url: `/admin/bank-information-manual-deposit?type=deposit&page=${page}&status=${status}&method_name=${method_name}&paginate=${config.dataLimit}`,
        method: "GET",
      }),
      providesTags: ["bank-transfer-deposit"],
    }),
    getBankTransferWithdraw: builder.query({
      query: ({ page, status, method_name }) => ({
        url: `/admin/bank-information-manual-deposit?type=withdraw&page=${page}&status=${status}&method_name=${method_name}&paginate=${config.dataLimit}`,
        method: "GET",
      }),
      providesTags: ["bank-transfer-withdraw"],
    }),
    getCryptoTransferDeposit: builder.query({
      query: ({ page, status, method_name }) => ({
        url: `/admin/crypto-transfer-information-manual-deposit?type=deposit&page=${page}&status=${status}&method_name=${method_name}&paginate=${config.dataLimit}`,
        method: "GET",
      }),
      providesTags: ["crypto-transfer-deposit"],
    }),
    getCryptoTransferWithdraw: builder.query({
      query: ({ page, status, method_name }) => ({
        url: `/admin/crypto-transfer-information-manual-deposit?type=withdraw&page=${page}&status=${status}&method_name=${method_name}&paginate=${config.dataLimit}`,
        method: "GET",
      }),
      providesTags: ["crypto-transfer-withdraw"],
    }),
    getPendingDepositCount: builder.query({
      query: () => ({
        url: `/admin/deposit-withdraw-manual/pending-count?type=deposit`,
        method: "GET",
      }),
      providesTags: ["pending-deposit-count"],
    }),
    getPendingWithdrawCount: builder.query({
      query: () => ({
        url: `/admin/deposit-withdraw-manual/pending-count?type=withdraw`,
        method: "GET",
      }),
      providesTags: ["pending-withdraw-count"],
    }),
    getApayTransactions: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/apay-deposit-transactions/all?pagination=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["apay-deposit-transactions"],
    }),
    recheckApayTransactionStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/apay/deposit/update_transaction_status/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["apay-deposit-transactions"],
    }),
    getApayWithdrawTransactions: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/apay-withdraw-transactions/all?pagination=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["apay-withdraw-transactions"],
    }),
    recheckApayWithdrawTransactionStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/apay/withdraw/update_transaction_status/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["apay-withdraw-transactions"],
    }),
    getSingleDepositTransaction: builder.query({
      query: (id) => ({
        url: `/admin/apay/deposit/deposit_info/${id}`,
        method: "GET",
      }),
      providesTags: ["single-deposit-transaction"],
    }),
    getSingleWithdrawTransaction: builder.query({
      query: (id) => ({
        url: `/admin/apay/withdraw/withdraw_info/${id}`,
        method: "GET",
      }),
      providesTags: ["single-withdraw-transaction"],
    }),
    updateApayBankingStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/payment_systems/${id}/toggle-active`,
        method: "POST",
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updatePassimpayBankingStatus: builder.mutation({
      query: (id) => ({
        url: `/admin/payment_systems/passimpay/${id}/toggle-active`,
        method: "POST",
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updateApayGateway: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/payment_systems/${id}/modifyGateway`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    updatePassimPayGateWay: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/passimpay-payment-gateways/modify/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    getDepositHitories: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/transaction-history-deposit?per_page=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["deposit-history"],
    }),
    getWithdrawHitories: builder.query({
      query: (filter) => {
        const params = new URLSearchParams(filter || {}).toString();
        return {
          url: `/admin/transaction-history-withdraw?per_page=${config.dataLimit}&${params}`,
          method: "GET",
        };
      },
      providesTags: ["withdraw-history"],
    }),
    getTransactionQueries: builder.query({
      query: () => {
        return {
          url: "/admin/transaction-history-query-options",
          method: "GET",
        };
      },
      providesTags: ["transaction-history-query-options"],
    }),
    syncWithPassimpayGateway: builder.mutation({
      query: (data) => ({
        url: "/admin/passimpay-payment-gateways/sync-from-api",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
    syncWithApayGateway: builder.mutation({
      query: (data) => ({
        url: "/admin/payment_systems/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["paymentGateway"],
    }),
  }),
});

export const {
  useGetWithDrawRequestQuery,
  useUpdaeWithDrawRequestMutation,
  useGetDepositRequestQuery,
  useUpdaeDepositRequestMutation,
  useGetTransactionHistoryQuery,
  useGetAdvertisementsQuery,
  useUpdateAdvertisementStatusMutation,
  useGetPaymentGatewayQuery,
  useAddPaymentGatewayMutation,
  useUpdatePaymentGatewayMutation,
  useDeletePaymentGatewayMutation,
  useAddMobileBankingPaymentGatewayMutation,
  useUpdateMobileBankingPaymentGatewayMutation,
  useDeleteMobileBankingPaymentGatewayMutation,
  useAddBankTransferDetailsMutation,
  useUpdateBankTransferDetailsMutation,
  useDeleteBankTransferDetailsMutation,
  useAddCryptoTransferDetailsMutation,
  useUpdateCryptoTransferDetailsMutation,
  useDeleteCryptoTransferDetailsMutation,
  useGetCryptoTransferDepositQuery,
  useGetCryptoTransferWithdrawQuery,
  useGetMobileBankingDepositQuery,
  useGetMobileBankingWithdrawQuery,
  useGetBankTransferDepositQuery,
  useGetBankTransferWithdrawQuery,
  useGetPendingDepositCountQuery,
  useGetPendingWithdrawCountQuery,
  useGetApayTransactionsQuery,
  useRecheckApayTransactionStatusMutation,
  useGetSingleDepositTransactionQuery,
  useGetApayWithdrawTransactionsQuery,
  useRecheckApayWithdrawTransactionStatusMutation,
  useGetSingleWithdrawTransactionQuery,
  useGetTransactionQueryQuery,
  useUpdateApayBankingStatusMutation,
  useUpdateApayGatewayMutation,
  useUpdatePassimPayGateWayMutation,
  useUpdatePassimpayBankingStatusMutation,
  useGetDepositHitoriesQuery,
  useGetWithdrawHitoriesQuery,
  useGetTransactionQueriesQuery,
  useSyncWithPassimpayGatewayMutation,
  useSyncWithApayGatewayMutation,
} = financialsApiSlice;
