import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, type JSX } from "react";
import { getAuthState, setAuthLoaded } from "../../../stores/slices/authSlice";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, authLoaded } = useSelector(getAuthState);
  const dispatch = useDispatch();

  // ✅ Dự phòng: nếu load xong rồi nhưng authLoaded vẫn false → set lại
  useEffect(() => {
    if ((isAuthenticated || user) && !authLoaded) {
      dispatch(setAuthLoaded());
    }
  }, [isAuthenticated, user, authLoaded, dispatch]);
  if (!authLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-500 text-lg">
        Đang xác thực tài khoản...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/admin/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
