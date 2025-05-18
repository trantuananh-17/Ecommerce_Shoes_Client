import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center gap-2 px-3 py-3 rounded  transition-colors ${
          isActive
            ? "bg-blue-500 text-white"
            : "hover:bg-blue-100 hover:text-blue-500"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export default NavItem;
