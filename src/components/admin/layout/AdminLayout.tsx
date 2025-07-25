import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="relative flex select-none h-screen">
      <div className="fixed top-0 left-0  bg-white ">
        <Navbar />
      </div>

      {/* Content Area */}
      <div className=" flex-1 bg-white flex flex-col ml-64 min-h-screen">
        <AdminHeader />
        <main className="flex-1 bg-gray-100 border-t-1 border-gray-100 overflow-y-auto">
          <div className="flex-1 min-h-full bg-white">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
