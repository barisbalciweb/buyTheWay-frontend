import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const hamburgerSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    toggleHamburger: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleHamburger } = hamburgerSlice.actions;

export default hamburgerSlice.reducer;
