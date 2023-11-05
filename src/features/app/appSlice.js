import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    settings: {
      language: localStorage.getItem("language") || "ru",
    },
    weather: {
      dataOfCities: localStorage.getItem("weatherDataOfCities")
        ? JSON.parse(localStorage.getItem("weatherDataOfCities"))
        : [],
    },
  },
  reducers: {
    setLanguage: (state, language) => {
      state.settings.language = language.payload;
    },
    setWeatherDataOfCities: (state, list) => {
      state.list = list.payload;

      state.weather.updatedTime = Date.now();
    },
  },
});

export const { setLanguage, setWeatherDataOfCities } = appSlice.actions;

export default appSlice.reducer;
