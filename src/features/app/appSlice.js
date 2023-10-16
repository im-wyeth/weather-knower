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
      state.settings.language = language.payload;
    },
    setTheme: (state, theme) => {
      state.settings.theme = theme.payload;
    },
  },
});

export const { setLanguage, setTheme } = appSlice.actions;

export default appSlice.reducer;
