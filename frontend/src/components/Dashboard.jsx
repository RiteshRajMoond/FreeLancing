import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid2,
  Typography,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import backgroundImage from "../../assets/ac.jpg";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    username: "username",
    email: "user@example.com",
    firstName: "firstname",
    lastName: "lastname",
    profilePicture: "../../assets/profilePic.png",
    bio: "About the user",
    skills: ["Skill-1", "Skill-2", "Skill-3"],
    portfolio: ["https://johndoe.com", "https://github.com/johndoe"],
    phoneNumber: "1234567890",
    address: "123 Main Street, City, Country",
    experience: [
      {
        company: "XYZ Corp",
        role: "Developer",
        startDate: "2020-01-01",
        endDate: "2023-01-01",
        description: "Worked on full-stack applications",
      },
    ],
    education: [
      {
        institution: "ABC University",
        degree: "B.Sc. in Computer Science",
        fieldOfStudy: "Computer Science",
        startDate: "2016-09-01",
        endDate: "2020-06-01",
      },
    ],
    certifications: [
      {
        name: "AWS Certified",
        issuingOrganization: "Amazon",
        issueDate: "2021-05-01",
      },
    ],
    socialMedia: {
      linkedIn: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  });

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleArrayChange = (e, field, index) => {
    const updatedArray = [...userData[field]];
    updatedArray[index] = e.target.value;
    setUserData({ ...userData, [field]: updatedArray });
  };

  const addArrayItem = (field) => {
    const updatedArray = [...userData[field], ""];
    setUserData({ ...userData, [field]: updatedArray });
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = userData[field].filter((_, i) => i !== index);
    setUserData({ ...userData, [field]: updatedArray });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const overallStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    width: "100vw",
    height: "100vh",
    // filter: "blur(5px)"   add it to the image only not complete page's style
  };
  return (
    <Box sx={overallStyle}>
      <Stack>
        <Stack style={{ marginLeft: "44vw" }}>
          <img
            src={userData.profilePicture}
            alt="Profile"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              marginLeft: "1.5vw",
            }}
          />
          <Typography variant="h5">
            {userData.firstName} {userData.lastName}
          </Typography>
        </Stack>
        <Grid2>
          {!editMode ? (
            <>
            <Stack>
              <Typography variant="body1">{userData.bio}</Typography>
              <Typography variant="body2"><strong>Username:</strong> {userData.username}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {userData.email}</Typography>
              <Typography variant="body2"><strong>Phone Number:</strong> {userData.phoneNumber}</Typography>
              <Typography variant="body2"><strong>Address:</strong> {userData.address}</Typography>
              <Typography variant="body2"><strong>Skills:</strong> {userData.skills.join(', ')}</Typography>
              <Typography variant="body2"><strong>Portfolio:</strong> {userData.portfolio.join(', ')}</Typography>
              <Typography variant="body2"><strong>LinkedIn:</strong> {userData.socialMedia.linkedIn}</Typography>
              <Typography variant="body2"><strong>GitHub:</strong> {userData.socialMedia.github}</Typography>
              <Typography variant="body2"><strong>Instagram:</strong> {userData.socialMedia.instagram}</Typography>

              <Grid2 container>
              <div>
              <Typography variant="h6" sx={{ mt: 3 }}>Experience</Typography>
              {userData.experience.map((exp, index) => (
                <div key={index}>
                  <Typography variant="body2"><strong>Company:</strong> {exp.company}</Typography>
                  <Typography variant="body2"><strong>Role:</strong> {exp.role}</Typography>
                  <Typography variant="body2"><strong>Duration:</strong> {exp.startDate} to {exp.endDate || "Present"}</Typography>
                  <Typography variant="body2"><strong>Description:</strong> {exp.description}</Typography>
                </div>
              ))}
              </div>

              <div>
              <Typography variant="h6" sx={{ mt: 3 }}>Education</Typography>
              {userData.education.map((edu, index) => (
                <div key={index}>
                  <Typography variant="body2"><strong>Institution:</strong> {edu.institution}</Typography>
                  <Typography variant="body2"><strong>Degree:</strong> {edu.degree}</Typography>
                  <Typography variant="body2"><strong>Field of Study:</strong> {edu.fieldOfStudy}</Typography>
                  <Typography variant="body2"><strong>Duration:</strong> {edu.startDate} to {edu.endDate || "Present"}</Typography>
                </div>
              ))}
              </div>

              </Grid2>
              </Stack>

              <Button variant="contained" color="primary" onClick={toggleEditMode}>
                Edit
              </Button>
            </>
          ) : (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Edit Details</Typography>
              <form>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={userData.bio}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Profile Picture"
                  name="profilePicture"
                  value={userData.profilePicture}
                  placeholder="https://somesite/profilePic"
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  sx={{ mt: 2 }}
                />

                {/* Skills Editable */}
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Skills
                </Typography>
                {userData.skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      fullWidth
                      value={skill}
                      onChange={(e) => handleArrayChange(e, "skills", index)}
                      sx={{ mt: 2, mr: 1 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeArrayItem("skills", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addArrayItem("skills")}
                  sx={{ mt: 2 }}
                >
                  Add Skill
                </Button>

                {/* Portfolio Editable */}
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Portfolio
                </Typography>
                {userData.portfolio.map((port, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      fullWidth
                      value={port}
                      onChange={(e) => handleArrayChange(e, "portfolio", index)}
                      sx={{ mt: 2, mr: 1 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeArrayItem("portfolio", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addArrayItem("portfolio")}
                  sx={{ mt: 2 }}
                >
                  Add Portfolio Item
                </Button>

                {/* Experience Editable */}
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Experience
                </Typography>
                {userData.experience.map((exp, index) => (
                  <div key={index}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleArrayChange(e, "experience", index, "company")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Role"
                      value={exp.role}
                      onChange={(e) =>
                        handleArrayChange(e, "experience", index, "role")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleArrayChange(e, "experience", index, "startDate")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="End Date"
                      type="date"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleArrayChange(e, "experience", index, "endDate")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={exp.description}
                      onChange={(e) =>
                        handleArrayChange(e, "experience", index, "description")
                      }
                      sx={{ mt: 2 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeArrayItem("experience", index)}
                      sx={{ mt: 1 }}
                    >
                      Remove Experience
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addArrayItem("experience")}
                  sx={{ mt: 2 }}
                >
                  Add Experience
                </Button>

                {/* Education Editable */}
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Education
                </Typography>
                {userData.education.map((edu, index) => (
                  <div key={index}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) =>
                        handleArrayChange(e, "education", index, "institution")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleArrayChange(e, "education", index, "degree")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Field of Study"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleArrayChange(e, "education", index, "fieldOfStudy")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleArrayChange(e, "education", index, "startDate")
                      }
                      sx={{ mt: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="End Date"
                      type="date"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleArrayChange(e, "education", index, "endDate")
                      }
                      sx={{ mt: 2 }}
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeArrayItem("education", index)}
                      sx={{ mt: 1 }}
                    >
                      Remove Education
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addArrayItem("education")}
                  sx={{ mt: 2 }}
                >
                  Add Education
                </Button>

                {/* Social Media Editable */}
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Social Media
                </Typography>
                <TextField
                  fullWidth
                  label="LinkedIn"
                  name="linkedIn"
                  value={userData.socialMedia.linkedIn}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      socialMedia: {
                        ...userData.socialMedia,
                        linkedIn: e.target.value,
                      },
                    });
                  }}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="GitHub"
                  name="github"
                  value={userData.socialMedia.github}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      socialMedia: {
                        ...userData.socialMedia,
                        github: e.target.value,
                      },
                    });
                  }}
                  sx={{ mt: 2 }}
                />
                <TextField
                  fullWidth
                  label="Instagram"
                  name="instagram"
                  value={userData.socialMedia.instagram}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      socialMedia: {
                        ...userData.socialMedia,
                        instagram: e.target.value,
                      },
                    });
                  }}
                  sx={{ mt: 2 }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleEditMode}
                  sx={{ mt: 3 }}
                >
                  Save
                </Button>
              </form>
            </Paper>
          )}
        </Grid2>
      </Stack>
    </Box>
  );
};

export default Dashboard;
