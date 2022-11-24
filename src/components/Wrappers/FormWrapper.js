import React from "react";

const FormWrapper = ({ className, children }) => {
  return (
    <section
      className={`container min-h-screen mx-auto px-4 py-10 ${className}`}
    >
      {children}
    </section>
  );
};

export default FormWrapper;
