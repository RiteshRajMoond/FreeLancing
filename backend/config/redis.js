const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-14899.c264.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 14899,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Connection Error", err);
  }
};

connectRedis();

module.exports = redisClient;
