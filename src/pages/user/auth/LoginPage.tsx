import React, { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import EmailInput from "../../../components/user/Auth/EmailInput";
import PasswordInput from "../../../components/user/Auth/PasswordInput";
import ToastError from "../../../components/shared/ToastError";
import Loading from "../../../components/user/Shared/ui/Loading";

const LoginPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { login, authState } = useAuth();
  const navigate = useNavigate();
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleChange = (name: string) => {
    return (value: string) => {
      setUserInfo((prev) => {
        const newValue = { ...prev, [name]: value };
        return newValue;
      });
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await login(userInfo);

    if (!response) {
      setLoading(false);
      setToastMessage("Đăng nhập thất bại hoặc không có quyền truy cập.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
    setLoading(false);
  };

  const { email, password } = userInfo;

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/");
    }
  }, [authState, navigate]);

  return (
    <section className="bg-white  flex items-center justify-center">
      <div className="w-full max-w-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Account</h2>

        <h2 className="font-semibold text-2xl mb-4">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <EmailInput value={email} onChange={handleChange("email")} />
          <PasswordInput value={password} onChange={handleChange("password")} />
          <a href="#none" className="text-xs block text-right hover:underline">
            Forgot password?
          </a>

          <button
            type="submit"
            className="w-full uppercase h-[50px] flex justify-center items-center bg-black text-white font-semibold text-sm rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
          >
            {isLoading ? <Loading /> : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">HOẶC</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

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

        <p className="text-sm text-center">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-red-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
      {toastError && <ToastError message={toastMessage} />}
    </section>
  );
};

export default LoginPage;
