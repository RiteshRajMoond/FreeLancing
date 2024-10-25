import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const UserProfile = ({ userData, handleSave }) => {
  const [experienceData, setExperienceData] = useState(userData?.experience || []);
  const [certificationData, setCertificationData] = useState(userData?.certifications || []);
  const [projectData, setProjectData] = useState(userData?.projects || []);
  const [skills, setSkills] = useState(userData?.skills || []);
  const [portfolio, setPortfolio] = useState(userData?.portfolio || "");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setExperienceData(userData?.experience || [
      { role: "Software Engineer", company: "Tech Corp", startDate: "Jan 2020", endDate: "Present", description: "" },
      { role: "Frontend Developer", company: "Web Solutions", startDate: "Jan 2019", endDate: "Dec 2019", description: "" },
    ]);
    setCertificationData(userData?.certifications || [
      { name: "Certified JavaScript Developer", issuingOrganization: "XYZ Institute", issueDate: "Mar 2020", expirationDate: "Mar 2023" },
      { name: "React Certification", issuingOrganization: "ABC Academy", issueDate: "Jan 2021", expirationDate: "Jan 2024" },
    ]);
    setProjectData(userData?.projects || [
      { name: "Project A", description: "Description of Project A", startDate: "Jan 2021", endDate: "Dec 2021", link :"",skills:[]  },
      { name: "Project B", description: "Description of Project B", startDate: "Jan 2022", endDate: "Dec 2022", link :"",skills:[] },
    ]);
    setSkills(userData?.skills || ["JavaScript", "React", "Node.js", "CSS", "HTML"]);
    setPortfolio(userData?.portfolio || "https://myportfolio.com");
  }, [userData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experienceData];
    updatedExperience[index][field] = value;
    setExperienceData(updatedExperience);
  };

  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...certificationData];
    updatedCertifications[index][field] = value;
    setCertificationData(updatedCertifications);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projectData];
    updatedProjects[index][field] = value;
    setProjectData(updatedProjects);
  };

  const addExperience = () => {
    setExperienceData((prev) => [
      ...prev,
      { role: "", company: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const addCertification = () => {
    setCertificationData((prev) => [
      ...prev,
      { name: "", issuingOrganization: "", issueDate: "", expirationDate: "" },
    ]);
  };

  const addProject = () => {
    setProjectData((prev) => [
      ...prev,
      { name: "", description: "", startDate: "", endDate: "", link :"" ,skills:[] },
    ]);
  };

  const deleteExperience = (index) => {
    const updatedExperience = [...experienceData];
    updatedExperience.splice(index, 1);
    setExperienceData(updatedExperience);
  };

  const deleteCertification = (index) => {
    const updatedCertifications = [...certificationData];
    updatedCertifications.splice(index, 1);
    setCertificationData(updatedCertifications);
  };

  const deleteProject = (index) => {
    const updatedProjects = [...projectData];
    updatedProjects.splice(index, 1);
    setProjectData(updatedProjects);
  };

  const handleSaveProfile = () => {
    handleSave({
      ...userData,
      experience: experienceData,
      certifications: certificationData,
      projects: projectData,
      skills: skills,
      portfolio: portfolio,
    });
    setEditMode(false);
  };

  const stackStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    maxWidth: "600px",
    textAlign: "left",
  };

  const textStyle = {
    color: "#ffffff",
  };

  const editStackStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "white",
    margin: "20px",
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
    display: "grid",
    justifyContent: "space-around",
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2b2b2b",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2b2b2b",
    },
    "& .MuiInputLabel-root": {
      color: "#2b2b2b",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2b2b2b",
    },
    marginTop: "10px",
    width: "480px",
  };

  const buttonStyle = {
    borderRadius: "15px",
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const dividerStyle = {
    backgroundColor: "white",
    margin: "10px 0",
  };

  return (
    <Stack style={stackStyle} spacing={2}>
      {!editMode ? (
        <>
          <Typography style={{textAlign:"center"}} variant="h5">✔️Experiences</Typography>
          {experienceData.map((exp, index) => (
            <Stack key={index} spacing={1}>
              <Typography style={{fontWeight:"bold"}} variant="h6">• {exp.role} at {exp.company}</Typography>
              <Typography variant="body2"><strong>Duration: </strong> 
              {new Date(exp.startDate).toLocaleDateString("en-IN", { year: "numeric", month: "long" })} - {new Date(exp.endDate).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
              </Typography>
              <Typography variant="body2"><strong>Description:</strong> {exp.description}</Typography>
            </Stack>
          ))}
          <Divider style={dividerStyle} />

          <Typography style={{textAlign:"center"}} variant="h5">📜Certifications</Typography>
          {certificationData.map((cert, index) => (
            <Stack key={index} spacing={1}>
              <Typography style={{fontWeight:"bold"}} variant="h6">• {cert.name}</Typography>
              <Typography variant="body2"><strong>Issued By: </strong> {cert.issuingOrganization}</Typography>
              <Typography variant="body2"><strong>Issued Date: </strong> {new Date(cert.startDate).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}</Typography>
              <Typography variant="body2"><strong>Expiration Date: </strong> {new Date(cert.endDate).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}</Typography>
            </Stack>
          ))}
          <Divider style={dividerStyle} />

          <Typography style={{textAlign:"center"}} variant="h5">🗂️Projects</Typography>
          {projectData.map((proj, index) => (
            <Stack key={index} spacing={1}>
              <Typography style={{fontWeight:"bold"}} variant="h6">• {proj.name}</Typography>
              <Typography variant="body2"><strong>Description:</strong> {proj.description}</Typography>
              <Typography variant="body2"><strong>Duration: </strong> 
              {new Date(proj.startDate).toLocaleDateString("en-IN", { year: "numeric", month: "long" })} - {new Date(proj.endDate).toLocaleDateString("en-IN", { year: "numeric", month: "long" })}
              </Typography>
            </Stack>
          ))}
          <Divider style={dividerStyle} />

          <Typography style={{textAlign:"center"}} variant="h5">💻Skills</Typography>
          <Typography variant="body1">{skills.join(', ')}</Typography>

          <Typography style={{textAlign:"center"}} variant="h5">📊Portfolio</Typography>
          <Typography variant="body1">{portfolio}</Typography>

          <Button variant="contained" style={buttonStyle} onClick={toggleEditMode}>
            Edit Profile
          </Button>
        </>
      ) : (
        <>

          <Typography variant="h5">Edit Experiences</Typography>
          {experienceData.map((exp, index) => (
            <Stack style={editStackStyle} key={index} spacing={1}>
              <TextField
                label="Role"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Start Date"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="End Date"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                sx={textFieldStyle}
              />
              <IconButton onClick={() => deleteExperience(index)} color="error">
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button variant="contained" style={buttonStyle} onClick={addExperience}>
            Add Experience
          </Button>
          <Divider style={dividerStyle} />

          <Typography variant="h5">Edit Certifications</Typography>
          {certificationData.map((cert, index) => (
            <Stack style={editStackStyle} key={index} spacing={1}>
              <TextField
                label="Certification Name"
                value={cert.name}
                onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Issuing Organization"
                value={cert.issuingOrganization}
                onChange={(e) => handleCertificationChange(index, "issuingOrganization", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Issued Date"
                value={cert.issuedDate}
                onChange={(e) => handleCertificationChange(index, "issuedDate", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Expiration Date"
                value={cert.expirationDate}
                onChange={(e) => handleCertificationChange(index, "expirationDate", e.target.value)}
                sx={textFieldStyle}
              />
              <IconButton onClick={() => deleteCertification(index)} color="error">
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button variant="contained" style={buttonStyle} onClick={addCertification}>
            Add Certification
          </Button>

          <Divider style={dividerStyle} />

          <Typography variant="h5">Edit Projects</Typography>
          {projectData.map((proj, index) => (
            <Stack style={editStackStyle} key={index} spacing={1}>
              <TextField
                label="Project Name"
                value={proj.name}
                onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Description"
                value={proj.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="Start Date"
                value={proj.startDate}
                onChange={(e) => handleProjectChange(index, "startDate", e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                label="End Date"
                value={proj.endDate}
                onChange={(e) => handleProjectChange(index, "endDate", e.target.value)}
                sx={textFieldStyle}
              />
              <IconButton onClick={() => deleteProject(index)} color="error">
                <Delete />
              </IconButton>
            </Stack>
          ))}
          <Button variant="contained" style={buttonStyle} onClick={addProject}>
            Add Project
          </Button>
          <Divider style={dividerStyle} />

          <Typography variant="h5">Skills & Portfolio:</Typography>
          <Stack style={editStackStyle}>
          <TextField
            label="Skills (comma separated)"
            value={skills.join(', ')}
            onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
            sx={textFieldStyle}
            />
          <TextField
            label="Portfolio Link"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            sx={textFieldStyle}
            />
            </Stack>

          <Button variant="contained" style={buttonStyle} onClick={handleSaveProfile}>
            Save Profile
          </Button>
          <Button variant="contained" style={buttonStyle} onClick={toggleEditMode}>
            Cancel
          </Button>
        </>
      )}
    </Stack>
  );
};

export default UserProfile;
