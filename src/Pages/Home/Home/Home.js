import React, { Fragment } from "react";
import AdvertisedPhones from "../AdvertisedPhones/AdvertisedPhones";
import Banner from "../Banner/Banner";
import LearnMoreAndContactUs from "../LearnMoreAndContactUs/LearnMoreAndContactUs";
import MobileBrands from "../MobileBrands/MobileBrands";

const Home = () => {
  return (
    <Fragment>
      <header>
        <Banner />
      </header>
      <MobileBrands />
      <AdvertisedPhones />
      <LearnMoreAndContactUs />
    </Fragment>
  );
};

export default Home;
