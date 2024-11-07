import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import filterReducer from "../features/filter/filterSlice";
import sortReducer from "../features/sort/sortSlice";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    filter: filterReducer,
    sort: sortReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
