import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortOption: "bestseller",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSorting: (state, action) => {
      state.sortOption = action.payload;
    },
  },
});

export const { changeSorting } = sortSlice.actions;
export default sortSlice.reducer;
