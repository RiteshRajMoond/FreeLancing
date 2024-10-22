const express = require("express");

const adminController = require("../controller/admin-controller");
const checkSuperAdmin = require("../middleware/checkSuperAdmin");
const { signupValidator, loginValidator } = require("../middleware/validator");
const verifyAdminJWT = require("../middleware/verifyAdminJWT");

const router = express.Router();

// super-admin route 
router.post(
  "/generate-invite",
  verifyAdminJWT,
  checkSuperAdmin,
  adminController.generateInvite
);

// authentication and authorization routes
router.post("/signup", signupValidator, adminController.signup);
router.post("/login", loginValidator, adminController.login);
router.get("/logout", adminController.logout);

// dashboard routes
// router.get('/get-admin', verifyAdminJWT, adminController);

module.exports = router;