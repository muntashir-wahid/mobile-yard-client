import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AvailableMobiles from "../../Pages/AvailableMobiles/AvailableMobiles/AvailableMobiles";
import Blog from "../../Pages/Blog/Blog";
import AddAPhone from "../../Pages/Dashboard/DashBoardPages/AddAPhone/AddAPhone";
import AllBuyers from "../../Pages/Dashboard/DashBoardPages/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/DashBoardPages/AllSellers/AllSellers";
import Checkout from "../../Pages/Dashboard/DashBoardPages/Checkout/Checkout";
import MyBuyers from "../../Pages/Dashboard/DashBoardPages/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/Dashboard/DashBoardPages/MyOrders/MyOrders";
import MyPhones from "../../Pages/Dashboard/DashBoardPages/MyPhones/MyPhones";
import ReportedPhones from "../../Pages/Dashboard/DashBoardPages/ReportedPhones/ReportedPhones";
import UserProfile from "../../Pages/Dashboard/DashBoardPages/UserProfile/UserProfile";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import UserRoute from "../UserRoute/UserRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/available-brands/:brandId",
        loader: ({ params }) =>
          fetch(
            `https://mobileyard-server.vercel.app/api/v1/phones/${params.brandId}`
          ),
        element: (
          <PrivateRoute>
            <AvailableMobiles />
          </PrivateRoute>
        ),
      },
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
    children: [
      { path: "/dashboard", element: <UserProfile /> },
      {
        path: "/dashboard/my-orders",
        element: (
          <UserRoute>
            <MyOrders />
          </UserRoute>
        ),
      },
      {
        path: "/dashboard/my-orders/checkout/:id",
        loader: ({ params }) =>
          fetch(
            `https://mobileyard-server.vercel.app/api/v1/bookings/${params.id}`
          ),
        element: (
          <UserRoute>
            <Checkout />
          </UserRoute>
        ),
      },
      {
        path: "/dashboard/add-phone",
        element: (
          <SellerRoute>
            <AddAPhone />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-phones",
        element: (
          <SellerRoute>
            <MyPhones />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <SellerRoute>
            <MyBuyers />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-phones",
        element: (
          <AdminRoute>
            <ReportedPhones />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
