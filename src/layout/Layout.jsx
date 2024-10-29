import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
// REDUX
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);

  return (
    <>
      <Header />
      {isMobileMenuOpen && <MobileMenu />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
