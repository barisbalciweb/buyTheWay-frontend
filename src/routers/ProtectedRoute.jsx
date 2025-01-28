import { Navigate } from "react-router-dom";
// import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
// import { authenticateUser } from "../features/auth/authSlice";
import LoadingScreen from "../components/LoadingScreen";

export const ProtectedRoute = ({ targetPath, children }) => {
  // const dispatch = useDispatch();

  // GLOBAL STATES
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { login } = useSelector((state) => state.auth);

  // VERIFY COOKIE ON LOAD
  // useEffect(() => {
  //   dispatch(authenticateUser());
  // }, []);

  if (login.status === "loading") {
    return <LoadingScreen />;
  }
  console.log(isAuthenticated);

  if (targetPath === "login" || targetPath === "register") {
    // REDIRECT IF AUTHENTICATED
    if (isAuthenticated) {
      return <Navigate to="/account" replace={true} />;
    }
  }

  if (targetPath === "account") {
    // REDIRECT IF AUTHENTICATED
    if (!isAuthenticated) {
      return <Navigate to="/login" replace={true} />;
    }
  }

  return children;
};
