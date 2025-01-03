const express = require("express");
const {
  getPublishableKey,
  createCheckoutSession,
  handleWebhook,
} = require("../controller/payment-controller");
const { verifyUserJWT } = require("../middleware/verifyUserJWT");
const rateLimit = require("../middleware/rateLimit");

const router = express.Router();

const apiRateLimit = rateLimit(100, 60); // 100 requests per minute

router.get("/publishable-key", verifyUserJWT, apiRateLimit, getPublishableKey);
router.post(
  "/create-checkout-session",
  verifyUserJWT,
  apiRateLimit,
  createCheckoutSession
);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);

module.exports = router;
