import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./features/location/locationSlice";
import currentWeatherDataReducer from "./features/currentWeatherData/currentWeatherDataSlice";
import forecastSlice from "./features/forecast/forecastSlice";
import imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";

export default configureStore({
  reducer: {
    location: locationReducer,
    currentWeatherData: currentWeatherDataReducer,
    forecast: forecastSlice,
    imagesOfWeatherConditions: imagesOfWeatherConditionsSlice,
  },
});
