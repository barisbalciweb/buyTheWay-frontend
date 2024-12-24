import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const inWishlist = (state, product) => {
  return state.wishlist.wishlist.some((item) => item.id === product.id);
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload
      );
    },
    emptyWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, emptyWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
