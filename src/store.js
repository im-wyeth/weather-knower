import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/location/locationSlice";
import imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import appSlice from "./features/app/appSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    location: locationReducer,
    imagesOfWeatherConditions: imagesOfWeatherConditionsSlice,
  },
});

function weatherDataOfCitiesSaver() {
  const weatherDataOfCitiesListNewValue = store.getState().weatherdataOfCities;
  localStorage.setItem(
    "weatherDataOfCities",
    JSON.stringify(weatherDataOfCitiesListNewValue)
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

  const locationCoordinatesUpdatedTimeStampNewValue =
    store.getState().location.coordinatesUpdatedTimeStamp;
  localStorage.setItem(
    "coordinatesUpdatedTimeStamp",
    locationCoordinatesUpdatedTimeStampNewValue
  );
}

store.subscribe(weatherDataOfCitiesSaver);

export default store;
