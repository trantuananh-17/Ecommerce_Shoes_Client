import useAuth from "../../hooks/useAuth";

const User = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return <div>{user?.fullname ?? "Đang tải..."}</div>;
};

export default User;
