import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AvailableMobiles from "../../Pages/AvailableMobiles/AvailableMobiles/AvailableMobiles";
import Blog from "../../Pages/Blog/Blog";
import UserProfile from "../../Pages/Dashboard/DashBoardPages/UserProfile/UserProfile";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/available-brands/:brandId", element: <AvailableMobiles /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/blog", element: <Blog /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [{ path: "/dashboard", element: <UserProfile /> }],
  },
]);

export default router;
