import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./features/location/locationSlice";
import currentWeatherDataReducer from "./features/currentWeatherData/currentWeatherDataSlice";
import forecastSlice from "./features/forecast/forecast";

export default configureStore({
  reducer: {
    location: locationReducer,
    currentWeatherData: currentWeatherDataReducer,
    forecast: forecastSlice,
  },
});
