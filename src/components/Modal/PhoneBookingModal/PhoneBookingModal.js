import React, { Fragment, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";
import toast from "react-hot-toast";

const PhoneBookingModal = ({ bookingPhone, onClose }) => {
  const { user } = useContext(AuthContext);
  const { _id: itemId, phoneName, resellingPrice } = bookingPhone;

  const bookingFormSubmitHandler = (event) => {
    event.preventDefault();
    const bookingForm = event.target;
    const bookerName = bookingForm.bookerName.value;
    const bookerEmail = bookingForm.bookerEmail.value;
    const bookingItem = bookingForm.bookingItem.value;
    const price = bookingForm.price.value;
    const bookerContact = bookingForm.bookerContact.value;
    const meetingLocation = bookingForm.meetingLocation.value;
    const bookingInfo = {
      bookerContact,
      bookerName,
      bookerEmail,
      bookingItem,
      itemId,
      meetingLocation,
      price,
    };

    axios
      .post("http://localhost:5000/api/v1/bookings", bookingInfo, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        onClose(null, null);
        if (data?.success) {
          toast.success(`You have booked ${data?.data?.booking.bookingItem}`);
        }
        if (!data.success) {
          toast.error(data.message);
        }
      });
  };

  return (
    <Fragment>
      <input
        type="checkbox"
        id="phone-booking-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Book {phoneName}</h3>
          <form
            onSubmit={bookingFormSubmitHandler}
            className="max-w-sm mx-auto p-2"
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Your name?</span>
              </label>
              <input
                name="bookerName"
                type="text"
                defaultValue={user?.displayName}
                readOnly
                disabled
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Your email?</span>
              </label>
              <input
                name="bookerEmail"
                type="email"
                disabled
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Phone name or modal</span>
              </label>
              <input
                name="bookingItem"
                type="text"
                defaultValue={phoneName}
                readOnly
                disabled
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Phone price</span>
              </label>
              <input
                name="price"
                type="number"
                defaultValue={resellingPrice}
                readOnly
                disabled
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Contact No.</span>
              </label>
              <input
                name="bookerContact"
                type="tel"
                placeholder="017********"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Meeting location</span>
              </label>
              <input
                name="meetingLocation"
                type="text"
                placeholder="Dhaka"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="modal-action">
              <button
                onClick={onClose.bind(null, null)}
                className="btn btn-error btn-outline"
              >
                Close
              </button>
              <input
                type="submit"
                className="btn btn-primary btn-outline"
                value="Confirm Booking"
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default PhoneBookingModal;
