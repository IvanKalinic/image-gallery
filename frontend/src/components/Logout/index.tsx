import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context";

const Logout = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    setUser({ email: "", password: "" });
  }, [setUser]);

  console.log(user);
  return <Navigate to="/" />;
};

export default Logout;
