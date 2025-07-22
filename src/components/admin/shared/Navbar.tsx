import NavItem from "../ui/NavItem";
import logo from "../../../assets/admin/logo_dashboard.png";
import {
  LayoutDashboard,
  ShoppingCart,
  Tag,
  TicketPercent,
  SquarePercent,
  ClipboardList,
  Ban,
  BookUser,
} from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-60 min-h-screen p-4 border-r border-gray-200">
      <img src={logo} className="mb-4" />
      <span className="font-semibold px-3 py-2 block">Tổng quan</span>
      <NavItem to="/admin" label="Dashboard" icon={LayoutDashboard} />
      <span className="font-semibold px-3 py-2 block">Sản phẩm</span>
      <NavItem
        to="/admin/product"
        label="Quản lý sản phẩm"
        icon={ShoppingCart}
      />
      <NavItem to="/admin/brand" label="Quản lý thương hiệu" icon={Tag} />
      <NavItem
        to="/admin/discount"
        label="Quản lý khuyến mãi"
        icon={TicketPercent}
      />
      <NavItem to="/admin/event" label="Quản lý sự kiện" icon={SquarePercent} />
      <NavItem
        to="/admin/order"
        label="Quản lý đơn hàng"
        icon={ClipboardList}
      />
      <span className="font-semibold px-3 py-2 block">Người dùng </span>
      <NavItem to="/admin/user" label="Quản lý người dùng" icon={BookUser} />
      <NavItem to="/admin/word" label="Quản lý từ cấm" icon={Ban} />
    </div>
  );
};

export default Navbar;
