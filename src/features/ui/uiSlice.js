import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  isFilterOpen: false,
  isSortOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      if (state.isMobileMenuOpen) {
        state.isFilterOpen = false;
        state.isSortOpen = false;
      }
    },
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
      if (state.isFilterOpen) {
        state.isSortOpen = false;
      }
    },
    toggleSort: (state) => {
      state.isSortOpen = !state.isSortOpen;
      if (state.isSortOpen) {
        state.isFilterOpen = false;
      }
    },
  },
});

export const { toggleMobileMenu, toggleFilter, toggleSort } = uiSlice.actions;
export default uiSlice.reducer;
