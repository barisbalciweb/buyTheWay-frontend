import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

// LAZY-LOADED PAGES
const Checkout = lazy(() => import("../components/Checkout"));
const Account = lazy(() => import("../pages/Account"));
const Cart = lazy(() => import("../pages/Cart"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Register = lazy(() => import("../pages/Register"));
const Store = lazy(() => import("../pages/Store"));
const Wishlist = lazy(() => import("../pages/Wishlist"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/store/product/:productId", element: <ProductDetail /> },
  { path: "/store", element: <Store /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/wishlist", element: <Wishlist /> },
  {
    path: "/login",
    element: (
      <ProtectedRoute targetPath="login">
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute targetPath="register">
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute targetPath="account">
        <Account />
      </ProtectedRoute>
    ),
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

export default routes;
