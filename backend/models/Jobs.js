const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["OPEN", "CLOSED", "IN PROGRESS"],
    default: "OPEN",
  },
  applicants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  progressStatus: {
    type: String,
    enum: [
      "NOT STARTED",
      "IN PROGRESS",
      "SUBMITTED",
      "CHANGES REQUESTED",
      "APPORVED",
    ],
    default: "NOT STARTED",
  },
  submittedFiles: [
    {
      type: String,
    },
  ],
  feedback: {
    type: String,
  },
  completionDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Job", jobSchema);