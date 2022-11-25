import React from "react";
import { Outlet } from "react-router-dom";
import DashBoardSideNav from "../Pages/Dashboard/DashBoardSideNav/DashBoardSideNav";
import DashBoardTopNav from "../Pages/Dashboard/DashBoardTopNav/DashBoardTopNav";
import Footer from "../Pages/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <main>
      <DashBoardTopNav />
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet />
        </div>
        <DashBoardSideNav />
      </div>
      <Footer />
    </main>
  );
};

export default DashboardLayout;
