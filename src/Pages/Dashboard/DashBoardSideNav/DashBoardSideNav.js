import React from "react";

const DashBoardSideNav = () => {
  return (
    <aside className="drawer-side">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
      </ul>
    </aside>
  );
};

export default DashBoardSideNav;
