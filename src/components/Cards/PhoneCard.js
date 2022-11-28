import React, { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";

const PhoneCard = ({ phone, onBookPhone }) => {
  const [isSellerVerified, setIsSellerVerified] = useState(false);
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
    sellerEmail,
  } = phone;

  const date = new Date(postTime).toLocaleDateString("en-US", {
    years: "numeric",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    fetch(
      `https://mobileyard-server.vercel.app/api/v1/users?email=${sellerEmail}&checkFor=isVerified`
    )
      .then((res) => res.json())
      .then((data) => setIsSellerVerified(data.isVerified));
  }, [sellerEmail]);

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={phoneName} className="max-h-[32rem] w-full" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{phoneName}</h3>
        <p className="font-semibold">
          Posted at {date} by {sellerName}{" "}
          {isSellerVerified && (
            <GoVerified className="text-blue-500 inline-block ml-[1px]" />
          )}
        </p>
        <p>Posted from {sellerLocation}</p>
        <p>Resale price: ${resellingPrice}</p>
        <p>Original price: ${originalPrice}</p>
        <p>Years of used: {usedYears}year(s) </p>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <label
            onClick={onBookPhone.bind(null, phone)}
            htmlFor="phone-booking-modal"
            className="btn btn-primary"
          >
            Book now
          </label>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
