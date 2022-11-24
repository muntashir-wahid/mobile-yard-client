import React from "react";

const Loader = ({ className, message = "Loading..." }) => {
  return (
    <div
      className={`flex justify-center items-center flex-col gap-3 ${className}`}
    >
      <progress className="progress w-56"></progress>
      <p className="text-center text-primary">{message}</p>
    </div>
  );
};

export default Loader;
