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
import { toggleMobileMenu } from "../features/ui/uiSlice";

const iconsWithLinks = [
  { name: faUser, path: "/account" },
  { name: faHeart, path: "/wishlist" },
  { name: faBagShopping, path: "/cart" },
];

const Header = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state) => state.ui);

  return (
    <header
      className="w-full h-header bg-white flex items-center shadow-md fixed top-0 left-0 z-40"
      onClick={() => isMobileMenuOpen && dispatch(toggleMobileMenu())}>
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
        <ul className="flex gap-[5vw] p-[3vw]">
          <li className="flex">
            <FontAwesomeIcon className="h-[5vw]" icon={faMagnifyingGlass} />
          </li>
          {/* ICONS WITH LINKS */}
          {iconsWithLinks.map((icon, index) => (
            <li key={index}>
              <Link to={icon.path} className="flex">
                <FontAwesomeIcon className="h-[5vw]" icon={icon.name} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
