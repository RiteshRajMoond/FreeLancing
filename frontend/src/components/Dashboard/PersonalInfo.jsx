import React, { useState } from "react";
import { TextField, Button, Typography, Stack, Divider } from "@mui/material";

const PersonalInfo = () => {
  const [userData, setUserData] = useState({
    firstName: "Emma",
    lastName: "Richardson",
    bio: "Just a rich bitch",
    phoneNumber: "123456789",
    address: "MKWorld",
    socialMedia: {
      linkedIn: "https://linkedin.com/in/emmarichardson",
      github: "https://github.com/emmarichardson",
      instagram: "https://instagram.com/emmarichardson",
    },
  });

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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
              {userData.socialMedia.linkedin}
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
          <Button variant="contained" color="primary" onClick={toggleEditMode}>
            Save
          </Button>
        </Stack>
      )}
    </>
  );
};

export default PersonalInfo;
