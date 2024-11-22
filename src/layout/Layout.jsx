import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import { useEffect } from "react";
import Warning from "../components/Warning";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setInnerWidth, setWarningScreen } from "../features/ui/uiSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const isMobileMenuOpen = useSelector((state) => state.ui.isMobileMenuOpen);
  const { warningScreen } = useSelector((state) => state.ui);

  useEffect(() => {
    const sizeCheck = () => {
      const innerWidth = window.innerWidth;

      dispatch(setWarningScreen(innerWidth > 520 ? true : false));
      dispatch(setInnerWidth(innerWidth));
    };
    window.addEventListener("resize", sizeCheck);
    sizeCheck();
    return () => window.removeEventListener("resize", sizeCheck);
  }, []);

  return (
    <>
      {warningScreen && <Warning />}
      <Header />
      {isMobileMenuOpen && <MobileMenu />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
