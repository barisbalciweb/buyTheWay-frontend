import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import filterReducer from "../features/filter/filterSlice";
import sortReducer from "../features/sort/sortSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    filter: filterReducer,
    sort: sortReducer,
  },
});
