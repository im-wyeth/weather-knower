import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    settings: {
      language: localStorage.getItem("language") || "ru",
      theme: localStorage.getItem("theme") || "dark",
    },
  },
  reducers: {
    setLanguage: (state, language) => {
      state.list = language.payload;
    },
    setTheme: (state, theme) => {
      state.theme = theme.payload;
    },
  },
});

export const { setLanguage, setTheme } = appSlice.actions;

export default appSlice.reducer;
