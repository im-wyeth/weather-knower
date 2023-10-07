import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    coordinates: JSON.parse(localStorage.getItem("coordinates")) || {
      longitude: null,
      latitude: null,
    },
    name: localStorage.getItem("locationName") || "Tokyo",
  },
  reducers: {
    setLocationData: (state, coordinates) => {
      state.coordinates.latitude = coordinates.payload.latitude;
      state.coordinates.longitude = coordinates.payload.longitude;
    },
    setName: (state, name) => {
      state.name = name.payload;
    },
  },
});

export const { setLocationData, setName } = locationSlice.actions;

export default locationSlice.reducer;
