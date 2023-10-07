import { configureStore } from "@reduxjs/toolkit";

import locationReducer from "./features/location/locationSlice";
import imagesOfWeatherConditionsSlice from "./features/imagesOfWeatherConditions/imagesOfWeatherConditionsSlice";
import citiesWeatherDataSlice from "./features/citiesWeatherData/citiesWeatherDataSlice";

const store = configureStore({
  reducer: {
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
}

store.subscribe(citiesWeatherDataSaver);

export default store;
