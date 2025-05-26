import { useEffect, useState } from "react";
import FormInput from "../../../components/admin/ui/FormInput";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ToastError from "../../../components/shared/ToastError";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { login, authState } = useAuth();
  const navigate = useNavigate();
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

    const response = await login(userInfo);

    if (!response || response.role !== "admin") {
      setToastMessage("Đăng nhập thất bại hoặc không có quyền truy cập.");
      setToastError(true);
      setTimeout(() => setToastError(false), 3000);
    }
  };

  const { email, password } = userInfo;

  useEffect(() => {
    if (authState.isAuthenticated && authState.user?.role === "admin") {
      navigate("/admin");
    }
  }, [authState, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          onChange={handleChange("email")}
          value={email}
        />
        <FormInput
          label="Password"
          onChange={handleChange("password")}
          value={password}
        />

        <button name="Login" type="submit">
          Login
        </button>
      </form>
      {toastError && <ToastError message={toastMessage} />}
    </>
  );
};

export default Login;
