import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation();

  const authenticated = !!localStorage.getItem("authToken");

  if (authenticated) {
    // If authenticated, render the children inside a React fragment
    return <>{children}</>;
  }

  // If not authenticated, redirect to signin and pass the original path
  return <Navigate to="/signin" replace state={{ referrer: pathname }} />;
}
