const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const verifyUserJWT = async (req, res, next) => {
  try {
    const token = req.signedCookies.userJWT;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sessionToken = await redisClient.get(`session:${decoded.id}`);

    if (!sessionToken || sessionToken !== token)
      return res.status(401).json({ message: "Session Expired!" });

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { verifyUserJWT };
