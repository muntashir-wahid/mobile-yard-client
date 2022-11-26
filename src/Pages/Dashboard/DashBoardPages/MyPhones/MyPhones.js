import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";
import { AuthContext } from "../../../../context/AuthProvider";

const MyPhones = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["sellerAllPhones", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/phones?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  const phoneDeleteHandler = (detetePhone) => {
    fetch(`http://localhost:5000/api/v1/phones/${detetePhone._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged && data?.deletedCount) {
          toast.success(`You have deleted ${detetePhone.phoneName}!`);
          refetch();
        }
      });
  };

  if (isLoading) {
    return (
      <Loader
        className="min-h-screen"
        message="Please Wait!All phone are loading..."
      />
    );
  } else {
    return (
      <div className="px-4 py-10">
        <SecondaryHeading>
          All phones poster by {user?.displayName}
        </SecondaryHeading>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Status</th>
                <th>Price</th>
                <th>Advertise</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {data?.data?.phones?.map((phone, index) => (
                <tr key={phone._id}>
                  <th>{index + 1}</th>
                  <td>{phone.phoneName}</td>
                  <td>{phone.state === "available" ? "Unsold" : "Sold"}</td>
                  <td>${phone.resellingPrice}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary">
                      Advertise
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={phoneDeleteHandler.bind(null, phone)}
                      className="btn btn-sm btn-error"
                    >
                      delete
                    </button>
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

export default MyPhones;
