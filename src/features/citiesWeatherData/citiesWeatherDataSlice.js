import { createSlice } from "@reduxjs/toolkit";

const citiesWeatherDataSlice = createSlice({
  name: "citiesWeatherData",
  initialState: {
    list: JSON.parse(localStorage.getItem("citiesWeatherData")),
  },
  reducers: {
    setCitiesWeatherDataList: (state, list) => {
      state.list = list.payload;
    },
  },
});

export const { setCitiesWeatherDataList } = citiesWeatherDataSlice.actions;

export default citiesWeatherDataSlice.reducer;
