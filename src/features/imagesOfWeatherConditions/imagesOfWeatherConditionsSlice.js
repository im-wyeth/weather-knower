import { createSlice } from "@reduxjs/toolkit";

import imagesOfWeatherConditionsJSON from "../../assets/json/imagesOfWeatherConditions.json";

export const imagesOfWeatherConditionsSlice = createSlice({
  name: "imagesOfWeatherConditions",
  initialState: {
    codes: imagesOfWeatherConditionsJSON,
  },
  reducers: {
    setCodes: (state, codes) => {
      state.codes = codes.payload;
    },
  },
});

export const { setCodes } = imagesOfWeatherConditionsSlice.actions;

export default imagesOfWeatherConditionsSlice.reducer;
