import { Navigate } from "react-router-dom";
import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../features/auth/authSlice";

export const ProtectedRoute = ({ targetPath, children }) => {
  const dispatch = useDispatch();

  // GLOBAL STATES
  const { authentication } = useSelector((state) => state.auth);

  // VERIFY COOKIE ON LOAD
  useEffect(() => {
    dispatch(authenticateUser());
  }, []);

  if (targetPath === "login" || targetPath === "register") {
    // REDIRECT IF COOKIES ARE VALID
    if (authentication.status === "succeeded") {
      return <Navigate to="/account" />;
    }
  }

  if (targetPath === "account") {
    // REDIRECT IF COOKIES ARE VALID
    if (authentication.status !== "succeeded") {
      return <Navigate to="/login" />;
    }
  }

  return children;
};
