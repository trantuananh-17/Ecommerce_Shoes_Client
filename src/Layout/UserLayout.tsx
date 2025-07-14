import { Outlet } from "react-router-dom";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";
import Fab from "../components/shared/Fab";

const UserLayout = () => {
  return (
    <div className="select-none">
      <Header />
      <main className="flex-1  bg-white border-t-1 border-gray-300">
        <Outlet />
        <Fab />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
