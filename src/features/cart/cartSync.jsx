import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getProductsFromCartInDB,
  setCartItems,
  updateCartInDb,
} from "./cartSlice";

const CartSync = () => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { userIdState } = useSelector((state) => state.account);
  const { isInitialSync, cartItems, cartItemsFromDB } = useSelector(
    (state) => state.cart
  );

  // 1- GET PRODUCTS FROM CART IN DB ONLY ON LOAD AND WHEN USER ID IS FETCHED
  useEffect(() => {
    if (userIdState.status === "succeeded") {
      dispatch(getProductsFromCartInDB());
    }
  }, [userIdState.status]);

  // 2- SET CARTITEMS STATE WHEN PRODUCTS ARE FETCHED FROM DB
  useEffect(() => {
    if (cartItemsFromDB.status === "succeeded") {
      dispatch(setCartItems(cartItemsFromDB.result));
    }
  }, [cartItemsFromDB]);

  // 3- UPDATE CART IN DB WHEN CARTITEMS STATE CHANGES
  useEffect(() => {
    if (isInitialSync === false) {
      dispatch(updateCartInDb(cartItems));
    }
  }, [cartItems]);

  return null;
};

export default CartSync;
