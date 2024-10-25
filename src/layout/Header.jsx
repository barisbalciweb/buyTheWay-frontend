import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  return (
    <header className="w-full h-[20vw] bg-white flex items-center shadow-md">
      <nav className="w-full flex justify-between">
        <div className="flex justify-center items-center gap-[4vw] ml-[4vw]">
          <FontAwesomeIcon className="h-[7vw]" icon={faBars} />
          <h1 className="text-[6vw] mt-[1vw]">BuyTheWay</h1>
        </div>
        <ul className="flex items-center gap-[5vw] justify-end p-[3vw]">
          <li>
            <FontAwesomeIcon className="h-[5vw]" icon={faMagnifyingGlass} />
          </li>
          <li>
            <Link to="/account">
              <FontAwesomeIcon className="h-[5vw]" icon={faUser} />
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <FontAwesomeIcon className="h-[5vw]" icon={faHeart} />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FontAwesomeIcon className="h-[5vw]" icon={faBagShopping} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
