import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    coordinates: JSON.parse(localStorage.getItem("coordinates")) || {
      longitude: null,
      latitude: null,
    },
    coordinatesUpdatedTimeStamp:
      localStorage.getItem("coordinatesUpdatedTimeStamp") || Date.now(),
    name: localStorage.getItem("locationName") || "Tokyo",
  },
  reducers: {
    setCoordinates: (state, coordinates) => {
      state.coordinates.latitude = coordinates.payload.latitude;
      state.coordinates.longitude = coordinates.payload.longitude;

      state.coordinatesUpdatedTimeStamp = Date.now();

      localStorage.setItem("coordinates", JSON.stringify(coordinates.payload));
    },
    setName: (state, name) => {
      state.name = name.payload;

      localStorage.setItem("locationName", name.payload);
    },
  },
});

export const { setCoordinates, setName } = locationSlice.actions;

export default locationSlice.reducer;
