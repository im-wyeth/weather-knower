import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/location/locationSlice";
import imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import citiesWeatherDataSlice from "./features/citiesWeatherData/citiesWeatherDataSlice";
import appSlice from "./features/app/appSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    location: locationReducer,
    citiesWeatherData: citiesWeatherDataSlice,
    imagesOfWeatherConditions: imagesOfWeatherConditionsSlice,
  },
});

function citiesWeatherDataSaver() {
  const citiesWeatherDataListNewValue = store.getState().citiesWeatherData.list;
  localStorage.setItem(
    "citiesWeatherData",
    JSON.stringify(citiesWeatherDataListNewValue)
  );

  const locationCoordinatesNewValue = store.getState().location.coordinates;
  localStorage.setItem(
    "coordinates",
    JSON.stringify(locationCoordinatesNewValue)
  );

  const locationNameNewValue = store.getState().location.name;
  localStorage.setItem("locationName", locationNameNewValue);

  const appSettingsLanguageNewValue = store.getState().app.settings.language;
  localStorage.setItem("language", appSettingsLanguageNewValue);

  const appSettingsThemeNewValue = store.getState().app.settings.theme;
  localStorage.setItem("theme", appSettingsThemeNewValue);

  const locationCoordinatesUpdatedTimeStampNewValue =
    store.getState().location.coordinatesUpdatedTimeStamp;
  localStorage.setItem(
    "coordinatesUpdatedTimeStamp",
    locationCoordinatesUpdatedTimeStampNewValue
  );
}

store.subscribe(citiesWeatherDataSaver);

export default store;
