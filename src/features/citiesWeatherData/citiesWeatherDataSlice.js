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
  },
});

export const { setCitiesWeatherDataList } = citiesWeatherDataSlice.actions;

export default citiesWeatherDataSlice.reducer;
