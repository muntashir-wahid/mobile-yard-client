import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";

const ReportedPhones = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["reportedPhones"],
    queryFn: async () => {
      const res = await fetch(
        "https://mobileyard-server.vercel.app/api/v1/phones?report=true"
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <Loader
        className="min-h-screen"
        message="Please Wait!All reported phones are loading..."
      />
    );
  } else {
    return (
      <div className="px-4 py-10">
        <SecondaryHeading>All Reports</SecondaryHeading>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Phone Image</th>
                <th>Phone Name</th>
                <th>Seller Name</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {data?.data?.reportedPhones?.map((phone, index) => (
                <tr key={phone._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-20 rounded">
                        <img src={phone.image} alt={phone.bookingItem} />
                      </div>
                    </div>
                  </td>
                  <td>{phone.phoneName}</td>

                  <td>{phone.sellerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default ReportedPhones;
