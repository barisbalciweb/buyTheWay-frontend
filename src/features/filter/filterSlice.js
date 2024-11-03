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
      const { filterCategory, filterOption, inputType } = action.payload;

      if (inputType === "radio") {
        state.selectedFilters[filterCategory] = filterOption;
      } else if (inputType === "checkbox") {
        const existingOptions = state.selectedFilters[filterCategory] || [];
        const optionIndex = existingOptions.indexOf(filterOption);

        optionIndex === -1
          ? existingOptions.push(filterOption)
          : existingOptions.splice(optionIndex, 1);

        state.selectedFilters[filterCategory] = existingOptions;
      }
    },
    deleteSelectedFilter: (state, action) => {
      const { filterCategory, filterOption, inputType } = action.payload;

      if (inputType === "radio") {
        state.selectedFilters[filterCategory] = "";
      } else if (inputType === "checkbox") {
        state.selectedFilters[filterCategory] = state.selectedFilters[
          filterCategory
        ].filter((selectedOption) => selectedOption !== filterOption);
      }
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
