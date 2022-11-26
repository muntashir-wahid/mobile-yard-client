import React from "react";
import AdvertisedPhones from "../AdvertisedPhones/AdvertisedPhones";
import Banner from "../Banner/Banner";
import MobileBrands from "../MobileBrands/MobileBrands";

const Home = () => {
  return (
    <header>
      <Banner />
      <MobileBrands />
      <AdvertisedPhones />
    </header>
  );
};

export default Home;
