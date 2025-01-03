const express = require("express");
const {
  getPublishableKey,
  createCheckoutSession,
  handleWebhook
} = require("../controller/payment-controller");

const router = express.Router();

router.get("/publishable-key", getPublishableKey);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/webhook", express.raw({type: 'application/json'}), handleWebhook);

module.exports = router;
