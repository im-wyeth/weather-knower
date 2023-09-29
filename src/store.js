import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./features/location/locationSlice";
import currentWeatherDataSlice from "./features/currentWeatherData/currentWeatherDataSlice";
import forecastSlice from "./features/forecast/forecastSlice";
import imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import citiesWeatherDataSlice from "./features/citiesWeatherData/citiesWeatherDataSlice";

export default configureStore({
  reducer: {
    location: locationReducer,
    citiesWeatherData: citiesWeatherDataSlice,
    currentWeatherData: currentWeatherDataSlice,
    forecast: forecastSlice,
    imagesOfWeatherConditions: imagesOfWeatherConditionsSlice,
  },
});
