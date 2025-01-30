import Home from "../pages/Home";
import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

// LAZY-LOADED PAGES
const Checkout = lazy(() => import("../components/Checkout"));
const Account = lazy(() => import("../pages/Account"));
const Cart = lazy(() => import("../pages/Cart"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Register = lazy(() => import("../pages/Register"));
const Store = lazy(() => import("../pages/Store"));
const Wishlist = lazy(() => import("../pages/Wishlist"));

const routes = [
  // NO LAZY LOADING FOR HOME PAGE
  { path: "/", element: <Home />, lazy: false },
  { path: "/store/product/:productId", element: <ProductDetail />, lazy: true },
  { path: "/store", element: <Store />, lazy: true },
  { path: "/cart", element: <Cart />, lazy: true },
  { path: "/checkout", element: <Checkout />, lazy: true },
  { path: "/wishlist", element: <Wishlist />, lazy: true },
  {
    path: "/login",
    element: (
      <ProtectedRoute targetPath="login">
        <Login />
      </ProtectedRoute>
    ),
    lazy: true,
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute targetPath="register">
        <Register />
      </ProtectedRoute>
    ),
    lazy: true,
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute targetPath="account">
        <Account />
      </ProtectedRoute>
    ),
    lazy: true,
  },
  {
    path: "/*",
    element: <NotFound />,
    lazy: true,
  },
];

export default routes;
