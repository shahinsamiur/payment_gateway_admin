import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  siteData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    setSiteData: (state, action) => {
      state.siteData = action.payload;
    },
  },
});

export const { setUser, setToken, setSiteData } = authSlice.actions;

export default authSlice.reducer;
