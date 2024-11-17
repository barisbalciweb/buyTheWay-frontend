import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//! TO ADD --> fetch all possible filter options from BE
// FETCH ALL POSSIBLE FILTER OPTIONS
export const fetchFilters = createAsyncThunk(
  "products/fetchFilters",
  async (_, { rejectWithValue }) => {
    try {
      const url = `http://localhost:3000/products/filters`;
      const { data } = await axios.get(url);
      return { data, type: "filterOptions" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//! TO ADD --> fetch results on click of submit button and get detailed results from BE
//! TO ADD --> fetch results on every change in filter state and show the count of results in Button in FE

const initialState = {
  selectedFilters: {
    sort: "",
    category: [],
    price: [],
    color: [],
    size: [],
    brand: [],
    discount: "",
  },
  filterOptions: [],
  statuses: {
    filterOptions: "idle",
  },
  errors: {
    filterOptions: null,
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
        sort: "",
        category: [],
        price: [],
        color: [],
        size: [],
        brand: [],
        discount: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.statuses.filterOptions = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filterOptions = action.payload.data;
        state.statuses.filterOptions = "succeeded";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.statuses.filterOptions = "failed";
      });
  },
});

export const { addSelectedFilter, deleteSelectedFilter, clearFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
