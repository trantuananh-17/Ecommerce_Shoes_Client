import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthState } from "../../stores/slices/authSlice";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({
  allowedRoles,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated, user, authLoaded } = useSelector(getAuthState);

  if (!authLoaded) return null;

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
