import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getPlaceForecastModel from "../../models/getPlaceForecastModel";

function setPlaces(state, action) {
  state.places = action.payload;
  state.dataIsLoaded = true;

  localStorage.setItem("places", JSON.stringify(state.places));
}

export function searchPlaceBuyName(state, name) {
  return state.forecast.places.find((place) => place.name === name);
}

const LIST_OF_PLACE_NAMES = ["London", "Japan", "Paris"];
const WEATHERAPI_FULL_ADDRESS = "http://api.weatherapi.com/v1/forecast.json";
const WEATHERAPI_API_KEY = "104b303882e44cb497094324231009";

const apiAddress = new URL(WEATHERAPI_FULL_ADDRESS);
apiAddress.searchParams.set("key", WEATHERAPI_API_KEY);
apiAddress.searchParams.set("aqi", "no");

export const fetchPlacesData = createAsyncThunk(
  "forecast/fetchPlaceData",
  async () => {
    const wholeDecodedResult = [];

    for (const placeName of LIST_OF_PLACE_NAMES) {
      apiAddress.searchParams.set("q", placeName);

      const resultOfFetch = await fetch(apiAddress.toString());
      const decodedResult = await resultOfFetch.json();

      wholeDecodedResult.push(decodedResult);
    }

    const a = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    await a;

    return wholeDecodedResult;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    places: localStorage.getItem("places")
      ? JSON.parse(localStorage.getItem("places"))
      : [],
    dataIsLoaded: false,
  },
  reducers: {
    setPlaces,
    setDataIsLoaded: (state, action) => {
      state.dataIsLoaded = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPlacesData.fulfilled, (state, action) => {
      const places = {
        payload: [],
      };

      for (const placeDataFromAPI of action.payload) {
        places.payload.push(getPlaceForecastModel(placeDataFromAPI));
      }

      setPlaces(state, places);
    });
  },
});

export const { setDataIsLoaded } = forecastSlice.actions;

export default forecastSlice.reducer;
