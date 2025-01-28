import { Route, Routes } from "react-router-dom";
import routes from "./routers/routes";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollTop";
import CartSync from "./features/cart/cartSync";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserId } from "./features/account/accountSlice";
import {
  authenticateUser,
  resetAuthentication,
  resetLogin,
  resetRegistration,
} from "./features/auth/authSlice";
import { emptyCart, resetTotals } from "./features/cart/cartSlice";
import { emptyWishlist } from "./features/wishlist/wishlistSlice";

const App = () => {
  const dispatch = useDispatch();

  const { warningScreen } = useSelector((state) => state.ui);
  const { login, logout } = useSelector((state) => state.auth);
  const { isMobileMenuOpen, isSearchOpen, loginModal } = useSelector(
    (state) => state.ui
  );

  // AUTHENTICATE USER AND GET USER ID FROM COOKIES ON LOAD OR LOGIN
  useEffect(() => {
    dispatch(authenticateUser());
    dispatch(getUserId());
  }, [login.status]);

  // RESET STATES ON LOGOUT
  useEffect(() => {
    if (logout.status === "succeeded") {
      dispatch(resetAuthentication());
      dispatch(resetLogin());
      dispatch(resetRegistration());
      dispatch(emptyCart());
      dispatch(resetTotals());
      dispatch(emptyWishlist());
    }
  }, [logout.status]);

  return (
    <div
      id="container"
      className={`w-full h-full flex flex-col ${
        warningScreen || isMobileMenuOpen || isSearchOpen || loginModal
          ? "overflow-hidden"
          : ""
      }`}>
      <Layout>
        <ScrollToTop />
        <CartSync />
        {/* LAZY-LOADED ROUTES */}
        <Suspense fallback={<ClipLoader size={"20vw"} />}>
          <Routes>
            {routes.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Routes>
        </Suspense>
      </Layout>
    </div>
  );
};

export default App;
