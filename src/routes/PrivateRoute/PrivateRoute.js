import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader className="min-h-screen" />;
  }

  if (!user) {
    return navigate("/login");
  }

  return children;
};

export default PrivateRoute;
