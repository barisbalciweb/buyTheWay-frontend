import { Route, Routes } from "react-router-dom";
import routes from "./routers/routes";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollTop";
import CartSync from "./features/cart/cartSync";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserId } from "./features/account/accountSlice";

const App = () => {
  const dispatch = useDispatch();

  const { warningScreen } = useSelector((state) => state.ui);
  const { login } = useSelector((state) => state.auth);
  const { isMobileMenuOpen, isSearchOpen } = useSelector((state) => state.ui);

  // GET USER ID FROM COOKIES ON LOAD OR LOGIN
  useEffect(() => {
    dispatch(getUserId());
  }, [login.status]);

  return (
    <div
      id="container"
      className={`w-full h-full flex flex-col ${
        warningScreen || isMobileMenuOpen || isSearchOpen
          ? "overflow-hidden"
          : ""
      }`}>
      <Layout>
        <ScrollToTop />
        <CartSync />
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
      </Layout>
    </div>
  );
};

export default App;
