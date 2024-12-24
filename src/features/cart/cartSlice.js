import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrlSwitch } from "../../utils/apiUrlSwitch";
import axios from "axios";

const api_url = apiUrlSwitch();

const initialState = {
  isInitialSync: true,
  cartItems: [],
  cartItemsCount: 0,
  total: 0,
  cartItemsSync: {
    status: "idle",
    error: null,
  },
  cartItemsFromDB: {
    status: "idle",
    result: null,
    error: null,
  },
};

const calculate = (state) => {
  const cartItemsCount = state.cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const total = state.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { cartItemsCount, total };
};

// GET PRODUCTS FROM CART IN DB
export const getProductsFromCartInDB = createAsyncThunk(
  "cart/getProductsFromCartInDB",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${api_url}/cart`;
      const { data } = await axios.get(url, { withCredentials: true });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE CART IN DB
export const updateCartInDb = createAsyncThunk(
  "cart/updateCartInDb",
  async (cartItems, { rejectWithValue }) => {
    try {
      const url = `${api_url}/cart`;
      const { data } = await axios.post(url, cartItems, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, size } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ product, size, quantity: 1 });
      }

      // UPDATE CART ITEMS COUNT AND TOTAL
      const { cartItemsCount, total } = calculate(state);
      state.cartItemsCount = cartItemsCount;
      state.total = total;
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.product.id === id && item.size === size)
      );

      // UPDATE CART ITEMS COUNT AND TOTAL
      const { cartItemsCount, total } = calculate(state);
      state.cartItemsCount = cartItemsCount;
      state.total = total;
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartItemsCount = 0;
      state.total = 0;
    },
    incrementQuantity: (state, action) => {
      const { id, size } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.product.id === id && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }

      // UPDATE CART ITEMS COUNT AND TOTAL
      const { cartItemsCount, total } = calculate(state);
      state.cartItemsCount = cartItemsCount;
      state.total = total;
    },
    decrementQuantity: (state, action) => {
      const { id, size } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.product.id === id && item.size === size
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          return;
        }
      }

      // UPDATE CART ITEMS COUNT AND TOTAL
      const { cartItemsCount, total } = calculate(state);
      state.cartItemsCount = cartItemsCount;
      state.total = total;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    calculateTotals: (state) => {
      const { cartItemsCount, total } = calculate(state);
      state.cartItemsCount = cartItemsCount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET CART ITEMS FROM DB
      .addCase(getProductsFromCartInDB.pending, (state) => {
        state.cartItemsFromDB.status = "loading";
      })
      .addCase(getProductsFromCartInDB.fulfilled, (state, action) => {
        state.cartItemsFromDB.status = "succeeded";
        state.cartItemsFromDB.result = action.payload;

        // UPDATE CART ITEMS COUNT
        state.cartItemsCount = action.payload.reduce(
          (count, item) => count + item.quantity,
          0
        );
        // UPDATE TOTAL
        state.total = action.payload.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        // SET FALSE AFTER INITIAL SYNC TO AVOID UNNECESSARY USEEFFECT CALL IN CARTSYNC
        state.isInitialSync = false;
      })
      .addCase(getProductsFromCartInDB.rejected, (state, action) => {
        state.cartItemsFromDB.status = "failed";
        state.cartItemsFromDB.error = action.payload;
      })

      // SYNC CART ITEMS WITH DB
      .addCase(updateCartInDb.pending, (state) => {
        state.cartItemsSync.status = "loading";
      })
      .addCase(updateCartInDb.fulfilled, (state) => {
        state.cartItemsSync.status = "succeeded";
      })
      .addCase(updateCartInDb.rejected, (state, action) => {
        state.cartItemsSync.status = "failed";
        state.cartItemsSync.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  incrementQuantity,
  decrementQuantity,
  setCartItems,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
