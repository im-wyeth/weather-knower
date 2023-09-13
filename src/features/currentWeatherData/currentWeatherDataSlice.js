import { createSlice } from "@reduxjs/toolkit";

const currentWeatherDataSlice = createSlice({
  name: "currentWeatherData",
  initialState: {
    temperatureC: 0,
    condition: "Mostly Clear",
  },
  reducers: {
    setTemperatureC: (state, temperatureC) => {
      state.temperatureC = temperatureC;
    },
    setCondition: (state, condition) => {
      state.condition = condition;
    },
  },
});

export const { setTemperatureC, setCondition } =
  currentWeatherDataSlice.actions;

export default currentWeatherDataSlice.reducer;
