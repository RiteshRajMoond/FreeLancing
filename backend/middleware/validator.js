const body = require("express-validator").body;

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email address").trim(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const signupValidator = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
    ...loginValidator,
];

module.exports = { loginValidator, signupValidator };