import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import backgroundImage from "../../../assets/bg5.jpg";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

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

  // Styles for the background
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "2rem 0",
  };

  // Styles for the content container
  const contentStyle = {
    marginTop: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: "2rem",
    borderRadius: "10px",
  };

  return (
    <div style={backgroundStyle}>
      <Container style={contentStyle}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          style={{ color: "black", fontFamily: "fantasy" }}
        >
          Job List
        </Typography>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                <CardContent>
                  <Typography variant="h5" style={{ color: "#333", fontWeight: "bold" }}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginBottom: "10px" }}>
                    {job.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Requirements:</strong> {job.requirements.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Budget:</strong> ${job.budget}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Posted by:</strong> {job.postedBy ? job.postedBy.email : "Unknown"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Created at:</strong> {new Date(job.createdAt).toLocaleDateString()}
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
