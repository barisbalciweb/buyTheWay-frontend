import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  selectedProduct: null,
  bestsellers: [],
  discounted: [],
  favourites: [],
  similar: [],
  recentlyViewed: [],
  statuses: {
    allProducts: "idle",
    bestsellers: "idle",
    discounted: "idle",
    favourites: "idle",
    similar: "idle",
    recentlyViewed: "idle",
  },
  errors: {
    allProducts: null,
    bestsellers: null,
    discounted: null,
    favourites: null,
    similar: null,
    recentlyViewed: null,
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ endpoint, type }) => {
    const response = await axios.get(endpoint);
    return { data: response.data, type };
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const type = action.meta.arg.type;
        state.statuses[type] = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { type, data } = action.payload;
        state[type] = data;
        state.statuses[type] = "succeeded";
        state.errors[type] = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const type = action.meta.arg.type;
        state.statuses[type] = "failed";
        state.errors[type] = action.error.message;
      });
  },
});

export const { setProducts, setSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
