import { createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";

const api_url = apiUrlSwitch();

const initialState = {
  sortBy: "Meistverkauft",
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    changeSorting: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { changeSorting } = sortSlice.actions;
export default sortSlice.reducer;
