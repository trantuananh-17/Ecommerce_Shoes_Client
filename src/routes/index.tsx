import { type RouteObject } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import Login from "../pages/admin/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import ChangePassword from "../pages/admin/ChangePassword";
import Product from "../pages/admin/Product";
import Brand from "../pages/admin/Brand";
import Discount from "../pages/admin/Discount";
import DiscountEvent from "../pages/admin/DiscountEvent";
import WordBanned from "../pages/admin/WordBanned";
import Order from "../pages/admin/Order";
import User from "../pages/admin/User";
import ProtectedRoute from "../components/shared/ProtectedRoute";

const AppRoutes: RouteObject[] = [
  { path: "/auth/login", element: <Login /> },

  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "product", element: <Product /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "brand", element: <Brand /> },
          { path: "discount", element: <Discount /> },
          { path: "event", element: <DiscountEvent /> },
          { path: "order", element: <Order /> },
          { path: "user", element: <User /> },
          { path: "word", element: <WordBanned /> },
        ],
      },
    ],
  },
];

export default AppRoutes;
