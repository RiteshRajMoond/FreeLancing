import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
} from "@mui/material";

const JobApplicants = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const jobId = query.get("jobId");
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("/user/job/job-applicants", {
          params: { jobId }, // Send jobId as a query parameter
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
      alert("Please select an applicant.");
      return;
    }

    try {
      const response = await axios.post("/user/job/select-applicant", {
        jobId,
        applicantId: selectedApplicantId,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to select applicant. Please try again.");
    }
  };

  return (
    <Container>
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
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>{applicant.firstName.charAt(0)}</Avatar>
                    <Typography variant="h6">
                      {applicant.firstName} {applicant.lastName}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">{applicant.email}</Typography>
                  <Typography variant="body2">{applicant.phoneNumber}</Typography>
                  <Typography variant="body2">
                    <strong>Skills:</strong> {applicant.skills.join(", ")}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Experience:</strong>
                    {applicant.experience.map((exp, index) => (
                      <div key={index}>
                        {exp.role} at {exp.company} (
                        {new Date(exp.startDate).toLocaleDateString()} -{" "}
                        {exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString()
                          : "Present"}
                        )
                      </div>
                    ))}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Portfolio:</strong>
                    {applicant.portfolio.map((link, index) => (
                      <div key={index}>
                        <MuiLink
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link}
                        </MuiLink>
                      </div>
                    ))}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Social Media:</strong>
                    <div>
                      <MuiLink
                        href={applicant.socialMedia.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </MuiLink>
                    </div>
                    <div>
                      <MuiLink
                        href={applicant.socialMedia.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </MuiLink>
                    </div>
                  </Typography>
                  <FormControlLabel
                    value={applicant._id}
                    control={<Radio />}
                    label="Select"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSelectApplicant}
        style={{ marginTop: "20px" }}
      >
        Confirm Selection
      </Button>
    </Container>
  );
};

export default JobApplicants;