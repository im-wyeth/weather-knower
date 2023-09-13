import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    name: "",
  },
  reducers: {
    setName: (state, name) => {
      state.name = name;
    },
  },
});

export const { setName } = locationSlice.actions;

export default locationSlice.reducer;
