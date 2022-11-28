import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { Fragment, useEffect, useState } from "react";
import FormErrorMessage from "../../../../components/FormErrorMessage/FormErrorMessage";
const CheckoutForm = ({ bookedPhone }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentConfirmation, setPaymentConfirmation] = useState("");
  const { _id, price, bookerName, bookerEmail, itemId } = bookedPhone;

  useEffect(() => {
    fetch("https://mobileyard-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setIsPaying(true);

    const { paymentIntent, error: confrimError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: bookerName,
            email: bookerEmail,
          },
        },
      });

    if (confrimError) {
      setCardError(confrimError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        transactionId: paymentIntent.id,
        status: "paid",
      };

      fetch(`https://mobileyard-server.vercel.app/api/v1/bookings/${_id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged && data.modifiedCount) {
            fetch(
              `https://mobileyard-server.vercel.app/api/v1/phones/${itemId}?state=sold`,
              {
                method: "PATCH",
              }
            )
              .then((res) => res.json())
              .then((modifiedData) => {
                if (modifiedData.acknowledged && modifiedData.modifiedCount) {
                  setIsPaying(false);
                  setPaymentConfirmation(
                    `Payment completed.Your transaction id: ${paymentIntent.id}`
                  );
                }
              });
          }
        });
    }
  };

  // if (isPaying) {
  //   return (
  //     <Loader className="h-24" message="Please wait!Payment is processing..." />
  //   );
  // } else {
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay now
        </button>
      </form>
      {cardError && <FormErrorMessage className="mt-4" message={cardError} />}
      {isPaying && (
        <p className="text-info mt-4">
          Please wait!Your payment is processing...
        </p>
      )}
      {paymentConfirmation && (
        <p className="text-success font-semibold mt-4">{paymentConfirmation}</p>
      )}
    </Fragment>
  );
};
// };

export default CheckoutForm;
