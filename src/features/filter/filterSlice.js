import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";

const api_url = apiUrlSwitch();

const initialState = {
  selectedFilters: {
    targetGroup: [],
    category: [],
    price: [],
    color: [],
    size: [],
    brand: [],
    //! THIS SHOULD BE categoryBOOLEAN, IN BE AS WELL (getFilteredCount)
    discount: "",
  },
  filterOptions: [],
  filteredCount: 0,
  filteredProducts: [],
  priceRange: [0, 1000],
  statuses: {
    filterOptions: "idle",
    filteredCount: "idle",
    filteredProducts: "idle",
  },
  errors: {
    filterOptions: null,
    filteredCount: null,
    filteredProducts: null,
  },
};

// FETCH ALL POSSIBLE FILTER OPTIONS
export const fetchFilters = createAsyncThunk(
  "products/fetchFilters",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/filters`;
      const { data } = await axios.get(url);
      return { data, type: "filterOptions" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// FETCH PRODUCT COUNT BASED ON SELECTED FILTERS
export const fetchFilteredCount = createAsyncThunk(
  "products/fetchFilteredCount",
  async (filters, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/filteredCount`;
      const { data } = await axios.post(url, filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// FETCH PRODUCTS BASED ON SELECTED FILTERS
export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (filters, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/filteredProducts`;
      const { data } = await axios.post(url, filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
      } else {
        state.selectedFilters[filterCategory] = filterOption;
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
      } else if (inputType === "range") {
        state.selectedFilters[filterCategory] = [];
        state.priceRange = [0, 1000];
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
      state.priceRange = [0, 1000];
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH FILTER OPTIONS
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

    // FETCH FILTERED COUNT
    builder
      .addCase(fetchFilteredCount.pending, (state) => {
        state.statuses.filteredCount = "loading";
      })
      .addCase(fetchFilteredCount.fulfilled, (state, action) => {
        state.filteredCount = action.payload.data;
        state.statuses.filteredCount = "succeeded";
      })
      .addCase(fetchFilteredCount.rejected, (state) => {
        state.statuses.filteredCount = "failed";
      });

    // FETCH FILTERED PRODUCTS
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.statuses.filteredProducts = "loading";
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
        state.statuses.filteredProducts = "succeeded";
      })
      .addCase(fetchFilteredProducts.rejected, (state) => {
        state.statuses.filteredProducts = "failed";
      });
  },
});

export const {
  addSelectedFilter,
  deleteSelectedFilter,
  clearFilters,
  setPriceRange,
} = filterSlice.actions;
export default filterSlice.reducer;
