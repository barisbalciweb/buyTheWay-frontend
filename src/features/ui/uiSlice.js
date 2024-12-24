import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  warningScreen: false,
  innerWidth: window.innerWidth,
  isMobileMenuOpen: false,
  selectedPerson: "Damen",
  selectedCategoryGroup: null,
  isSearchOpen: false,
  isFilterOpen: false,
  isSortOpen: false,
  accountActiveComponent: null,
  checkoutActiveComponent: "adress",
  loginModal: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // DESKTOP VIEW SCREEN
    setWarningScreen: (state, action) => {
      state.warningScreen = action.payload;
    },
    setInnerWidth: (state, action) => {
      state.innerWidth = action.payload;
    },
    // MOBILE MENU
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
      if (state.isMobileMenuOpen) {
        state.isFilterOpen = false;
        state.isSortOpen = false;
      }
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setSelectedCategoryGroup: (state, action) => {
      state.selectedCategoryGroup = action.payload;
    },
    // FILTER
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
      if (state.isFilterOpen) {
        state.isSortOpen = false;
      }
    },
    // SORT
    toggleSort: (state) => {
      state.isSortOpen = !state.isSortOpen;
      if (state.isSortOpen) {
        state.isFilterOpen = false;
      }
    },
    // SEARCH
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    // ACCOUNT
    setAccountActiveComponent: (state, action) => {
      state.accountActiveComponent = action.payload;
    },
    // CHECKOUT
    setCheckoutActiveComponent: (state, action) => {
      state.checkoutActiveComponent = action.payload;
    },
    resetCheckoutActiveComponent: (state) => {
      state.checkoutActiveComponent = "adress";
    },
    toggleLoginModal: (state) => {
      state.loginModal = !state.loginModal;
    },
  },
});

export const {
  setWarningScreen,
  setInnerWidth,
  toggleMobileMenu,
  setSelectedPerson,
  setSelectedCategoryGroup,
  toggleFilter,
  toggleSort,
  toggleSearch,
  setAccountActiveComponent,
  setCheckoutActiveComponent,
  resetCheckoutActiveComponent,
  toggleLoginModal,
} = uiSlice.actions;
export default uiSlice.reducer;
