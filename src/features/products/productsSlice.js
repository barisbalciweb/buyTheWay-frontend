import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allProducts: [],
  productsByCategory: [],
  selectedProduct: null,
  bestsellers: [],
  discounted: [],
  favorites: [],
  similar: [],
  recentlyViewed: [],
  statuses: {
    allProducts: "idle",
    productsByCategory: "idle",
    bestsellers: "idle",
    discounted: "idle",
    favorites: "idle",
    similar: "idle",
    recentlyViewed: "idle",
  },
  errors: {
    allProducts: null,
    productsByCategory: null,
    bestsellers: null,
    discounted: null,
    favorites: null,
    similar: null,
    recentlyViewed: null,
  },
};

// FETCH PRODUCTS BASED ON ENDPOINT DYNAMICALLY
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ endpoint, type }, { rejectWithValue }) => {
    try {
      const url = `http://localhost:3000/products/${endpoint}`;

      const { data } = await axios.get(url);
      return { data, type };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
