import { createSelector } from "@reduxjs/toolkit";

export const selectRenderedProducts = createSelector(
  [(state) => state.products, (state) => state.filter, (_, params) => params],

  (productsState, filterState, params) => {
    const { collection, filtering, targetGroup, category } = params;

    // SELECT PRODUCTS BY COLLECTION
    if (collection) {
      return productsState[collection] || [];
    }

    if (targetGroup && !category) {
      // SELECT PRODUCTS BY TARGET GROUP
      return productsState.productsByTargetGroup || [];
    }

    if ((targetGroup && category) || category) {
      // SELECT PRODUCTS BY CATEGORY
      return productsState.productsByCategory || [];
    }

    // SELECT FILTERED PRODUCTS
    if (filtering) {
      return filterState.filteredProducts || [];
    }

    return null;
  }
);
