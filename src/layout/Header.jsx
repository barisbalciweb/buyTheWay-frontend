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
import { toggleMobileMenu, toggleSearch } from "../features/ui/uiSlice";

const iconsWithLinks = [
  { name: faUser, path: "/account" },
  { name: faHeart, path: "/wishlist" },
  { name: faBagShopping, path: "/cart" },
];

const Header = () => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { isMobileMenuOpen } = useSelector((state) => state.ui);
  const { cartItems } = useSelector((state) => state.cart);

  const handleClick = () => {
    if (isMobileMenuOpen) {
      dispatch(toggleMobileMenu());
    }
  };

  return (
    <header
      className="w-full h-header bg-white flex items-center shadow-md fixed top-0 left-0 z-40"
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
          <Link to={"/"}>
            <h1 className="text-[6vw] mt-[1vw]">BuyTheWay</h1>
          </Link>
        </div>
        <ul className="flex gap-[5vw] p-[4vw]">
          {/* SEARCH ICON */}
          <li className="flex">
            <FontAwesomeIcon
              className="h-[6vw]"
              icon={faMagnifyingGlass}
              onClick={() => dispatch(toggleSearch())}
            />
          </li>
          {/* ICONS WITH LINKS */}
          {iconsWithLinks.map((icon, index) => (
            <li key={index}>
              <Link
                to={icon.path}
                className="flex items-center justify-center relative">
                <FontAwesomeIcon className="h-[6vw]" icon={icon.name} />
                {/* COUNT OF ITEMS IN CART */}
                {icon.path === "/cart" && cartItems.length > 0 && (
                  <div className="w-[6vw] h-[6vw] flex justify-center items-center ml-[3vw] mt-[6.5vw] absolute bg-customOrange rounded-full">
                    <p className="text-white text-[3.5vw] font-bold mt-[0.5vw]">
                      {cartItems.length}
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
