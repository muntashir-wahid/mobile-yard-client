import React from "react";

const SecondaryHeading = ({ children, className }) => {
  return (
    <h2 className={`text-4xl font-semibold text-center mb-6 ${className}`}>
      {children}
    </h2>
  );
};

export default SecondaryHeading;
