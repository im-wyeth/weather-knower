import { createSlice } from "@reduxjs/toolkit";

const citiesWeatherDataSlice = createSlice({
  name: "citiesWeatherData",
  initialState: {
    list: [],
  },
  reducers: {
    setCitiesWeatherDataList: (state, list) => {
      state.list = list;
    },
    addCityWeatherData: (state, cityWeatherData) => {
      state.list.push(cityWeatherData);
    },
  },
});

export const { setCitiesWeatherDataList, addCityWeatherData } =
  citiesWeatherDataSlice.actions;

export default citiesWeatherDataSlice.reducer;
