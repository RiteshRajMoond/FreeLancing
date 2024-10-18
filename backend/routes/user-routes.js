const express = require("express");

const userController = require("../controller/user-controller");
const { signupValidator, loginValidator } = require("../middleware/validator");

const router = express.Router();

router.post("/signup", signupValidator, userController.signup);
router.post("/login", loginValidator, userController.login);
router.get("/logout", userController.logout);
router.get('/session/:userId', userController.getSessionData);

module.exports = router;