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
      "firstName lastName email phoneNumber address createdAt socialMedia"
    );
    // console.log(jobs);
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = job.applicants.find(
      (applicant) => applicant.userId.toString() === userId
    );
    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied for this job" });
    job.applicants.push({userId, appliedAt: new Date()});
    await job.save();

    return res.status(200).json({ message: "Applied for job successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
