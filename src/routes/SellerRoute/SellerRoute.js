import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { AuthContext } from "../../context/AuthProvider";
import useCheckUserType from "../../hooks/useCheckUserType";

const SellerRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);
  const [userType, isUserLoading] = useCheckUserType(user?.email);
  const navigate = useNavigate();

  if (isLoading || isUserLoading) {
    return <Loader className="min-h-screen" />;
  }

  if (userType !== "seller") {
    navigate("/login");
    return;
  }

  return children;
};

export default SellerRoute;
