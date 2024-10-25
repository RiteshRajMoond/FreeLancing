const express = require("express");

const userController = require("../controller/user-controller");
const jobController = require('../controller/job-controller');
const { signupValidator, loginValidator } = require("../middleware/validator");
const { verifyUserJWT } = require("../middleware/verifyUserJWT");
const rateLimit = require("../middleware/rateLimit");

const router = express.Router();

const apiRateLimit = rateLimit(100, 60); // 100 requests per minute

// Authentication and Authorization routes
router.post("/signup", signupValidator, apiRateLimit, userController.signup);
router.post("/login", loginValidator, apiRateLimit, userController.login);
router.get("/logout", apiRateLimit, userController.logout);
router.get('/check-login', apiRateLimit, verifyUserJWT, userController.checkLogin);

// Dashboard Routes
router.get("/get-user", verifyUserJWT, apiRateLimit, userController.getUser);
router.post(
  "/update-user",
  verifyUserJWT,
  userController.updateUserInformation
);
router.post(
  "/upload-image-picture",
  verifyUserJWT,
  apiRateLimit,
  userController.uploadImage
);

// Job Routes
router.post('/job/create-job', verifyUserJWT, jobController.createJob);
router.get('/job/get-jobs', verifyUserJWT, jobController.getJobs);

module.exports = router;
