import Header from "./Header";
import Footer from "./Footer";
import Hamburger from "./Hamburger";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isHamburgerOpened = useSelector((state) => state.hamburger.value);

  return (
    <>
      <Header />
      {isHamburgerOpened && <Hamburger />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
