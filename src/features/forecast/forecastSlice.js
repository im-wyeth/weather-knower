import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Place from "../../models/Place";

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

    return wholeDecodedResult;
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    dataIsLoaded: false,
    places: localStorage.getItem("places")
      ? JSON.parse(localStorage.getItem("places"))
      : [],
  },
  reducers: {
    setPlaces: (state, places) => {
      state.places = places.payload;

      state.dataIsLoaded = true;

      localStorage.setItem("places", JSON.stringify(state.places));
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPlacesData.fulfilled, (state, action) => {
      for (const placeDataFromAPI of action.payload) {
        const placeData = new Place(
          placeDataFromAPI.location.country,
          placeDataFromAPI.location.name
        );

        placeData.setForecastOfDays(placeDataFromAPI.forecast.forecastday);

        state.places.push(placeData);
      }
    });
  },
});

export const { setPlaces } = forecastSlice.actions;

export default forecastSlice.reducer;

export const searchPlaceBuyName = (state, name) =>
  state.forecast.places.find((place) => place.name === name);
