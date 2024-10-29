import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Card, CardContent } from "@mui/material";

const JobDescription = () => {
  const location = useLocation();
  const { job } = location.state || {};
  console.log("Received job data:", job);

  if (!job) {
    return <Typography variant="h5">No job data available</Typography>;
  }

  return (
    <>
      <Card style={{ height: "30vh", position: "relative", overflow: "hidden" }}>
        <img
          src="../../assets/bg5.jpg"
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
      </Card>
      <Container style={{ marginTop: "-10vh" }}>
        <Card style={{
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        }}>
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              {job.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{ marginBottom: "10px" }}>
              <strong>Description:</strong> {job.description}
            </Typography>
            <Typography variant="body1" color="text.secondary" style={{ marginBottom: "10px" }}>
              <strong>Requirements:</strong> {job.requirements.join(", ")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Budget:</strong> ${job.budget}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Posted by:</strong> {job.postedBy ? job.postedBy.email : "Unknown"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Created at:</strong> {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default JobDescription;
