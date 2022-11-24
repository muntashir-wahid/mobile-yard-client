import React from "react";
import { Link } from "react-router-dom";

const MobileBrandCard = ({ brand }) => {
  const { name, image } = brand;
  return (
    <div className="card bg-base-100 shadow-xl image-full max-h-48">
      <figure>
        <img src={image} alt={`${name} logo`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-accent text-3xl">{name}</h2>
        <div className="card-actions justify-end">
          <Link to="/">
            <button className="btn btn-accent btn-outline">
              See all {name} phoness
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileBrandCard;
