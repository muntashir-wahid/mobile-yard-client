import React from "react";
import { useLoaderData } from "react-router-dom";
import PhoneCard from "../../../components/Cards/PhoneCard";
import SecondaryHeading from "../../../components/SectionHeadings/SecondaryHeading";
import SectionWrapper from "../../../components/Wrappers/SectionWrapper";

const AvailableMobiles = () => {
  const { data } = useLoaderData();

  return (
    <SectionWrapper className="min-h-screen px-4 py-12">
      <SecondaryHeading>
        You can buy from {data?.phones.length} Mobiles.
      </SecondaryHeading>
      <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
        {data.phones.map((phone) => (
          <PhoneCard key={phone._id} phone={phone} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AvailableMobiles;
