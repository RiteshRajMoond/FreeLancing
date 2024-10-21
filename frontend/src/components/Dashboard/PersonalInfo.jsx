import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Stack, Divider, CircularProgress } from "@mui/material";
import axios from "axios";

const PersonalInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/user/get-user"); // Update the API endpoint as needed
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle updates (you would make an API call to update the data here)
  const handleSave = async () => {
    try {
      await axios.post("/user/update-user", userData); // Update with the correct API endpoint
      toggleEditMode();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!userData) {
    return <Typography>No user data available.</Typography>;
  }

  return (
    <>
      {!editMode ? (
        <Stack
          style={{ backgroundColor: "white", color: "black", padding: 16 }}
          spacing={2}
        >
          <Typography variant="h5">
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Bio:</strong> {userData.bio}
          </Typography>
          <Divider />
          <Typography variant="body2">
            <strong>Phone Number:</strong> {userData.phoneNumber}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {userData.address}
          </Typography>
          <Typography variant="body2">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={userData.socialMedia.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.socialMedia.linkedIn}
            </a>
          </Typography>
          <Typography variant="body2">
            <strong>GitHub:</strong>{" "}
            <a
              href={userData.socialMedia.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.socialMedia.github}
            </a>
          </Typography>
          <Typography variant="body2">
            <strong>Instagram:</strong>{" "}
            <a
              href={userData.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userData.socialMedia.instagram}
            </a>
          </Typography>
          <Button variant="contained" color="primary" onClick={toggleEditMode}>
            Edit Personal Info
          </Button>
        </Stack>
      ) : (
        <Stack style={{ backgroundColor: "white", padding: 16 }} spacing={2}>
          <TextField
            label="First Name"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
          <TextField
            label="Bio"
            value={userData.bio}
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
          />
          <TextField
            label="Phone Number"
            value={userData.phoneNumber}
            onChange={(e) =>
              setUserData({ ...userData, phoneNumber: e.target.value })
            }
          />
          <TextField
            label="Address"
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
          />
          <TextField
            label="LinkedIn"
            value={userData.socialMedia.linkedIn}
            onChange={(e) =>
              setUserData({
                ...userData,
                socialMedia: {
                  ...userData.socialMedia,
                  linkedIn: e.target.value,
                },
              })
            }
          />
          <TextField
            label="GitHub"
            value={userData.socialMedia.github}
            onChange={(e) =>
              setUserData({
                ...userData,
                socialMedia: {
                  ...userData.socialMedia,
                  github: e.target.value,
                },
              })
            }
          />
          <TextField
            label="Instagram"
            value={userData.socialMedia.instagram}
            onChange={(e) =>
              setUserData({
                ...userData,
                socialMedia: {
                  ...userData.socialMedia,
                  instagram: e.target.value,
                },
              })
            }
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Stack>
      )}
    </>
  );
};

export default PersonalInfo;
