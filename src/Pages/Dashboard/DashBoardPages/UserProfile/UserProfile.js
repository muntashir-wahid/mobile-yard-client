import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";
import { AuthContext } from "../../../../context/AuthProvider";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, data } = useQuery({
    queryKey: ["userProfileInfo", user?.email],
    queryFn: () =>
      fetch(
        `https://mobileyard-server.vercel.app/api/v1/users?email=${user?.email}`
      ).then((res) => res.json()),
  });

  return (
    <section className="py-12 px-6">
      {!isLoading && data?.success && (
        <div>
          <SecondaryHeading className="mb-12">
            Hello {data?.data?.user?.name}!<br />
            Welcome to your Dashboard
          </SecondaryHeading>

          <div className="space-y-2 text-xl font-medium mb-3">
            <p>Your Name: {data?.data?.user?.name}</p>
            <p>Your Email: {data?.data?.user?.email}</p>
            <p>
              Your Phone No:{" "}
              {data?.data?.user?.phone ? data?.data?.user?.phone : "No data"}
            </p>
            <p>Account Type: {data?.data?.user?.accountType}</p>
          </div>
          <button className="btn btn-primary">Edit Account</button>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
