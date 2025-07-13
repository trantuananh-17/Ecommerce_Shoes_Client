import { type RouteObject } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import Login from "../pages/admin/auth/Login";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import ChangePassword from "../pages/admin/changePassword/ChangePassword";
import Discount from "../pages/admin/discount/Discount";
import DiscountEvent from "../pages/admin/event/DiscountEvent";
import WordBanned from "../pages/admin/wordbanned/WordBanned";
import Order from "../pages/admin/order/Order";
import ProtectedRoute from "../components/shared/ProtectedRoute";
import ListProduct from "../pages/user/Products/Products";
import NotFoundPage from "../pages/user/Error/NotFoundPage";
import UserLayout from "../Layout/UserLayout";
import StatusLayout from "../Layout/StatusLayout";
import LoginPage from "../pages/user/auth/LoginPage";
import AuthLayout from "../Layout/AuthLayout";
import RegisterPage from "../pages/user/auth/RegisterPage";
import LandingPage from "../pages/user/Landing/LandingPage";
import Cart from "../pages/user/Cart/Cart";
import ProductDetail from "../pages/user/ProductDetail/ProductDetail";
import Product from "../pages/admin/product/Product";
import Brand from "../pages/admin/brand/Brand";
import User from "../pages/admin/user/User";

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
      { path: "products", element: <ListProduct /> },
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
