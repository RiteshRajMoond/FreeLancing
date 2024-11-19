import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import Chat from "../Chat/Chat"; // Import the Chat component

const ClientDashboard = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);
  const [senderName, setSenderName] = useState("Client Name"); // Replace with actual client name

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // console.log("Fetching job details for jobId:", jobId);
        const response = await axios.get(`/user/job/get-job/${jobId}`);
        // console.log("Job details fetched:", response.data);
        setJobDetails(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleDownload = async (fileUrl) => {
    try {
      const filePath = fileUrl.split("/o/")[1].split("?alt=media")[0];
      const encodedFilePath = encodeURIComponent(filePath);
      const response = await axios.get(
        `/user/job/download-file/${encodedFilePath}`,
        {
          responseType: "blob",
        }
      );
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "file"); // Set the download attribute with a filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl); // Clean up the Blob URL
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg5.jpg?alt=media&token=512cce5e-c5ff-4ed7-9a57-f84b5247e0b1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={5}
          sx={{
            padding: "2rem",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "12px",
            backdropFilter: "blur(8px)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#222",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Project Dashboard
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              Error: {error.message}
            </Alert>
          )}
          {jobDetails ? (
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                Project Details
              </Typography>

              <Divider sx={{ marginY: "1rem", backgroundColor: "#555" }} />

              <Typography
                variant="body1"
                sx={{ color: "#333", marginBottom: "0.8rem" }}
              >
                <strong>Title:</strong> {jobDetails.title || "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Description:</strong> {jobDetails.description || "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Requirements:</strong>{" "}
                {jobDetails.requirements
                  ? jobDetails.requirements.join(", ")
                  : "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Budget:</strong> ${jobDetails.budget || "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Deadline:</strong>{" "}
                {jobDetails.deadline
                  ? new Date(jobDetails.deadline).toLocaleDateString()
                  : "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Posted By:</strong>{" "}
                {jobDetails.postedBy
                  ? `${jobDetails.postedBy.firstName} ${jobDetails.postedBy.lastName}`
                  : "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Progress Status:</strong>{" "}
                {jobDetails.progressStatus || "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Feedback:</strong> {jobDetails.feedback || "N/A"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "0.8rem" }}
              >
                <strong>Completion Date:</strong>{" "}
                {jobDetails.completionDate
                  ? new Date(jobDetails.completionDate).toLocaleDateString()
                  : "N/A"}
              </Typography>

              <Typography
                variant="h6"
                sx={{ marginTop: "2rem", color: "#333" }}
              >
                Submitted Files
              </Typography>
              <Divider sx={{ marginBottom: "1rem", backgroundColor: "#555" }} />
              {jobDetails.submittedFiles &&
              jobDetails.submittedFiles.length > 0 ? (
                jobDetails.submittedFiles.map((file, index) => (
                  <Typography
                    variant="body1"
                    key={index}
                    sx={{ color: "#333", marginBottom: "0.5rem" }}
                  >
                    <strong>File {index + 1}:</strong>{" "}
                    <Button
                      variant="contained"
                      color="primary"
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ marginRight: "1rem" }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDownload(file)}
                    >
                      Download
                    </Button>
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "#777" }}>
                  No submitted files available.
                </Typography>
              )}
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: "200px" }}
            >
              <CircularProgress />
              <Typography
                variant="body1"
                sx={{ color: "#777", marginLeft: "1rem" }}
              >
                Loading job details...
              </Typography>
            </Box>
          )}
          <Chat senderName={senderName} jobId={jobId} />{" "}
          {/* Add the Chat component */}
        </Paper>
      </Container>
    </Box>
  );
};

export default ClientDashboard;
