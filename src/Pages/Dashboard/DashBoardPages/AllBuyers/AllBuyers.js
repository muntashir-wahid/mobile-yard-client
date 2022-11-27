import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";

const AllBuyers = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      const res = await fetch(
        `https://mobileyard-server.vercel.app/api/v1/users?accountType=user`
      );
      const data = await res.json();
      return data;
    },
  });

  // -------------- //
  // Delete a buyer
  // -------------- //

  const deleteBuyerHandler = (buyer) => {
    fetch(`https://mobileyard-server.vercel.app/api/v1/users/${buyer._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result?.acknowledged && data?.result?.deletedCount) {
          toast.success(`You have deleted ${buyer.name}.`);
          refetch();
        }
      });
  };

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
                    {
                      <button
                        onClick={deleteBuyerHandler.bind(null, user)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    }
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
