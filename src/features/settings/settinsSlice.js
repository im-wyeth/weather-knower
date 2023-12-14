import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    language: localStorage.getItem("language") || "en",
  },
  reducers: {
    setLanguage: (state, language) => {
      state.language = language.payload;

      localStorage.setItem("language", language.payload);
    },
  },
});

export const { setLanguage } = settingsSlice.actions;

export default settingsSlice.reducer;
