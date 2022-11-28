import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import { MdBugReport } from "react-icons/md";

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

  const reportPhoneHandler = (reportedPhone) => {
    fetch(
      `http://localhost:5000/api/v1/phones/${reportedPhone._id}?report=true`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged && data.modifiedCount) {
          toast.success(`You have reported ${reportedPhone.phoneName}`);
        }
      });
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={phoneName} className="max-h-[32rem] w-full" />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-5">
          <h3 className="card-title">{phoneName}</h3>
          <button
            onClick={reportPhoneHandler.bind(null, phone)}
            className="btn btn-error btn-sm btn-outline"
          >
            Report
            <MdBugReport className="inline-block text-lg" />
          </button>
        </div>
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
