const Job = require("../models/Jobs");
const User = require("../models/User");

exports.createJob = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, description, requirements, budget, deadline } = req.body;

    const newJob = new Job({
      title,
      description,
      requirements,
      budget,
      deadline,
      postedBy: userId,
    });
    await newJob.save();

    const user = await User.findById(userId);
    user.jobsPosted.push(newJob._id);
    await user.save();

    return res
      .status(201)
      .json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate(
      "postedBy",
      "firstName lastName email"
    );
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
