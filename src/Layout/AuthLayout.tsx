import { Outlet } from "react-router-dom";
import Header from "../components/user/Shared/Header";
import Footer from "../components/user/Shared/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1  bg-whiteborder-t-1 border-gray-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
