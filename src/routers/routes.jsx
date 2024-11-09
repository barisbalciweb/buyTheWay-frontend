import Checkout from "../components/Checkout";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import Store from "../pages/Store";
import Wishlist from "../pages/Wishlist";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/store", element: <Store /> },
  { path: "/store/:productId", element: <ProductDetail /> },
  { path: "/cart", element: <Cart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/account", element: <Account /> },
];

export default routes;
