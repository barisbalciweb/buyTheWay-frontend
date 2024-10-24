import { Link } from "react-router-dom";
import searchIcon from "../assets/icons/magnifying-glass-solid.svg";
import userIcon from "../assets/icons/user-regular.svg";
import wishlistIcon from "../assets/icons/heart-regular.svg";
import cartIcon from "../assets/icons/bag-shopping-solid.svg";
import menuIcon from "../assets/icons/bars-solid.svg";

const Header = () => {
  return (
    <header className="w-full h-[10vh] bg-white flex items-center shadow-md">
      <nav className="w-full flex justify-between">
        <div className="flex justify-center items-center gap-[4vw] ml-[4vw]">
          <img src={menuIcon} className="h-[7vw]" alt="menu-icon" />
          <h1 className="text-[6vw] mt-[1vw]">BuyTheWay</h1>
        </div>
        <ul className="flex items-center gap-[5vw] justify-end p-[3vw]">
          <li>
            <img className="h-[5vw]" src={searchIcon} alt="search-icon" />
          </li>
          <li>
            <Link to="/account">
              <img className="h-[5vw]" src={userIcon} alt="user-icon" />
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <img className="h-[5vw]" src={wishlistIcon} alt="wishlist-icon" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <img className="h-[5vw]" src={cartIcon} alt="cart-icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
