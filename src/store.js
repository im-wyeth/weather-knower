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

function selectCitiesWeatherDataList(state) {
  return state.citiesWeatherData.list;
}

function selectLocationCoordinates(state) {
  return state.location.coordinates;
}

function selectLocationName(state) {
  return state.location.name;
}

function selectAppSettingsLanguage(state) {
  return state.app.settings.language;
}

function selectAppSettingsTheme(state) {
  return state.app.settings.theme;
}

function citiesWeatherDataSaver() {
  const citiesWeatherDataListNewValue = selectCitiesWeatherDataList(
    store.getState()
  );
  localStorage.setItem(
    "citiesWeatherData",
    JSON.stringify(citiesWeatherDataListNewValue)
  );

  const locationCoordinatesNewValue = selectLocationCoordinates(
    store.getState()
  );
  localStorage.setItem(
    "coordinates",
    JSON.stringify(locationCoordinatesNewValue)
  );

  const locationNameNewValue = selectLocationName(store.getState());
  localStorage.setItem("locationName", locationNameNewValue);

  const appSettingsLanguageNewValue = selectAppSettingsLanguage(
    store.getState()
  );
  localStorage.setItem("language", appSettingsLanguageNewValue);

  const appSettingsThemeNewValue = selectAppSettingsTheme(store.getState());
  localStorage.setItem("theme", appSettingsThemeNewValue);
}

store.subscribe(citiesWeatherDataSaver);

export default store;
