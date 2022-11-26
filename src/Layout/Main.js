import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const Main = () => {
  const navigation = useNavigation();

  return (
    <main>
      <NavBar />
      {navigation.state === "loading" && (
        <Loader
          className="min-h-screen"
          message="Please wait!Page is loading..."
        />
      )}
      <Outlet />
      <Footer />
    </main>
  );
};

export default Main;
