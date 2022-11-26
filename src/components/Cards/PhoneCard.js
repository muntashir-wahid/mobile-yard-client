import React from "react";

const PhoneCard = ({ phone }) => {
  const {
    phoneName,
    image,
    sellerName,
    postTime,
    sellerLocation,
    resellingPrice,
    originalPrice,
    usedYears,
    description,
  } = phone;
  const date = new Date(postTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={phoneName} className="max-h-[32rem] w-full" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{phoneName}</h3>
        <p className="font-semibold">
          Posted at {date} by {sellerName}
        </p>
        <p>Posted from {sellerLocation}</p>
        <p>Resale price: {resellingPrice}</p>
        <p>Original price: {originalPrice}</p>
        <p>Years of used: {usedYears}year(s) </p>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Book now</button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
