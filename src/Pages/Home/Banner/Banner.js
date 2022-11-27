import React from "react";
import banner from "../../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">
            Your pocket-friendly store
          </h1>
          <p className="mb-5">
            <em>MobileYard</em> is a second-hand reselling mobile marketplace.
            Here you can buy or sale your second-hand mobile phone with the best
            deals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
