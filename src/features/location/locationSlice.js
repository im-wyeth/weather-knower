import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    coordinates: JSON.parse(localStorage.getItem("coordinates")) || {
      longitude: null,
      latitude: null,
    },
    geolocationIsOn:
      JSON.parse(localStorage.getItem("geolocationIsOn")) || false,
    lastCoordinatesUpdatedTimeStamp:
      localStorage.getItem("lastCoordinatesUpdatedTimeStamp") || 0,
    name: localStorage.getItem("locationName") || "London",
  },
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates.latitude = action.payload.latitude;
      state.coordinates.longitude = action.payload.longitude;

      state.lastCoordinatesUpdatedTimeStamp = Date.now();

      localStorage.setItem(
        "lastCoordinatesUpdatedTimeStamp",
        state.lastCoordinatesUpdatedTimeStamp
      );
      localStorage.setItem("coordinates", JSON.stringify(action.payload));
    },
    setGeolocationIsOn: (state, action) => {
      state.geolocationIsOn = action.payload;

      localStorage.setItem("geolocationIsOn", action.payload);
    },
    setName: (state, action) => {
      state.name = action.payload;

      localStorage.setItem("locationName", action.payload);
    },
  },
});

export const { setCoordinates, setGeolocationIsOn, setName } =
  locationSlice.actions;

export default locationSlice.reducer;
