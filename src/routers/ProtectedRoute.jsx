import { Navigate } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ targetPath, children }) => {
  const { authentication } = useSelector((state) => state.auth);

  if (targetPath === "login" || targetPath === "register") {
    if (authentication.result) {
      return <Navigate to="/account" />;
    }
  }

  if (targetPath === "account") {
    if (!authentication.result) {
      return <Navigate to="/login" />;
    }
  }

  return children;
};
