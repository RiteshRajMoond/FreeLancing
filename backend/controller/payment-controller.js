const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCharge = async (req, res, next) => {
  try {
    const { amount, currency, source } = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency,
      source,
    });
    return res.status(200).json(charge);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getPublishableKey = (req, res, next) => {
  return res
    .status(200)
    .json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};
