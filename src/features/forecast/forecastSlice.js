import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getPlaceForecastModel from "../../models/getPlaceForecastModel";

const LIST_OF_PLACE_NAMES = ["London", "Japan", "Paris"];
const WEATHERAPI_FULL_ADDRESS = "http://api.weatherapi.com/v1/forecast.json";
const WEATHERAPI_API_KEY = "104b303882e44cb497094324231009";

function updatePlacesFromLocalStorage(state) {
  localStorage.setItem("places", JSON.stringify(state.places));
}

function setPlaces(state, action) {
  state.places = action.payload;
  state.dataIsLoaded = true;

  updatePlacesFromLocalStorage(state);
}

function addPlace(state, action) {
  state.places.push(action.payload);

  updatePlacesFromLocalStorage(state);
}

function replacePlace(state, action) {
  state.places[action.payload.index] = action.payload.place;

  updatePlacesFromLocalStorage(state);
}

export function searchPlaceBuyName(state, name) {
  return state.forecast.places.find((place) => place.name === name);
}

const apiAddress = new URL(WEATHERAPI_FULL_ADDRESS);
apiAddress.searchParams.set("key", WEATHERAPI_API_KEY);
apiAddress.searchParams.set("aqi", "no");

export const fetchPlacesData = createAsyncThunk(
  "forecast/fetchPlacesData",
  async () => {
    const wholeDecodedResult = [];

    for (const placeName of LIST_OF_PLACE_NAMES) {
      apiAddress.searchParams.set("q", placeName);

      const resultOfFetch = await fetch(apiAddress.toString());
      const decodedResult = await resultOfFetch.json();

      // const a = new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve();
      //   }, 100000000);
      // });

      // await a;

      wholeDecodedResult.push(decodedResult);
    }

    return wholeDecodedResult;
  }
);

export const fetchPlaceData = createAsyncThunk(
  "forecast/fetchPlaceData",
  async (placeDataInStringType) => {
    apiAddress.searchParams.set("q", placeDataInStringType);

    const resultOfFetch = await fetch(apiAddress.toString());
    const decodedResult = await resultOfFetch.json();

    return decodedResult;
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
      const actionForSetPlaces = {
        payload: [],
      };

      for (const placeDataFromAPI of action.payload) {
        actionForSetPlaces.payload.push(
          getPlaceForecastModel(placeDataFromAPI)
        );
      }

      setPlaces(state, actionForSetPlaces);
    });

    builder.addCase(fetchPlaceData.fulfilled, (state, action) => {
      const actionForAddPlace = {
        payload: getPlaceForecastModel(action.payload),
      };

      const samePlaceIndex = state.places.findIndex(
        (place) => place.name === actionForAddPlace.payload.name
      );

      if (samePlaceIndex >= 0) {
        const actionForReplacePlace = {
          payload: {
            place: actionForAddPlace.payload,
            index: samePlaceIndex,
          },
        };

        replacePlace(state, actionForReplacePlace);
      } else {
        addPlace(state, actionForAddPlace);
      }
    });
  },
});

export const { setDataIsLoaded } = forecastSlice.actions;

export default forecastSlice.reducer;
