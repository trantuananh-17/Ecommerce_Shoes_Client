import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <section className="bg-white  flex items-center justify-center">
      <div className="w-full max-w-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Account</h2>

        <h2 className="font-semibold text-2xl mb-4">Sign in</h2>

        <form action="" className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              className="w-full h-[50px] border border-gray-300 p-4 rounded-lg text-sm"
              placeholder="Email*"
            />
            <span className="text-xs text-red-600 mt-1 block">
              Email or password invalid
            </span>
          </div>

          <div>
            <input
              id="password"
              type="password"
              className="w-full h-[50px] border border-gray-300 p-4 rounded-lg text-sm"
              placeholder="Password*"
            />
            <span className="text-xs text-red-600 mt-1 block">
              Email or password invalid
            </span>
          </div>

          <a href="#none" className="text-xs block text-right hover:underline">
            Forgot password?
          </a>

          <button
            type="submit"
            className="w-full uppercase h-[50px] bg-black text-white font-semibold text-sm rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
          >
            Login
          </button>
        </form>

        {/* Hoặc */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">HOẶC</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Đăng nhập bằng mạng xã hội */}
        <div className="flex gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 flex-1 border border-gray-300 p-2 rounded-md hover:bg-gray-50">
            <FaFacebook className="text-blue-600" />
            Facebook
          </button>
          <button className="flex items-center justify-center gap-2 flex-1 border border-gray-300 p-2 rounded-md hover:bg-gray-50">
            <FcGoogle />
            Google
          </button>
        </div>

        {/* Đăng ký */}
        <p className="text-sm text-center">
          Bạn mới biết đến Shopee?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
