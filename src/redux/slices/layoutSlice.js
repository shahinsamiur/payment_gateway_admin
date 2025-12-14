import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  themeMode: "light",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { toggleSidebar, toggleTheme, setTheme } = layoutSlice.actions;
export default layoutSlice.reducer;
