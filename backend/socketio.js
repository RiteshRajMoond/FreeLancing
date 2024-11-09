const socketio = require("socket.io");

const setupSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("a user connected");

    socket.on("sendMsg", (msg) => {
      console.log("msg: ", msg);
      io.emit("recieveMsg", msg);
    });

    socket.on("disconnect", () => {
    //   console.log("user disconnected");
    });
  });
};

module.exports = setupSocket;
