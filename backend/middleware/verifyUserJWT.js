const jwt = require("jsonwebtoken");

const verifyUserJWT = (req, res, next) => {
  try {
    const token = req.signedCookies.userJWT;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { verifyUserJWT };