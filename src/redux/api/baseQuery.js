import { config } from "@/config/config";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const formdataUrl = [
  /^\/admin\/general\/update$/,
  /^\/admin\/blogs$/,
  /^\/admin\/blogs\/update\/?.*$/,
  /^\/files\/upload$/,
  /^\/admin\/payment_systems\/[^/]+\/modifyGateway$/,
  /^\/admin\/passimpay-payment-gateways\/modify\/[^/]+/,
];

const baseQuery = fetchBaseQuery({
  baseUrl: config.apiBaseUrl,
  prepareHeaders: (headers, { getState, arg }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    const url = arg?.url;
    if (!formdataUrl.some((regex) => regex.test(url))) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const baseQueryLiveSupport = fetchBaseQuery({
  baseUrl: config.liveSupportApiBaseUrl,
  prepareHeaders: (headers, { getState, arg }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    const url = arg?.url;
    if (!formdataUrl.some((regex) => regex.test(url))) {
      headers.set("Content-Type", "application/json");
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export default baseQuery;
