import React from "react";
import { useLoaderData } from "react-router-dom";
import SecondaryHeading from "../../../components/SectionHeadings/SecondaryHeading";
import SectionWrapper from "../../../components/Wrappers/SectionWrapper";

const AvailableMobiles = () => {
  const loadedData = useLoaderData();

  console.log(loadedData);
  return (
    <SectionWrapper className="min-h-screen">
      <SecondaryHeading>Welcome to available mobiles</SecondaryHeading>
    </SectionWrapper>
  );
};

export default AvailableMobiles;
