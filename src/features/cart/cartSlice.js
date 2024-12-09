import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartItemsCount: 0,
  total: 0,
};

// UPDATE CART ITEMS COUNT
const updateCartItemsCount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
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
      state.cartItemsCount = updateCartItemsCount(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.item.id !== action.payload
      );
      state.cartItemsCount = updateCartItemsCount(state.cartItems);
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.item.id === id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
      state.cartItemsCount = updateCartItemsCount(state.cartItems);
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.item.id === id
      );

      if (existingItem) {
        if (existingItem.quantity > 0) {
          existingItem.quantity -= 1;
        } else {
          return;
        }
      }
      state.cartItemsCount = updateCartItemsCount(state.cartItems);
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
