import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const authenticated = !!localStorage.getItem("authToken");
  return authenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
