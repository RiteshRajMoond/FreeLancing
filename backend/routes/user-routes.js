const express = require("express");

const userController = require("../controller/user-controller");
const { signupValidator, loginValidator } = require("../middleware/validator");
const { verifyUserJWT } = require("../middleware/verifyUserJWT");

const router = express.Router();

// Authentication and Authorization routes
router.post("/signup", signupValidator, userController.signup);
router.post("/login", loginValidator, userController.login);
router.get("/logout", userController.logout);

// Dashboard Routes
router.get('/get-user', verifyUserJWT, userController.getUser);
router.post("/update-user", verifyUserJWT, userController.updatePI);
router.get('/get-education', verifyUserJWT, userController.getEducation);
router.post('/update-education', verifyUserJWT, userController.updateEducation);

// redis testing (Will be removed later)
router.get("/session/:userId", userController.getSessionData);

module.exports = router;