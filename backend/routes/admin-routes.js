const express = require("express");

const adminController = require("../controller/admin-controller");
const checkSuperAdmin = require("../middleware/checkSuperAdmin");
const { signupValidator, loginValidator } = require("../middleware/validator");
const verifyAdminJWT = require("../middleware/verifyAdminJWT");

const router = express.Router();

router.post(
  "/generate-invite",
  verifyAdminJWT,
  checkSuperAdmin,
  adminController.generateInvite
);
router.post("/signup", signupValidator, adminController.signup);
router.post("/login", loginValidator, adminController.login);

router.get("/logout", adminController.logout);

module.exports = router;