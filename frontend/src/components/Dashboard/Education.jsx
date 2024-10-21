import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

const Education = ({ userData, handleSave }) => { 
  const [educationData, setEducationData] = useState(userData?.education || []);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEducationData(userData?.education || []);
  }, [userData]);

  // Toggle between edit and non-edit modes
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Handle changes to individual education fields
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...educationData]; // Use educationData instead of userData.education
    updatedEducation[index][field] = value;
    setEducationData(updatedEducation);
  };

  // Add a new blank education entry
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

  // Delete an education entry based on the index
  const deleteEducation = (index) => {
    const updatedEducation = [...educationData]; // Use educationData instead of userData.education
    updatedEducation.splice(index, 1);
    setEducationData(updatedEducation);
  };

  const handleSaveEducation = () => {
    handleSave({ ...userData, education: educationData }); 
    setEditMode(false);
  };

  return (
    <>
      {!editMode ? (
        <Stack style={{ backgroundColor: "white", color: "black" }} spacing={2}>
          {educationData.map((edu, index) => (
            <Stack key={index} spacing={1}>
              <Typography variant="h6">{edu.degree}</Typography>
              <Typography variant="body1">{edu.institution}</Typography>
              <Typography variant="body1">{edu.fieldOfStudy}</Typography>{" "}
              {/* Displaying field of study */}
              <Typography variant="body2">
                {edu.startDate} - {edu.endDate}
              </Typography>
            </Stack>
          ))}
          <Button variant="contained" color="primary" onClick={toggleEditMode}>
            Edit Education
          </Button>
        </Stack>
      ) : (
        <Stack style={{ backgroundColor: "white" }} spacing={2}>
          {educationData.map((edu, index) => (
            <Stack spacing={2} key={index} direction="row" alignItems="center">
              <Stack spacing={2} style={{ flex: 1 }}>
                <TextField
                  label="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                />
                <TextField
                  label="Institution"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                />
                <TextField
                  label="Field of Study" // Editable field for field of study
                  value={edu.fieldOfStudy}
                  onChange={(e) =>
                    handleEducationChange(index, "fieldOfStudy", e.target.value)
                  }
                />
                <TextField
                  label="Start Date"
                  value={edu.startDate}
                  onChange={(e) =>
                    handleEducationChange(index, "startDate", e.target.value)
                  }
                />
                <TextField
                  label="End Date"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleEducationChange(index, "endDate", e.target.value)
                  }
                />
              </Stack>
              {/* Delete button for each education entry */}
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => deleteEducation(index)}
              >
                <Delete />
              </IconButton>
            </Stack>
          ))}
          {/* Button to add new education entry */}
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={addEducation}
          >
            Add Education
          </Button>
          <Button variant="contained" color="primary" onClick={handleSaveEducation}> {/* Call handleSaveEducation */}
            Save Education
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Education;