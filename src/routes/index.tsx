import { type RouteObject } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import AuthLayout from "../Layout/AuthLayout";
import StatusLayout from "../Layout/StatusLayout";
import UserLayout from "../Layout/UserLayout";
import Login from "../pages/admin/auth/Login";
import Brand from "../pages/admin/brand/Brand";
import ChangePassword from "../pages/admin/changePassword/ChangePassword";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import Discount from "../pages/admin/discount/Discount";
import DiscountEvent from "../pages/admin/event/DiscountEvent";
import Order from "../pages/admin/order/Order";
import Product from "../pages/admin/product/Product";
import User from "../pages/admin/user/User";
import WordBanned from "../pages/admin/wordbanned/WordBanned";
import LoginPage from "../pages/user/auth/LoginPage";
import RegisterPage from "../pages/user/auth/RegisterPage";
import Cart from "../pages/user/Cart/Cart";
import NotFoundPage from "../pages/user/Error/NotFoundPage";
import LandingPage from "../pages/user/Landing/LandingPage";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import Products from "../pages/user/Products/Products";

const AppRoutes: RouteObject[] = [
  { path: "/auth/login", element: <Login /> },

  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
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

  {
    path: "",
    element: <UserLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "products", element: <Products /> },
      { path: "product/:slug", element: <ProductDetail /> },
      { path: "carts", element: <Cart /> },
    ],
  },

  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  {
    path: "error",
    element: <StatusLayout />,
    children: [{ path: "not-found", element: <NotFoundPage /> }],
  },
];

export default AppRoutes;
