import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Stack, Divider } from "@mui/material";

const PersonalInfo = ({ userData, handleSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData || {});

  // Add demo data for styling
  useEffect(() => {
    setLocalUserData(
      userData || {
        firstName: "Nitasha",
        lastName: "Smith",
        bio: "I am a software engineer with 5 years of experience.",
        phoneNumber: "1234567890",
        address: "123 Main St, Street 12, SantaRosa",
        socialMedia: {
          linkedIn: "https://www.linkedIn.com/Nitasha-smith",
          github: "https://www.github.com/Nitasha-smith",
          instagram: "https://www.instagram.com/Nitasha-smith",
        },
      }
    );
  }, [userData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSavePersonalInfo = async () => {
    await handleSave(localUserData);
    setLocalUserData(localUserData);
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
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color:"white",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    backdropFilter: "blur(5px)",
  };

  const dividerStyle = {
    backgroundColor: "white",
    margin: "10px 0",
  };

  const buttonStyle = {
    borderRadius:"15px",
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const linkStyle = {
    color: "#ff9800",
    textDecoration: "none",
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2b2b2b", // Default outline color
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a5a5a5", // Outline color when focused
    },
    "& .MuiInputLabel-root": {
      color: "#2b2b2b", // Default label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#a5a5a5", // Label color when focused
    },
  };
  
  return (
    <>
      {!editMode ? (
        <Stack style={stackStyle} spacing={2}>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }} variant="h5">
            {localUserData.firstName || ""} {localUserData.lastName || ""}
          </Typography>
          <Typography variant="body2" style={textStyle}>
            <strong>Bio:</strong> {localUserData.bio || ""}
          </Typography>
          <Divider style={dividerStyle} />
          <Typography variant="body2" style={textStyle}>
            <strong>Phone Number:</strong> {localUserData.phoneNumber || ""}
          </Typography>
          <Typography variant="body2" style={textStyle}>
            <strong>Address:</strong> {localUserData.address || ""}
          </Typography>
          <Divider style={dividerStyle} />
          <Typography variant="body2" style={textStyle}>
            <strong>LinkedIn:</strong>{" "}
            <a href={localUserData.socialMedia?.linkedIn || "#"} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {localUserData.socialMedia?.linkedIn || ""}
            </a>
          </Typography>
          <Typography variant="body2" style={textStyle}>
            <strong>GitHub:</strong>{" "}
            <a href={localUserData.socialMedia?.github || "#"} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {localUserData.socialMedia?.github || ""}
            </a>
          </Typography>
          <Typography variant="body2" style={textStyle}>
            <strong>Instagram:</strong>{" "}
            <a href={localUserData.socialMedia?.instagram || "#"} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {localUserData.socialMedia?.instagram || ""}
            </a>
          </Typography>
          <Button variant="contained" style={buttonStyle} onClick={toggleEditMode}>
            Edit
          </Button>
        </Stack>
      ) : (
        <Stack style={editStackStyle} spacing={2}>
          <TextField sx={textFieldStyle} label="First Name" value={localUserData.firstName || ""} onChange={(e) =>setLocalUserData({ ...localUserData, firstName: e.target.value })} fullWidth variant="outlined"  />
          <TextField sx={textFieldStyle} label="Last Name" value={localUserData.lastName || ""} onChange={(e) =>setLocalUserData({ ...localUserData, lastName: e.target.value })} fullWidth variant="outlined"  />
          <TextField sx={textFieldStyle} label="Bio" value={localUserData.bio || ""} onChange={(e) =>setLocalUserData({ ...localUserData, bio: e.target.value })} fullWidth variant="outlined" />
          <TextField sx={textFieldStyle} label="Phone Number" value={localUserData.phoneNumber || ""} onChange={(e) =>setLocalUserData({...localUserData,phoneNumber: e.target.value}) } fullWidth variant="outlined"/>
          <TextField sx={textFieldStyle} label="Address" value={localUserData.address || ""} onChange={(e) =>setLocalUserData({ ...localUserData, address: e.target.value }) } fullWidth variant="outlined"/>
          <TextField sx={textFieldStyle} label="LinkedIn" value={localUserData.socialMedia?.linkedIn || ""} onChange={(e) =>setLocalUserData({...localUserData,socialMedia: {...localUserData.socialMedia, linkedIn: e.target.value,},})} fullWidth variant="outlined"/>
          <TextField sx={textFieldStyle} label="GitHub" value={localUserData.socialMedia?.github || ""} onChange={(e) =>setLocalUserData({...localUserData,socialMedia: {...localUserData.socialMedia, github: e.target.value,},})} fullWidth variant="outlined"/>
          <TextField sx={textFieldStyle} label="Instagram" value={localUserData.socialMedia?.instagram || ""} onChange={(e) =>setLocalUserData({...localUserData,socialMedia: {...localUserData.socialMedia, instagram: e.target.value,},})} fullWidth variant="outlined"/>
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={handleSavePersonalInfo}
          >
            Save
          </Button>
        </Stack>
      )}
    </>
  );
};

export default PersonalInfo;
