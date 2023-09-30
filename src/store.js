import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./features/location/locationSlice";
import imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import citiesWeatherDataSlice from "./features/citiesWeatherData/citiesWeatherDataSlice";

export default configureStore({
  reducer: {
    location: locationReducer,
    citiesWeatherData: citiesWeatherDataSlice,
    imagesOfWeatherConditions: imagesOfWeatherConditionsSlice,
  },
});
