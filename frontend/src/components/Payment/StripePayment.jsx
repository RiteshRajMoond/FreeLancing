import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const StripePayment = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchPublishableKey = async () => {
      const resp = await axios.get("/stripe/publishable-key");
      setStripePromise(loadStripe(resp.data.publishableKey));
    };

    fetchPublishableKey();
  }, []);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { data: clientSecret } = await axios.post("/stripe/payment", {
      amount: 1000,
      currency: "inr",
      source: "tok_visa",
    });

    const result = await stripe.confirmCardPayment(clientSecret);
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment successful");
      }
    }

    return (
      <div>
        <button onClick={handlePayment}>Pay with Stripe</button>
      </div>
    );
  };
};

export default StripePayment;
