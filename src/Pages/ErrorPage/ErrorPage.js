import React, { useContext } from "react";
import { Link, useNavigate, useRouteError } from "react-router-dom";
import { BiMessageError, BiError } from "react-icons/bi";
import bannerImg from "../../assets/images/error-page-banner.jpg";
import { AuthContext } from "../../context/AuthProvider";

const ErrorPage = () => {
  const error = useRouteError();
  const { logOutHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutHandler().then(() => {
      localStorage.removeItem("accessToken");
      navigate("/");
    });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">
            Something went wrong
            <BiError className="inline" />
          </h1>
          <p className="mb-5 text-2xl font-semibold">
            <BiMessageError className="inline mr-1" />
            {error?.message || error?.statusText} ({error?.status || 404})
          </p>
          <Link to="/">
            <button className="btn btn-primary btn-outline mr-4">
              Go to Home
            </button>
          </Link>
          <button onClick={handleLogout} className="btn btn-accent btn-outline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
