import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isFilterOpen: false,
  isSortOpen: false,
  selectedPerson: "Damen",
  selectedCategoryGroup: null,
  warningScreen: false,
  innerWidth: window.innerWidth,
  accountActiveComponent: null,
  checkoutActiveComponent: "adress",
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
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
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
    setAccountActiveComponent: (state, action) => {
      state.accountActiveComponent = action.payload;
    },
    setCheckoutActiveComponent: (state, action) => {
      state.checkoutActiveComponent = action.payload;
    },
    resetCheckoutActiveComponent: (state) => {
      state.checkoutActiveComponent = "adress";
    },
  },
});

export const {
  toggleMobileMenu,
  toggleFilter,
  toggleSort,
  toggleSearch,
  setSelectedPerson,
  setSelectedCategoryGroup,
  setWarningScreen,
  setInnerWidth,
  setAccountActiveComponent,
  setCheckoutActiveComponent,
  resetCheckoutActiveComponent,
} = uiSlice.actions;
export default uiSlice.reducer;
