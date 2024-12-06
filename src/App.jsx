import { Route, Routes } from "react-router-dom";
import routes from "./routers/routes";
import Layout from "./layout/Layout";
import ScrollToTop from "./components/ScrollTop";
import { useSelector } from "react-redux";

const App = () => {
  const { warningScreen } = useSelector((state) => state.ui);
  const { isMobileMenuOpen, isSearchOpen } = useSelector((state) => state.ui);

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
