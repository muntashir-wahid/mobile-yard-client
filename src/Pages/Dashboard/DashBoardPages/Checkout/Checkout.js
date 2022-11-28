import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import SecondaryHeading from "../../../../components/SectionHeadings/SecondaryHeading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const loadedData = useLoaderData();
  const { bookingItem } = loadedData;

  return (
    <div className="px-4 py-10">
      <SecondaryHeading>Please pay for {bookingItem}</SecondaryHeading>
      <div className="max-w-sm mx-auto mt-8 bg-base-200 px-12 py-8 shadow-sm rounded-md">
        <Elements stripe={stripePromise}>
          <CheckoutForm bookedPhone={loadedData} />
        </Elements>
      </div>

      <div className="max-w-sm mx-auto mt-8 bg-base px-12 py-8 shadow-sm rounded-md text-slate-400">
        <p>Test card number: 4242424242424242</p>
        <p>Date: any future date</p>
        <p>CVC: any 3 digit number</p>
        <p>ZIP: any 5 digit number</p>
      </div>
    </div>
  );
};

export default Checkout;
