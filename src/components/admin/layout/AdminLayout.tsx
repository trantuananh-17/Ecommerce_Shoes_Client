import { Outlet } from "react-router-dom";
import AdminHeader from "../shared/AdminHeader";
import Navbar from "../shared/Navbar";

const AdminLayout = () => {
  return (
    <div className="flex select-none">
      <Navbar />
      <div className="relative flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1  bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
