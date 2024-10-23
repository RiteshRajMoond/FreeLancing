const redisClient = require("../config/redis");

const rateLimit = (limit, windowsInSeconds) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip;
      const key = `rate:${ip}`;

      const requests = await redisClient.incr(key);
      if (requests === 1) await redisClient.expire(key, windowsInSeconds);

      if (requests > limit)
        return res.status(429).json({ message: "Too many requests" });
    
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };
};

module.exports = rateLimit;