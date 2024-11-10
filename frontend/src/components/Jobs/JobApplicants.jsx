import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Link as MuiLink,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
} from "@mui/material";
import backgroundImage from "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg5.jpg?alt=media&token=512cce5e-c5ff-4ed7-9a57-f84b5247e0b1";

const JobApplicants = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const jobId = query.get("jobId");
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("/user/job/job-applicants", {
          params: { jobId },
        });
        setApplicants(response.data.applicants);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  const handleSelectApplicant = async () => {
    if (!selectedApplicantId) {
      toast.error("Please select an applicant.");
      return;
    }

    try {
      const response = await axios.post("/user/job/select-applicant", {
        jobId,
        applicantId: selectedApplicantId,
      });
      toast.success(
        "Applicant selected successfully,  email has been sent to the applicant"
      );
      setTimeout(() => navigate("/joblist"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to select applicant. Please try again.");
    }
  };

  // Background and card styling
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const contentStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "2rem",
    borderRadius: "15px",
    color: "white",
    maxWidth: "1200px",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    padding: "1.5rem",
  };

  const avatarStyle = {
    backgroundColor: "#555",
    color: "white",
    fontSize: "1.5rem",
    width: "50px",
    height: "50px",
  };

  const labelStyle = {
    color: "#bbb",
    fontWeight: 500,
  };

  const textStyle = {
    color: "#ddd",
    marginBottom: "0.5rem",
  };

  const dividerStyle = {
    backgroundColor: "#444",
    margin: "10px 0",
  };

  const buttonStyle = {
    backgroundColor: "#333",
    color: "white",
    marginTop: "20px",
  };

  return (
    <div style={backgroundStyle}>
      <Toaster />
      <Container style={contentStyle}>
        <Typography variant="h4" align="center" gutterBottom>
          Applicants for Job
        </Typography>
        <RadioGroup
          value={selectedApplicantId}
          onChange={(e) => setSelectedApplicantId(e.target.value)}
        >
          <Grid container spacing={3}>
            {applicants.map((applicant) => (
              <Grid item xs={12} sm={6} md={4} key={applicant._id}>
                <Card style={cardStyle}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar style={avatarStyle}>
                        {applicant.firstName.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" style={labelStyle}>
                        {applicant.firstName} {applicant.lastName}
                      </Typography>
                    </Stack>
                    <Divider style={dividerStyle} />
                    <Typography variant="body2" style={textStyle}>
                      <strong>Email:</strong> {applicant.email}
                    </Typography>
                    <Typography variant="body2" style={textStyle}>
                      <strong>Phone:</strong> {applicant.phoneNumber}
                    </Typography>
                    <Divider style={dividerStyle} />
                    <Typography variant="body2" style={textStyle}>
                      <strong>Skills:</strong> {applicant.skills.join(", ")}
                    </Typography>
                    <Divider style={dividerStyle} />
                    <Typography variant="body2" style={textStyle}>
                      <strong>Experience:</strong>
                      {applicant.experience.map((exp, index) => (
                        <div key={index} style={{ padding: "5px 0" }}>
                          {exp.role} at {exp.company} (
                          {new Date(exp.startDate).toLocaleDateString()} -{" "}
                          {exp.endDate
                            ? new Date(exp.endDate).toLocaleDateString()
                            : "Present"}
                          )
                        </div>
                      ))}
                    </Typography>
                    <Divider style={dividerStyle} />
                    <Typography variant="body2" style={textStyle}>
                      <strong>Portfolio:</strong>
                      {applicant.portfolio.map((link, index) => (
                        <div key={index}>
                          <MuiLink
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                            style={{ color: "#bbb" }}
                          >
                            {link}
                          </MuiLink>
                        </div>
                      ))}
                    </Typography>
                    <Divider style={dividerStyle} />
                    <Typography variant="body2" style={textStyle}>
                      <strong>Social Media:</strong>
                      <Stack direction="row" spacing={1}>
                        <MuiLink
                          href={applicant.socialMedia.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                          style={{ color: "#bbb" }}
                        >
                          LinkedIn
                        </MuiLink>

                        <MuiLink
                          href={applicant.socialMedia.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                          style={{ color: "#bbb" }}
                        >
                          GitHub
                        </MuiLink>
                      </Stack>
                    </Typography>
                    <Divider style={dividerStyle} />
                    <FormControlLabel
                      value={applicant._id}
                      control={<Radio style={{ color: "white" }} />}
                      label="Select"
                      style={labelStyle}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <Button
          variant="contained"
          style={buttonStyle}
          onClick={handleSelectApplicant}
        >
          Confirm Selection
        </Button>
      </Container>
    </div>
  );
};

export default JobApplicants;
