import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      console.log(action.payload);

      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      console.log(action.payload);
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const inWishlist = (state, product) => {
  return state.wishlist.wishlist.some((item) => item.id === product.id);
};

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
