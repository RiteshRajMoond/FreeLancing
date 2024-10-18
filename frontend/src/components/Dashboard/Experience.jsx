import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const Experience = () => {
  const [experiences, setExperience] = useState([
    {
      experience: [
        {
          role: "Developer",
          company: "XYZ Inc.",
          startDate: "01-01-2020",
          endDate: "12-31-2022",
          description: "Worked on various web applications.",
        },
      ],
      skills: ["React", "Node.js", "MongoDB"],
      portfolio: ["https://portfolio1.com", "https://portfolio2.com"],
      projects: [
        {
          name: "Project1",
          description: "A web app for task management",
          startDate: "01-01-2021",
          endDate: "06-30-2021",
          skills: ["React", "Express", "MongoDB"],
        },
      ],
      certifications: [
        {
          name: "Certification1",
          issuingOrganization: "Org2",
          issuedDate: "01-01-2022",
          expirationDate: "01-01-2025",
        },
      ],
    },
  ]);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Experience-related handlers
  const handleExperienceChange = (expIndex, roleIndex, field, value) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].experience[roleIndex][field] = value;
    setExperience(updatedExperience);
  };

  const addRoleToExperience = (expIndex) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].experience.push({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setExperience(updatedExperience);
  };

  const deleteRoleFromExperience = (expIndex, roleIndex) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].experience = updatedExperience[
      expIndex
    ].experience.filter((_, i) => i !== roleIndex);
    setExperience(updatedExperience);
  };

  // Certification-related handlers
  const handleCertificationChange = (expIndex, certIndex, field, value) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].certifications[certIndex][field] = value;
    setExperience(updatedExperience);
  };

  const addCertification = (expIndex) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].certifications.push({
      name: "",
      issuingOrganization: "",
      issuedDate: "",
      expirationDate: "",
    });
    setExperience(updatedExperience);
  };

  const deleteCertification = (expIndex, certIndex) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].certifications = updatedExperience[
      expIndex
    ].certifications.filter((_, i) => i !== certIndex);
    setExperience(updatedExperience);
  };

  // Project-related handlers
  const handleProjectChange = (expIndex, projIndex, field, value) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].projects[projIndex][field] = value;
    setExperience(updatedExperience);
  };

  const addProject = (expIndex) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].projects.push({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      skills: [],
    });
    setExperience(updatedExperience);
  };

  const deleteProject = (expIndex, projIndex) => {
    const updatedExperience = [...experiences];
    updatedExperience[expIndex].projects = updatedExperience[
      expIndex
    ].projects.filter((_, i) => i !== projIndex);
    setExperience(updatedExperience);
  };

  return (
    <>
      {!editMode ? (
        <Stack spacing={3}>
          {experiences.map((exp, index) => (
            <Stack
              key={index}
              spacing={2}
              style={{
                backgroundColor: "#f9f9f9",
                padding: 16,
                color: "black",
              }}
            >
              {exp.experience.map((role, roleIndex) => (
                <Stack key={roleIndex} spacing={1}>
                  <Typography variant="h6">{role.role}</Typography>
                  <Typography variant="body1">
                    <strong>Company:</strong> {role.company}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Dates:</strong> {role.startDate} - {role.endDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Description:</strong> {role.description}
                  </Typography>
                  <Divider />
                </Stack>
              ))}
              <Typography variant="body1">
                <strong>Skills:</strong> {exp.skills.join(", ")}
              </Typography>
              <Typography variant="body1">
                <strong>Portfolio:</strong> {exp.portfolio.join(", ")}
              </Typography>
              <Divider />
              <Typography variant="h6">Projects</Typography>
              {exp.projects.map((project, projIndex) => (
                <Stack key={projIndex} spacing={1}>
                  <Typography variant="body1">
                    <strong>Project Name:</strong> {project.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Description:</strong> {project.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Dates:</strong> {project.startDate} -{" "}
                    {project.endDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Skills:</strong> {project.skills.join(", ")}
                  </Typography>
                </Stack>
              ))}
              <Divider />
              <Typography variant="h6">Certifications</Typography>
              {exp.certifications.map((cert, certIndex) => (
                <Stack key={certIndex} spacing={1}>
                  <Typography variant="body1">
                    <strong>Name:</strong> {cert.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Issuing Organization:</strong>{" "}
                    {cert.issuingOrganization}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Issued Date:</strong> {cert.issuedDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Expiration Date:</strong> {cert.expirationDate}
                  </Typography>
                </Stack>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={toggleEditMode}
              >
                Edit Experience
              </Button>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Stack spacing={2}>
          {experiences.map((exp, expIndex) => (
            <Stack
              key={expIndex}
              spacing={2}
              style={{ backgroundColor: "white", padding: 16 }}
            >
              {exp.experience.map((role, roleIndex) => (
                <Stack key={roleIndex} spacing={2}>
                  <TextField
                    label="Role"
                    value={role.role}
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        roleIndex,
                        "role",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Company"
                    value={role.company}
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        roleIndex,
                        "company",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Start Date"
                    value={role.startDate}
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        roleIndex,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="End Date"
                    value={role.endDate}
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        roleIndex,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Description"
                    multiline
                    value={role.description}
                    onChange={(e) =>
                      handleExperienceChange(
                        expIndex,
                        roleIndex,
                        "description",
                        e.target.value
                      )
                    }
                  />
                  <IconButton
                    onClick={() =>
                      deleteRoleFromExperience(expIndex, roleIndex)
                    }
                  >
                    <Delete />
                  </IconButton>
                  <Divider />
                </Stack>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => addRoleToExperience(expIndex)}
              >
                Add Role
              </Button>

              <Divider />
              <Typography variant="h6">Projects</Typography>
              {exp.projects.map((project, projIndex) => (
                <Stack key={projIndex} spacing={2}>
                  <TextField
                    label="Project Name"
                    value={project.name}
                    onChange={(e) =>
                      handleProjectChange(
                        expIndex,
                        projIndex,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Description"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(
                        expIndex,
                        projIndex,
                        "description",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Start Date"
                    value={project.startDate}
                    onChange={(e) =>
                      handleProjectChange(
                        expIndex,
                        projIndex,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="End Date"
                    value={project.endDate}
                    onChange={(e) =>
                      handleProjectChange(
                        expIndex,
                        projIndex,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Skills"
                    value={project.skills.join(", ")}
                    onChange={(e) =>
                      handleProjectChange(
                        expIndex,
                        projIndex,
                        "skills",
                        e.target.value.split(", ")
                      )
                    }
                  />
                  <IconButton
                    onClick={() => deleteProject(expIndex, projIndex)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => addProject(expIndex)}
              >
                Add Project
              </Button>

              <Divider />
              <Typography variant="h6">Certifications</Typography>
              {exp.certifications.map((cert, certIndex) => (
                <Stack key={certIndex} spacing={2}>
                  <TextField
                    label="Certification Name"
                    value={cert.name}
                    onChange={(e) =>
                      handleCertificationChange(
                        expIndex,
                        certIndex,
                        "name",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Issuing Organization"
                    value={cert.issuingOrganization}
                    onChange={(e) =>
                      handleCertificationChange(
                        expIndex,
                        certIndex,
                        "issuingOrganization",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Issued Date"
                    value={cert.issuedDate}
                    onChange={(e) =>
                      handleCertificationChange(
                        expIndex,
                        certIndex,
                        "issuedDate",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Expiration Date"
                    value={cert.expirationDate}
                    onChange={(e) =>
                      handleCertificationChange(
                        expIndex,
                        certIndex,
                        "expirationDate",
                        e.target.value
                      )
                    }
                  />
                  <IconButton
                    onClick={() => deleteCertification(expIndex, certIndex)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={() => addCertification(expIndex)}
              >
                Add Certification
              </Button>
            </Stack>
          ))}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleEditMode}
          >
            Save Changes
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Experience;
