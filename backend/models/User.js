const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  profilePicture: {
    type: String, // This will be a link to firebase or any other application we can use instead
  },
  bio: {
    type: String,
  },
  skills: {
    type: [String],
  },
  portfolio: {
    type: [String],
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  certifications: [
    {
      name: String,
      issuingOrganization: String,
      issueDate: Date,
      expirationDate: Date,
    },
  ],
  socialMedia: {
    linkedIn: String,
    github: String,
    instagram: String,
  },
  projects: [
    {
      name: String,
      description: String,
      startDate: Date,
      endDate: Date,
      link: String,
      skills: [String],
    },
  ],
  jobsPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  jobsApplied: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
