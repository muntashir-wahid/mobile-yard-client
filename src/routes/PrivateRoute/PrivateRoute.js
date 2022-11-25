import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(isLoading);

  if (isLoading) {
    console.log("Going to dashboard");
    return <Loader className="min-h-screen" />;
  }

  if (!user) {
    return navigate("/login");
  }

  console.log("went to dashboard");
  return children;
};

export default PrivateRoute;
