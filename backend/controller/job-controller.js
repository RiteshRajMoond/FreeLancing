const multer = require("multer");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} = require("firebase/storage");
const storage = require("../config/firebase");
const axios = require("axios");

const Job = require("../models/Jobs");
const User = require("../models/User");
const sendEmail = require("../util/email");

const upload = multer({ storage: multer.memoryStorage() });

// Authentication required!
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
    job.applicants.push({ userId, appliedAt: new Date() });
    await job.save();

    return res.status(200).json({ message: "Applied for job successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getJobDetails = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    console.log(req.params);

    const job = await Job.findById(jobId).populate(
      "postedBy",
      "firstName lastName email phoneNumber address createdAt socialMedia"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });

    return res.status(200).json({ job });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getJobApplicants = async (req, res, next) => {
  try {
    const { jobId } = req.query;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.postedBy.toString() !== userId)
      return res.status(401).json({ message: "Unauthorized" });

    const applicantIds = job.applicants.map((applicant) => applicant.userId);
    const applicants = await User.find({ _id: { $in: applicantIds } });

    return res.status(200).json({ applicants });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectApplicant = async (req, res, next) => {
  try {
    const { jobId, applicantId } = req.body;
    // const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const selectedApplicant = job.applicants.find(
      (applicant) => applicant.userId.toString() === applicantId
    );
    if (!selectedApplicant)
      return res.status(404).json({ message: "Applicant not found" });

    job.status = "CLOSED";
    job.applicants = [selectedApplicant];
    await job.save();

    const applicant = await User.findById(applicantId);
    if (applicant) {
      applicant.jobsSelected.push(jobId);
      await applicant.save();

      sendEmail(
        applicant.email,
        "Job Application Accepted",
        `Your application for the job "${job.title}" has been accepted.`
      );
    }

    return res.status(200).json({ message: "Applicant selected successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.uploadFile = [
  upload.single("file"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { jobId } = req.params;
      const job = await Job.findById(jobId);
      if (!job) {
        console.error("Job not found:", jobId);
        return res.status(404).json({ message: "Job not found" });
      }

      const dateTime = new Date().toISOString();
      const storageRef = ref(storage, `files/${jobId}+${dateTime}`);
      const metadata = { contentType: req.file.mimetype };

      console.log("Uploading file to Firebase Storage...");
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      console.log("File uploaded to Firebase Storage");

      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log("Download URL obtained:", downloadUrl);

      job.submittedFiles.push(downloadUrl);
      await job.save();
      console.log("File URL saved to job document");

      return res
        .status(200)
        .json({ message: "File uploaded successfully", url: downloadUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({ message: error.message });
    }
  },
];

exports.downloadFile = async (req, res, next) => {
  try {
    const { filePath } = req.params;
    const decodedFilePath = decodeURIComponent(filePath);
    const fileRef = ref(storage, decodedFilePath);

    // Get the download URL
    const downloadURL = await getDownloadURL(fileRef);

    const fileMetadata = await getMetadata(fileRef);
    // Make an HTTP request to fetch the file
    const response = await axios({
      url: downloadURL,
      responseType: "stream",
    });

    // Set appropriate headers
    res.setHeader("Content-Type", fileMetadata.contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${decodedFilePath.split("/").pop()}"`
    );

    // Pipe the response stream to the response
    return response.data.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    return res.status(500).json({ message: error.message });
  }
};

// No authentication required
exports.getAllJobs = async (req, res, next) => {
  try {
    // To show only open jobs
    const jobs = await Job.find({ status: "OPEN" }).populate(
      "postedBy",
      "firstName lastName email phoneNumber address createdAt socialMedia"
    );
    // console.log(jobs);
    return res.status(200).json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
