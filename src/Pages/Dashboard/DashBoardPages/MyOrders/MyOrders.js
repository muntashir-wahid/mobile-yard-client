import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";
import { AuthContext } from "../../../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, data } = useQuery({
    queryKey: ["buyerOrders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://mobileyard-server.vercel.app/api/v1/bookings?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <Loader
        className="min-h-screen"
        message="Please Wait!All orders loading..."
      />
    );
  } else {
    return (
      <div className="px-4 py-10">
        <SecondaryHeading>
          All phones ordered by {user?.displayName}
        </SecondaryHeading>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Phone Image</th>
                <th>Phone Name</th>
                <th>Price</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {data?.data?.orders?.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-20 rounded">
                        <img src={order.image} alt={order.bookingItem} />
                      </div>
                    </div>
                  </td>
                  <td>{order.bookingItem}</td>

                  <td>${order.price}</td>

                  <td>
                    {order?.payment?.status === "paid" ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <Link to={`/dashboard/my-orders/checkout/${order._id}`}>
                        <button className="btn btn-sm btn-primary">pay</button>
                      </Link>
                    )}
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

export default MyOrders;
