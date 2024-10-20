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
  Grid2
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import backgroundImage from "../../../assets/ac.jpg";
import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Education from "./Education";
import axios from "axios";

const sampleImages = [
  "../../../assets/ac.jpg",
  "../../../assets/profilePic.png",
  "../../../assets/profilePic.png",
];

const Dashboard = () => {
  const overallStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    width: "100vw",
    height: "100vh",
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

  const [activeSection, setActiveSection] = useState("personalInfo");
  const [imageLink, setImageLink] = useState("../../../assets/profilePic.png");
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
      console.log("User data updated successfully", resp.data);
    } catch (error) {
      console.log("Error updating user data", error);
    }
  };

  const handleImageUpdate = () => {
    setImageLink(selectedImage || imageLink); // Update the image link with the input value
    setIsEditing(false); // Exit edit mode
    setOpenModal(false); // Close the modal
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Stack sx={overallStyle}>
      <Stack direction="row">
        <img style={imgStyle} src={imageLink} alt="Profile Pic" />
        <IconButton style={editStyle} onClick={() => setOpenModal(true)}>
          <EditIcon />
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        style={{ margin: "20px auto", color: "white" }}
      >
        <Button onClick={() => handleSectionChange("personalInfo")}>
          Personal Info
        </Button>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />
        <Button onClick={() => handleSectionChange("education")}>
          Education
        </Button>
        <Divider orientation="vertical" flexItem sx={{ bgcolor: "white" }} />
        <Button onClick={() => handleSectionChange("experience")}>
          Experience
        </Button>
      </Stack>

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