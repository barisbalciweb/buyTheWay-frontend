import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// REDUX
import { useDispatch } from "react-redux";
import { toggleMobileMenu } from "../features/UI/UISlice";

const iconsWithLinks = [
  { name: faUser, path: "/account" },
  { name: faHeart, path: "/wishlist" },
  { name: faBagShopping, path: "/cart" },
];

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="w-full h-[17vw] bg-white flex items-center shadow-md relative z-10">
      <nav className="w-full flex justify-between">
        <div className="flex justify-center items-center gap-[4vw] ml-[4vw]">
          <FontAwesomeIcon
            className="h-[7vw]"
            icon={faBars}
            onClick={() => dispatch(toggleMobileMenu())}
          />
          <h1 className="text-[6vw] mt-[1vw]">BuyTheWay</h1>
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
