import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import PhoneCard from "../../../components/Cards/PhoneCard";
import Loader from "../../../components/Loader/Loader";
import PhoneBookingModal from "../../../components/Modal/PhoneBookingModal/PhoneBookingModal";
import SecondaryHeading from "../../../components/SectionHeadings/SecondaryHeading";
import SectionWrapper from "../../../components/Wrappers/SectionWrapper";

const AdvertisedPhones = () => {
  const [bookedPhone, setBookedPhone] = useState(null);
  const { isLoading, data } = useQuery({
    queryKey: ["advertisedPhones"],
    queryFn: async () => {
      const res = await fetch(
        "https://mobileyard-server.vercel.app/api/v1/phones?isAdvertised=true"
      );

      const data = await res.json();
      return data;
    },
  });

  return (
    <SectionWrapper className="px-4 py-12">
      <SecondaryHeading>Advertised Phones</SecondaryHeading>
      {isLoading && (
        <Loader
          className="h-96"
          message="Please wait!Advertised phones is loading..."
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4">
        {!isLoading &&
          data?.data?.phones.map((phone) => (
            <PhoneCard
              key={phone._id}
              phone={phone}
              onBookPhone={setBookedPhone}
            />
          ))}
      </div>

      {bookedPhone && (
        <PhoneBookingModal
          bookingPhone={bookedPhone}
          onClose={setBookedPhone}
        />
      )}
    </SectionWrapper>
  );
};

export default AdvertisedPhones;
