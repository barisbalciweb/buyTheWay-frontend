import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFilters: {
    Sortierung: "",
    Kategorie: [],
    Preis: [],
    Farbe: [],
    Größe: [],
    Marke: [],
    Sale: "",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSelectedFilter: (state, action) => {
      const { filterGroup, option, inputType } = action.payload;

      if (inputType === "radio") {
        state.selectedFilters[filterGroup] = option;
      } else if (inputType === "checkbox") {
        const currentSelections = state.selectedFilters[filterGroup] || [];
        const isOptionSelected = currentSelections.includes(option);

        state.selectedFilters[filterGroup] = isOptionSelected
          ? currentSelections.filter((item) => item !== option)
          : [...currentSelections, option];
      }
    },
    deleteSelectedFilter: (state, action) => {
      // Object.keys(state.selectedFilters).forEach((filterGroup) => {
      //   if (typeof state.selectedFilters[filterGroup] === "string") {
      //     state.selectedFilters[filterGroup] = "";
      //   } else if (Array.isArray(state.selectedFilters[filterGroup])) {
      //     state.selectedFilters[filterGroup] = state.selectedFilters[
      //       filterGroup
      //     ].filter((filter) => filter !== action.payload);
      //   }
      // });
    },

    clearFilters: (state) => {
      state.selectedFilters = {
        Sortierung: "",
        Kategorie: [],
        Preis: [],
        Farbe: [],
        Größe: [],
        Marke: [],
        Sale: "",
      };
    },
  },
});

export const { addSelectedFilter, deleteSelectedFilter, clearFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
