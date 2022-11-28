import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";

const AllSellers = () => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      const res = await fetch(
        `https://mobileyard-server.vercel.app/api/v1/users?accountType=seller`
      );
      const data = await res.json();
      return data;
    },
  });

  // -------------- //
  // Verify a seller
  // --------------- //

  const verifySellerHandler = (seller) => {
    fetch(`https://mobileyard-server.vercel.app/api/v1/users/${seller._id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result?.acknowledged && data?.result?.modifiedCount) {
          toast.success(`You have made ${seller.name} as a verified seller`);
          refetch();
        }
      });
  };

  // -------------- //
  // Delete a seller
  // --------------- //

  const deleteSellerHandler = (seller) => {
    fetch(`https://mobileyard-server.vercel.app/api/v1/users/${seller._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result?.acknowledged && data?.result?.deletedCount) {
          toast.success(`You have deleted ${seller.name}.`);
          refetch();
        }
      });
  };

  if (isLoading) {
    return (
      <Loader
        className="min-h-screen"
        message="Please Wait!All sellers are loading..."
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
                <th>Verify Seller</th>
                <th>Delete Seller</th>
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
                    {user?.isVerified ? (
                      <span className="badge badge-success">Verified</span>
                    ) : (
                      <button
                        onClick={verifySellerHandler.bind(null, user)}
                        className="btn btn-sm btn-secondary"
                      >
                        Veerify Seller
                      </button>
                    )}
                  </td>
                  <td>
                    {
                      <button
                        onClick={deleteSellerHandler.bind(null, user)}
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

export default AllSellers;
