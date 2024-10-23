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
  Grid2,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import backgroundImage from "../../../assets/bg6.jpg";
import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Education from "./Education";
import axios from "axios";

const sampleImages = [
  "../../../assets/PP1.jpg",
  "../../../assets/PP2.jpg",
  "../../../assets/PP3.jpg",
  "../../../assets/PP4.jpg",
  "../../../assets/PP5.jpg",
  "../../../assets/PP6.jpg",
  "../../../assets/PP7.jpg",
  "../../../assets/PP8.jpg",
  "../../../assets/PP9.jpg",
  "../../../assets/PP10.jpg",
  "../../../assets/PP11.jpg",
];

const Dashboard = () => {
  const linkStyle = {
    color: "#ff9800",
    textDecoration: "none",
  };

  const overallStyle = {
    position: "relative",  // Ensure relative positioning for overlay elements
    minHeight: "100vh",    // Ensure content takes full viewport height
    overflow: "auto",      // Allow scrolling if needed
  };

  const fixedBackgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,  // Keep the background behind other content
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

  const editStackStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",  // Semi-transparent form background
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    maxWidth: "600px",
    margin: "50px auto",
    backdropFilter: "blur(5px)",  // Optional: adds a blur effect to the background
  };

  const [activeSection, setActiveSection] = useState("personalInfo");
  const [imageLink, setImageLink] = useState("../../../assets/PP1.jpg");
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const resp = await axios.get("/user/get-user");
      setUserData(resp.data.user);
      setImageLink(resp.data.user.profilePicture || imageLink);
      console.log(resp.data.user);
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
      console.log("Image changed");
    } catch (error) {
      console.log("Error uploading image", error);
    }
  };

  const handleImageUpdate = () => {
    if (selectedImage) handleImageUpload(selectedImage);
    else selectedImage(imageLink);
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
        <Button style={linkStyle} onClick={() => handleSectionChange("personalInfo")}>
          Personal Info
        </Button>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />
        <Button style={linkStyle} onClick={() => handleSectionChange("education")}>
          Education
        </Button>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />
        <Button style={linkStyle} onClick={() => handleSectionChange("experience")}>
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
        <DialogTitle>Select an Image</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            {sampleImages.map((img, index) => (
              <Grid2 item xs={3} key={index}>
                <img
                  src={img}
                  alt={`Sample ${index + 1}`}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    borderRadius: "8px",
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              </Grid2>
            ))}
            <Grid2 item xs={12}>
              <TextField
                label="Or enter image URL"
                variant="outlined"
                fullWidth
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])} // Handle file selection
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={handleImageUpdate} color="primary">
            Update Image
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Dashboard;
