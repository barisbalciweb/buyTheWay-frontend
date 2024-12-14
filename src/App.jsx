import { Route, Routes, useLocation } from "react-router-dom";
import routes from "./routers/routes";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollTop";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyCookie } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { warningScreen } = useSelector((state) => state.ui);
  const { isMobileMenuOpen, isSearchOpen } = useSelector((state) => state.ui);

  // VERIFY COOKIE ON LOAD
  useEffect(() => {
    dispatch(verifyCookie());
  }, [location]);

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
