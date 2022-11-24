import React from "react";

const SectionWrapper = ({ children, className }) => {
  return (
    <section className={`container mx-auto ${className}`}>{children}</section>
  );
};

export default SectionWrapper;
