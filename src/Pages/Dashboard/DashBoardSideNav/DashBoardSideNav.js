import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import useCheckUserType from "../../../hooks/useCheckUserType";

const DashBoardSideNav = () => {
  const { user } = useContext(AuthContext);
  const [userType, isUserLoading] = useCheckUserType(user?.email);

  return (
    <aside className="drawer-side">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <Link to="/dashboard">My Profile</Link>
        </li>
        {!isUserLoading && userType === "user" && (
          <li>
            <Link to="/dashboard/my-orders">My Orders</Link>
          </li>
        )}
        {!isUserLoading && userType === "seller" && (
          <Fragment>
            <li>
              <Link to="/dashboard/add-phone">Add a Phone</Link>
            </li>
            <li>
              <Link to="/dashboard/my-phones">My Phones</Link>
            </li>
            <li>
              <Link to="/dashboard/my-buyers">My Buyers</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </aside>
  );
};

export default DashBoardSideNav;
