const socketio = require("socket.io");
const Chats = require("./models/Chats");

const setupSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      // methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("sendMsg", async (msg) => {
      // console.log(msg);
      io.emit("receiveMsg", msg);

      const { jobId, senderName = "Anonymous", text = "No message" } = msg;
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

    socket.on("disconnect", () => {});
  });
};

module.exports = setupSocket;