import { Outlet } from "react-router-dom";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";

const StatusLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1  bg-gray-100 border-t-1 border-gray-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StatusLayout;
