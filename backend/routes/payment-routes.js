const express = require("express");

const router = express.Router();

const paymentController = require("../controller/payment-controller");

router.post("/payment", paymentController.createCharge);
router.get(
  "/publishable-key",
  paymentController.getPublishableKey
);

module.exports = router;