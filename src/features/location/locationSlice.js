import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    latitude: undefined,
    longitude: undefined,
    country: "Russia",
    name: "Moscow",
  },
  reducers: {
    setName: (state, name) => {
      state.name = name;
    },
  },
});

export const { setName } = locationSlice.actions;

export default locationSlice.reducer;
