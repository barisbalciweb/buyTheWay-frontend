import { useLocation } from "react-router-dom";
import ProceedOptionsModal from "./ProceedOptionsModal";
import LoginModal from "./LoginModal";
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";
import Warning from "../components/Warning";
import ScrollTopButton from "../components/ScrollTopButton";
import Search from "./Search";
import CustomerSupport from "../components/CustomerSupport/CustomerSupport";
import CustomerSupportModal from "../components/CustomerSupport/CustomerSupportModal";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  setInnerWidth,
  setWarningScreen,
  toggleLoginModal,
  toggleMobileMenu,
  toggleProceedOptionsModal,
  toggleSearch,
  toggleSupportWindow,
} from "../features/ui/uiSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // LOCAL STATES
  const [showScrollButton, setShowScrollButton] = useState(false);

  // GLOBAL STATES
  const {
    warningScreen,
    isSearchOpen,
    isMobileMenuOpen,
    loginModal,
    proceedOptionsModal,
    isSupportWindowOpen,
  } = useSelector((state) => state.ui);

  // SHOW WARNING SCREEN IF INNER WIDTH IS LESS THAN DEFINED
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

  useEffect(() => {
    let timeout;
    const findScrollY = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowScrollButton(window.scrollY > 100);
      }, 70);
    };
    window.addEventListener("scroll", findScrollY);
    return () => {
      window.removeEventListener("scroll", findScrollY);
    };
  }, []);

  // CLOSE ON ROUTE CHANGE
  useEffect(() => {
    if (isMobileMenuOpen) dispatch(toggleMobileMenu());
    if (isSearchOpen) dispatch(toggleSearch());
    if (loginModal) dispatch(toggleLoginModal());
    if (proceedOptionsModal) dispatch(toggleProceedOptionsModal());
    if (isSupportWindowOpen) dispatch(toggleSupportWindow());
  }, [location]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* SHOW LOGIN MODAL */}
      {loginModal && <LoginModal />}

      {/* SHOW PROCEED OPTIONS */}
      {proceedOptionsModal && <ProceedOptionsModal />}

      {/* SHOW WARNING SCREEN IN DESKTOP VIEW */}
      {warningScreen && <Warning />}

      <Header />

      {/* SHOW SEARCH SECTION */}
      {isSearchOpen && <Search />}

      {/* SHOW SCROLL BUTTON */}
      {showScrollButton && (
        <ScrollTopButton handleScrollToTop={handleScrollToTop} />
      )}

      {/* SHOW MOBILE MENU  */}
      {isMobileMenuOpen && <MobileMenu />}

      {/* SHOW MODAL FOR CUSTOMER SUPPORT WINDOW */}
      {isSupportWindowOpen && <CustomerSupportModal />}

      {<CustomerSupport />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
