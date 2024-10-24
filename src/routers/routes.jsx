import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Store from "../pages/Store";
import WishList from "../pages/WishList";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/store", element: <Store /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <WishList /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/account", element: <Account /> },
];

export default routes;
