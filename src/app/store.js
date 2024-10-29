import { configureStore } from "@reduxjs/toolkit";
import hamburgerReducer from "../features/hamburger/hamburgerSlice";

export const store = configureStore({
  reducer: {
    hamburger: hamburgerReducer,
  },
});
