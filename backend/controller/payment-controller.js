const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const sendEmail = require("../util/email");

exports.getPublishableKey = (req, res, next) => {
  return res
    .status(200)
    .json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

exports.createCheckoutSession = async (req, res, next) => {
  try {
    const { amount, currency} = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "Fees",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });


    res.status(200).json({ id: session.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

exports.handleWebhook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch(e) {
    console.error("Error verifying webhook:", e.message);
    return res.sendStatus(400);
  }

  if(event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Send email to user
    const email = session.customer_email;
    const subject = "Payment Successful";
    const text = `Your payment of ₹${session.amount_total / 100} was successful.`;

    await sendEmail(email, subject, text);
  }
  return res.status(200).end();
}