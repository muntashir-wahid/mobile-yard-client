import React from "react";

const FromCard = ({ children, className }) => {
  return (
    <div
      className={`max-w-lg mx-auto px-6 py-10 bg-base-100 rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default FromCard;
