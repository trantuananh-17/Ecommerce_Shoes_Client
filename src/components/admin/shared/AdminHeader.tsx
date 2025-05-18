import { useEffect, useRef, useState } from "react";
import userImage from "../../../assets/admin/user-1.jpg";
import { User } from "lucide-react";
import NavItem from "../ui/NavItem";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className=" container flex justify-between p-4">
      <div></div>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleOpenDropdown}
          className="group h-8 w-8 overflow-hidden rounded-full transition-all duration-200 ease-in-out hover:scale-110 mr-8"
        >
          <img
            className="object-cover cursor-pointer h-8 w-8"
            src={userImage}
            alt="User"
          />
        </button>

        <div
          className={`absolute right-6 top-10 w-44 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 space-y-3 transition-all duration-200 ease-in-out ${
            isOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 cursor-pointer">
            <NavItem
              to="/admin/change-password"
              label="Đổi mật khẩu"
              icon={User}
            />
          </div>

          <button className="w-full border border-blue-400 text-blue-500 rounded-md py-2 hover:bg-blue-50 transition">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
