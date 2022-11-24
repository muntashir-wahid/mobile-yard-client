import { useQuery } from "@tanstack/react-query";
import React from "react";
import SecondaryHeading from "../../../components/SectionHeadings/SecondaryHeading";
import SectionWrapper from "../../../components/Wrappers/SectionWrapper";
import MobileBrandCard from "./MobileBrandCard";

const MobileBrands = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["availableBrands"],
    queryFn: () =>
      fetch("http://localhost:5000/api/v1/brands").then((res) => res.json()),
  });

  return (
    <SectionWrapper className="p-4 md:px-12 py-12">
      <SecondaryHeading>All Mobile Brands</SecondaryHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!isLoading &&
          data?.data?.availableBrands?.map((brand) => (
            <MobileBrandCard key={brand._id} brand={brand} />
          ))}
      </div>
    </SectionWrapper>
  );
};

export default MobileBrands;
