const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinRoom", ({ jobId }) => {
      socket.join(jobId);
      console.log(`User joined room: ${jobId}`);
    });

    socket.on("message", ({ jobId, message }) => {
      io.to(jobId).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

module.exports = setupSocket;