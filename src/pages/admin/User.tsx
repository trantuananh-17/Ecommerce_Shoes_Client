import useAuth from "../../hooks/useAuth";

const User = () => {
  const { authState } = useAuth();
  const { user } = authState;
  return <div>{user?.fullname}</div>;
};

export default User;
