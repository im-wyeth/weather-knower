import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/location/locationSlice";
import settingsReducer from "./features/settings/settinsSlice";
import forecastReducer from "./features/forecast/forecastSlice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    forecast: forecastReducer,
    location: locationReducer,
  },
});

export default store;
