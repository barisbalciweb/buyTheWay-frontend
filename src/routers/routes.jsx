import Checkout from "../components/Checkout";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import Store from "../pages/Store";
import Wishlist from "../pages/Wishlist";
import { ProtectedRoute } from "./ProtectedRoute";

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
];

export default routes;
