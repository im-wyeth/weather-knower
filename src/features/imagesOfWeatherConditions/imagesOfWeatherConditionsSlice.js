import { createSlice } from "@reduxjs/toolkit";

export const imagesOfWeatherConditionsSlice = createSlice({
  name: "imagesOfWeatherConditions",
  initialState: {
    codes: {},
  },
  reducers: {
    setCodes: (state, codes) => {
      state.codes = codes;
    },
  },
});

export const { setCodes } = imagesOfWeatherConditionsSlice.actions;

export default imagesOfWeatherConditionsSlice.reducer;
