import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import backgroundImage from "../../../assets/bg5.jpg";

const ClientDashboard = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log("Fetching job details for jobId:", jobId);
        const response = await axios.get(`/user/job/get-job/${jobId}`);
        console.log("Job details fetched:", response.data);
        setJobDetails(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
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
            sx={{ fontWeight: "bold", color: "#222", fontFamily: "Roboto, sans-serif" }}
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
              <Typography variant="h5" gutterBottom sx={{ color: "#333", fontWeight: "bold" }}>
                Project Details
              </Typography>

              <Divider sx={{ marginY: "1rem", backgroundColor: "#555" }} />

              <Typography variant="body1" sx={{ color: "#333", marginBottom: "0.8rem" }}>
                <strong>Title:</strong> {jobDetails.title || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Description:</strong> {jobDetails.description || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Requirements:</strong> {jobDetails.requirements ? jobDetails.requirements.join(", ") : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Budget:</strong> ${jobDetails.budget || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Deadline:</strong>{" "}
                {jobDetails.deadline ? new Date(jobDetails.deadline).toLocaleDateString() : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Posted By:</strong>{" "}
                {jobDetails.postedBy
                  ? `${jobDetails.postedBy.firstName} ${jobDetails.postedBy.lastName}`
                  : "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Progress Status:</strong> {jobDetails.progressStatus || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Feedback:</strong> {jobDetails.feedback || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555", marginBottom: "0.8rem" }}>
                <strong>Completion Date:</strong>{" "}
                {jobDetails.completionDate
                  ? new Date(jobDetails.completionDate).toLocaleDateString()
                  : "N/A"}
              </Typography>

              <Typography variant="h6" sx={{ marginTop: "2rem", color: "#333" }}>
                Submitted Files
              </Typography>
              <Divider sx={{ marginBottom: "1rem", backgroundColor: "#555" }} />
              {jobDetails.submittedFiles && jobDetails.submittedFiles.length > 0 ? (
                jobDetails.submittedFiles.map((file, index) => (
                  <Typography variant="body1" key={index} sx={{ color: "#333", marginBottom: "0.5rem" }}>
                    <strong>File {index + 1}:</strong>{" "}
                    <Link
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#0073e6", textDecoration: "underline" }}
                    >
                      Download
                    </Link>
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "#777" }}>
                  No submitted files available.
                </Typography>
              )}
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: "200px" }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ color: "#777", marginLeft: "1rem" }}>
                Loading job details...
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ClientDashboard;