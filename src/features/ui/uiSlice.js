import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  isFilterOpen: false,
  isSortOpen: false,
  selectedPerson: "Damen",
  selectedCategoryGroup: null,
  warningScreen: false,
  innerWidth: window.innerWidth,
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
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setSelectedCategoryGroup: (state, action) => {
      state.selectedCategoryGroup = action.payload;
    },
    setWarningScreen: (state, action) => {
      state.warningScreen = action.payload;
    },
    setInnerWidth: (state, action) => {
      state.innerWidth = action.payload;
    },
  },
});

export const {
  toggleMobileMenu,
  toggleFilter,
  toggleSort,
  setSelectedPerson,
  setSelectedCategoryGroup,
  setWarningScreen,
  setInnerWidth,
} = uiSlice.actions;
export default uiSlice.reducer;
