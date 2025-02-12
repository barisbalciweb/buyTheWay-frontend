import { Navigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

export const ProtectedRoute = ({ targetPath, children }) => {
  // GLOBAL STATES
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { login } = useSelector((state) => state.auth);

  if (login.status === "loading") {
    return <LoadingScreen />;
  }

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
