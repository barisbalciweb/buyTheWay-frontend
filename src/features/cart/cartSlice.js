import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, size } = action.payload;

      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.item.id === item.id && cartItem.size === size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ item, size, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.item.id !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.item.id === id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.item.id === id
      );

      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },
    updateTotal: (state) => {
      state.total = state.cartItems.reduce(
        (total, curr) => total + curr.item.price * curr.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
