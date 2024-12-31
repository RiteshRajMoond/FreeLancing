import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

const Education = ({ userData, handleSave }) => {
  const [educationData, setEducationData] = useState(userData?.education || []);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEducationData(
      userData?.education || [
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
        },
      ]
    );
  }, [userData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...educationData];
    updatedEducation[index][field] = value;
    setEducationData(updatedEducation);
  };

  const addEducation = () => {
    setEducationData((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const deleteEducation = (index) => {
    const updatedEducation = [...educationData];
    updatedEducation.splice(index, 1);
    setEducationData(updatedEducation);
  };

  const handleSaveEducation = () => {
    handleSave({ ...userData, education: educationData });
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
    textAlign: "center",
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
  const dividerStyle = {
    backgroundColor: "white",
    margin: "10px 0",
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

  const textFieldStyle = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2b2b2b", // Default outline color
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2b2b2b", // Outline color when focused
    },
    "& .MuiInputLabel-root": {
      color: "#2b2b2b", // Default label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2b2b2b", // Label color when focused
    },

    marginTop: "10px",
    width: "480px",
  };

  return (
    <Stack style={stackStyle} spacing={2}>
      {!editMode ? (
        <>
          {educationData.map((edu, index) => (
            <Stack key={index} spacing={1}>
              <Typography variant="h5">🎓{edu.degree}</Typography>
              <Typography variant="body2">
                <strong>From:</strong> {edu.institution || ""}{" "}
              </Typography>
              <Typography variant="body2">
                <strong>In:</strong> {edu.fieldOfStudy || ""}{" "}
              </Typography>
              <Typography variant="body2">
                <strong>Duration: </strong>
                {new Date(edu.startDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                })}{" "}
                -{" "}
                {new Date(edu.endDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                })}
              </Typography>
              <Divider style={dividerStyle} />
            </Stack>
          ))}
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={toggleEditMode}
          >
            Edit Education
          </Button>
        </>
      ) : (
        <>
          {educationData.map((edu, index) => (
            <Stack style={editStackStyle}>
              <h5 style={{ color: "black" }}>Education {index + 1}:</h5>
              <TextField
                label="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
                sx={textFieldStyle}
              />
              <TextField
                label="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
                sx={textFieldStyle}
              />
              <TextField
                label="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  handleEducationChange(index, "fieldOfStudy", e.target.value)
                }
                sx={textFieldStyle}
              />
              <TextField
                label="Start Date"
                value={edu.startDate}
                onChange={(e) =>
                  handleEducationChange(index, "startDate", e.target.value)
                }
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="End Date"
                value={edu.endDate}
                onChange={(e) =>
                  handleEducationChange(index, "endDate", e.target.value)
                }
                sx={textFieldStyle}
              />
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => deleteEducation(index)}
              >
                <Delete style={{ color: "black" }} />
              </IconButton>
            </Stack>
          ))}

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addEducation}
            style={buttonStyle}
          >
            Add Education
          </Button>
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={handleSaveEducation}
          >
            Save Education
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Education;
