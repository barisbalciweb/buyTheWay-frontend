import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";

const initialState = {
  isCompleted: {
    adress: false,
    payment: false,
  },
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setIsCompleted: (state, action) => {
      const { component, value } = action.payload;
      state.isCompleted = set(state.isCompleted, component, value);
    },
  },
});

export const { setIsCompleted } = checkoutSlice.actions;
export default checkoutSlice.reducer;
