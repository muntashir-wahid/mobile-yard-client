import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";

const AllBuyers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/users?accountType=user`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <Loader
        className="min-h-screen"
        message="Please Wait!All buyers are loading..."
      />
    );
  } else {
    return (
      <div className="px-4 py-10">
        <SecondaryHeading>
          All the buyers {data?.data?.user?.length}
        </SecondaryHeading>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Delete Buyer</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {data?.data?.users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {<button className="btn btn-sm btn-error">Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default AllBuyers;
