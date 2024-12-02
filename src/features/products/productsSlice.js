import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";

const api_url = apiUrlSwitch();

const initialState = {
  allProducts: [],
  productsByCategory: [],
  productsByTargetGroup: [],
  singleProduct: [null],
  bestsellers: [],
  discounted: [],
  favorites: [],
  similar: [],
  // recentlyViewed: [],
  statuses: {
    allProducts: "idle",
    productsByCategory: "idle",
    productsByTargetGroup: "idle",
    singleProduct: "idle",
    bestsellers: "idle",
    discounted: "idle",
    favorites: "idle",
    similar: "idle",
    // recentlyViewed: "idle",
  },
  errors: {
    allProducts: null,
    productsByCategory: null,
    productsByTargetGroup: null,
    singleProduct: null,
    bestsellers: null,
    discounted: null,
    favorites: null,
    similar: null,
    // recentlyViewed: null,
  },
};

// FETCH PRODUCTS BASED ON ENDPOINT DYNAMICALLY
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ endpoint, type }, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/${endpoint}`;

      const { data } = await axios.get(url);
      return { data, type };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const url = `${api_url}/products/singleProduct/${id}`;

      const { data } = await axios.get(url);

      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSimilar: (state, action) => {
      state.similar = [];
    },
  },
  // FETCH PRODUCTS
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

    // FETCH SINGLE PRODUCT
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.statuses.singleProduct = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.statuses.singleProduct = "succeded";
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.statuses.singleProduct = "failed";
      });
  },
});

export const { clearSimilar } = productsSlice.actions;
export default productsSlice.reducer;
