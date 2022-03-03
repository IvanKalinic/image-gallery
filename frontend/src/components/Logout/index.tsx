import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context";

const Logout = () => {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  return <Navigate to="/" />;
};

export default Logout;
