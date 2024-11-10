import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/bg5.jpg";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/user/job/user-jobs");
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = async (jobId) => {
    try {
      const resp = await axios.get(`/user/job/get-job/${jobId}`);
      const job = resp.data.job;

      if (job.status === "CLOSED") {
        navigate(`/client-dashboard/${jobId}`);
      } else {
        navigate(`/job-applicants?jobId=${jobId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateJob = () => {
    navigate("/create-job");
  };

  // Styles for the background
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "2rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // Styles for the content container
  const contentStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
    maxWidth: "1000px",
    width: "90%",
  };

  return (
    <div style={backgroundStyle}>
      <Container style={contentStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h3"
            align="center"
            style={{ color: "#333", fontFamily: "fantasy" }}
          >
            Job List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateJob}
            sx={{
              fontWeight: "bold",
              backgroundColor: "#333",
              "&:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            Create Job
          </Button>
        </Box>

        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                }}
                onClick={() => handleJobClick(job._id)}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    style={{ color: "#333", fontWeight: "bold" }}
                    gutterBottom
                  >
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Requirements:</strong> {job.requirements.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Budget:</strong> ${job.budget}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Deadline:</strong>{" "}
                    {new Date(job.deadline).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Posted by:</strong>{" "}
                    {job.postedBy ? job.postedBy.email : "Unknown"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Created at:</strong>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default JobList;
