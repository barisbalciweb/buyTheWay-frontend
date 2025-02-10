import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  setAccountActiveComponent,
  toggleMobileMenu,
  toggleSearch,
} from "../features/ui/uiSlice";

const Header = () => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { isMobileMenuOpen } = useSelector((state) => state.ui);
  const { cartItemsCount } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const iconsWithLinks = [
    {
      name: faUser,
      path: isAuthenticated ? "/account" : "/login",
    },
    { name: faHeart, path: "/wishlist" },
    { name: faBagShopping, path: "/cart" },
  ];

  const handleClick = () => {
    if (isMobileMenuOpen) {
      dispatch(toggleMobileMenu());
    }
  };

  return (
    <header
      className="w-full h-header bg-white flex items-center shadow-md fixed top-0 left-0 z-[4]"
      onClick={handleClick}>
      <nav className="w-full flex justify-between">
        <div className="flex justify-center items-center gap-[4vw] ml-[4vw]">
          <FontAwesomeIcon
            className="h-[7vw]"
            icon={faBars}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleMobileMenu());
            }}
          />
          <Link to={"/"} aria-label="Startseite">
            <h1 className="text-[6vw] mt-[1vw]">BuyTheWay</h1>
          </Link>
        </div>
        <ul className="flex gap-[5vw] p-[4vw]">
          {/* SEARCH ICON */}
          <li className="flex">
            <FontAwesomeIcon
              className="h-[6vw]"
              aria-label="Suche"
              icon={faMagnifyingGlass}
              onClick={() => dispatch(toggleSearch())}
            />
          </li>
          {/* ICONS WITH LINKS */}
          {iconsWithLinks.map(({ name, path }, index) => (
            <li key={index}>
              <Link
                to={path}
                aria-label={
                  path === "/account" || "/login"
                    ? "Benutzerkonto"
                    : path === "/wishlist"
                    ? "Wunschliste"
                    : path === "/cart"
                    ? "Warenkorb"
                    : ""
                }
                className="flex items-center justify-center relative"
                onClick={() =>
                  path === "/account" &&
                  dispatch(setAccountActiveComponent(null))
                }>
                <FontAwesomeIcon className="h-[6vw]" icon={name} />
                {/* COUNT OF ITEMS IN CART */}
                {path === "/cart" && cartItemsCount > 0 && (
                  <div className="w-[6vw] h-[6vw] flex justify-center items-center ml-[3vw] mt-[6.5vw] absolute bg-customOrange rounded-full">
                    <p className="text-white text-[3.5vw] font-bold mt-[0.5vw]">
                      {cartItemsCount}
                    </p>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
