import { createSlice } from "@reduxjs/toolkit";

export const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    days: [],
  },
  reducers: {
    setDaysForecast: (state, daysForecast) => {
      state.days = daysForecast;
    },
  },
});

export const { setDaysForecast } = forecastSlice.actions;

export default forecastSlice.reducer;
