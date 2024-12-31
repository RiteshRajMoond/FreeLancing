import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Box,
  IconButton,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import backgroundImage from "../../../assets/d6.webp"; 
import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Education from "./Education";
import axios from "axios";
import { Filter } from "@mui/icons-material";

const Dashboard = () => {
  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  const overallStyle = {
    position: "relative", // Ensure relative positioning for overlay elements
    minHeight: "100vh", // Ensure content takes full viewport height
    overflow: "auto", // Allow scrolling if needed
  };

  const fixedBackgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg6.jpg?alt=media&token=0ca7dd55-a193-4c80-948f-4b5f2bf8cf9f)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1, // Keep the background behind other content,
    filter: 'blur(5px)'
  };

  const imgStyle = {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    margin: "auto 0px 0px 45.5%",
  };

  const editStyle = {
    margin: "75px auto 0px 0px",
    color: "white",
    "&:hover": { color: "white" },
  };

  const dialogStyle = {
    background: "linear-gradient(360deg,rgb(112, 144, 135),rgb(152, 193, 167),rgb(158, 210, 221))",
    border: "1px solid white",
    borderRadius: "12px",
    color: "white",
  };

  const textFieldStyle = {
    background: "transparent",
    marginTop: "15px",
    input: {
      color: "#000",
    },
  };

  const buttonStyle = {
    color: "white",
    fontWeight: "bold",
    borderRadius: "10px",
    textTransform: "none",
  };

  const [activeSection, setActiveSection] = useState("personalInfo");
  const [imageLink, setImageLink] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const resp = await axios.get("/user/get-user");
      setUserData(resp.data.user);
      setImageLink(resp.data.user.profilePicture || "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const resp = await axios.post("/user/update-user", updatedData);
      setUserData(resp.data.user);
    } catch (error) {
      console.log("Error updating user data", error);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const resp = await axios.post("/user/upload-image-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageLink(resp.data.url);
    } catch (error) {
      console.log("Error uploading image", error);
    }
  };

  const handleImageUpdate = () => {
    if (selectedImage) handleImageUpload(selectedImage);
    setIsEditing(false); // Exit edit mode
    setOpenModal(false); // Close the modal
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Stack sx={overallStyle}>
      {/* Fixed Background */}
      <Box sx={fixedBackgroundStyle} />

      {/* Profile Section */}
      <Stack sx={{ marginTop: "10px" }} direction="row">
        <img style={imgStyle} src={imageLink} alt="Profile Pic" />
        <IconButton style={editStyle} onClick={() => setOpenModal(true)}>
          <EditIcon />
        </IconButton>
      </Stack>

      {/* Section Buttons */}
      <Stack
        direction="row"
        spacing={2}
        style={{ margin: "20px auto", color: "white" }}
      >
        <Button
          style={linkStyle}
          onClick={() => handleSectionChange("personalInfo")}
        >
          Personal Info
        </Button>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />
        <Button
          style={linkStyle}
          onClick={() => handleSectionChange("education")}
        >
          Education
        </Button>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />
        <Button
          style={linkStyle}
          onClick={() => handleSectionChange("experience")}
        >
          Experience
        </Button>
      </Stack>

      {/* Content Section */}
      <Box>
        {activeSection === "personalInfo" && (
          <PersonalInfo userData={userData} handleSave={handleSave} />
        )}
        {activeSection === "education" && (
          <Education userData={userData} handleSave={handleSave} />
        )}
        {activeSection === "experience" && (
          <Experience userData={userData} handleSave={handleSave} />
        )}
      </Box>

      {/* Image Selection Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <Stack sx={dialogStyle}>
          <DialogTitle style={{ textAlign: "center" }}>
            Upload an Image
          </DialogTitle>
          <DialogContent>
            <TextField
              type="file"
              accept="image/*"
              fullWidth
              onChange={(e) => setSelectedImage(e.target.files[0])}
              sx={textFieldStyle}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenModal(false)}
              sx={{ ...buttonStyle, backgroundColor: "#444" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImageUpdate}
              sx={{ ...buttonStyle, backgroundColor: "teal" }}
            >
              Update Image
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default Dashboard;
