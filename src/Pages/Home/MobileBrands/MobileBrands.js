import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../components/Loader/Loader";
import SecondaryHeading from "../../../components/SectionHeadings/SecondaryHeading";
import SectionWrapper from "../../../components/Wrappers/SectionWrapper";
import MobileBrandCard from "./MobileBrandCard";

const MobileBrands = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["availableBrands"],
    queryFn: () =>
      fetch("https://mobileyard-server.vercel.app/api/v1/brands").then((res) =>
        res.json()
      ),
  });

  return (
    <SectionWrapper className="p-4 md:px-12 py-12">
      <SecondaryHeading>All Mobile Brands</SecondaryHeading>
      {isLoading && (
        <Loader
          className="h-32"
          message="Please wait!Phone brands is loading..."
        />
      )}
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
