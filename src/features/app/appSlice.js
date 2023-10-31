import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    route: {
      transitionIsEnd: false,
    },
    settings: {
      language: localStorage.getItem("language") || "ru",
    },
  },
  reducers: {
    setTransitionIsEnd: (state, transitionIsEnd) => {
      state.route.transitionIsEnd = transitionIsEnd.payload;
    },
    setLanguage: (state, language) => {
      state.settings.language = language.payload;
    },
  },
});

export const { setLanguage, setTransitionIsEnd, setDisplayLocation } =
  appSlice.actions;

export default appSlice.reducer;
