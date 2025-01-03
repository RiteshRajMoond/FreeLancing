import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const StripePayment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPublishableKey = async () => {
      try {
        const resp = await axios.get("/stripe/publishable-key");
        setStripePromise(loadStripe(resp.data.publishableKey));
      } catch (error) {
        // console.error("Error fetching publishable key:", error);
      }
    };

    fetchPublishableKey();
  }, []);

  const handleCheckout = async () => {
    const amount = checkoutAmount * 100; // Convert to cents

    // Minimum amount validation
    if (amount < 5000) {
      setErrorMessage("Amount must be at least ₹50.");
      return;
    }

    try {
      const stripe = await stripePromise;
      // console.log("Amount being sent to Stripe:", amount);

      const { data: session } = await axios.post(
        "/stripe/create-checkout-session",
        {
          amount,
          currency: "inr",
        }
      );

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(
          "Error during redirect to checkout:",
          result.error.message
        );
      }
    } catch (error) {
      console.error("Error in handleCheckout:", error);
    }
  };

  return (
    <div style={styles.container}>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <div style={styles.form}>
            <input
              type="number"
              value={checkoutAmount}
              onChange={(e) => setCheckoutAmount(e.target.value)}
              placeholder="Enter amount"
              style={styles.input}
            />
            {errorMessage && <div style={styles.error}>{errorMessage}</div>}
            <button onClick={handleCheckout} style={styles.button}>
              Checkout with Stripe
            </button>
          </div>
        </Elements>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#6772e5",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#5469d4",
  },
  error: {
    color: "red",
    marginBottom: "20px",
  },
};

export default StripePayment;
