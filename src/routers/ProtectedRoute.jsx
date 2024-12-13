import { Navigate } from "react-router-dom";
// REDUX
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ redirectTo, children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
