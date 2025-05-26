import { Route } from "react-router-dom";
import AdminLayout from "../components/admin/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Brand from "../pages/admin/Brand";
import Discount from "../pages/admin/Discount";
import DiscountEvent from "../pages/admin/DiscountEvent";
import Order from "../pages/admin/Order";
import WordBanned from "../pages/admin/WordBanned";
import User from "../pages/admin/User";
import ChangePassword from "../pages/admin/ChangePassword";
import Product from "../pages/admin/Product";

const AdminRouter = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="change-password" element={<ChangePassword />} />
    <Route path="product" element={<Product />} />
    <Route path="brand" element={<Brand />} />
    <Route path="discount" element={<Discount />} />
    <Route path="event" element={<DiscountEvent />} />
    <Route path="order" element={<Order />} />
    <Route path="user" element={<User />} />
    <Route path="word" element={<WordBanned />} />
  </Route>
);

export default AdminRouter;
