import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../context/AuthProvider";

const NavBar = () => {
  const { user, logOutHandler } = useContext(AuthContext);

  const userLogoutHandler = () => {
    logOutHandler()
      .then(() => {
        localStorage.removeItem("accessToken");
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/blog">Blog</Link>
            </li>
            {user?.uid && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="text-primary normal-case text-xl font-semibold">
          MobileYard
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/blog">Blog</Link>
          </li>
          {user?.uid && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user?.uid ? (
          <button
            onClick={userLogoutHandler}
            className="btn btn-primary btn-outline mr-4"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary btn-outline">
            Get Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
