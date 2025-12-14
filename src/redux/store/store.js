import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, liveSupportApiSlice } from "../api/apiSlice";
import authReducer from "../slices/authSlice";
import layoutReducer from "../slices/layoutSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [liveSupportApiSlice.reducerPath]: liveSupportApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      liveSupportApiSlice.middleware
    ),
});
