const socketio = require("socket.io");

const Chats = require("./models/Chats");

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

    socket.on("sendMsg", async (msg) => {
      console.log(msg);
      io.emit("recieveMsg", msg);

      const { jobId, senderName, text } = msg;
      const chat = await Chats.findOne({ jobId });
      if (chat) {
        chat.messages.push({ senderName, text });
        await chat.save();
      } else {
        await Chats.create({ jobId, messages: [{ senderName, text }] });
      }
    });

    socket.on("typing", (user) => {
      socket.broadcast.emit("typing", user);
    });

    socket.on("disconnect", () => {
      //   console.log("user disconnected");
    });
  });
};

module.exports = setupSocket;
