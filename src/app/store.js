import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import filterReducer from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    filter: filterReducer,
  },
});
