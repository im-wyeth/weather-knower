import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: undefined,
    longitude: undefined,
    country: "Japan",
    name: "Tokyo",
  },
  reducers: {
    setLocationData: (state, latitude, longitude) => {
      state.latitude = latitude.payload;
      state.longitude = longitude.payload;
    },
    setName: (state, name) => {
      state.name = name.payload;
    },
    setCountry: (state, country) => {
      state.country = country.payload;
    },
  },
});

export const { setLocationData, setName, setContry } = locationSlice.actions;

export default locationSlice.reducer;
