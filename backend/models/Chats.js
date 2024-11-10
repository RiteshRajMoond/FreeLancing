const mongoose = require("mongoose");

const chatsSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  messages: [
    {
      senderName: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chats = mongoose.model("Chats", chatsSchema);

module.exports = Chats;
