import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Stack, Divider } from "@mui/material";

const PersonalInfo = ({ userData, handleSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData || {});

  useEffect(() => {
    setLocalUserData(userData || {});
  }, [userData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSavePersonalInfo = async () => {
    await handleSave(localUserData);
    setLocalUserData(localUserData)
    setEditMode(false);
  };

  return (
    <>
      {!editMode ? (
        <Stack
          style={{ backgroundColor: "white", color: "black", padding: 16 }}
          spacing={2}
        >
          <Typography variant="h5">
            {localUserData.firstName || ""} {localUserData.lastName || ""}
          </Typography>
          <Typography variant="body1">
            <strong>Bio:</strong> {localUserData.bio || ""}
          </Typography>
          <Divider />
          <Typography variant="body2">
            <strong>Phone Number:</strong> {localUserData.phoneNumber || ""}
          </Typography>
          <Typography variant="body2">
            <strong>Address:</strong> {localUserData.address || ""}
          </Typography>
          <Typography variant="body2">
            <strong>LinkedIn:</strong>{" "}
            <a
              href={localUserData.socialMedia?.linkedIn || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {localUserData.socialMedia?.linkedIn || ""}
            </a>
          </Typography>
          <Typography variant="body2">
            <strong>GitHub:</strong>{" "}
            <a
              href={localUserData.socialMedia?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {localUserData.socialMedia?.github || ""}
            </a>
          </Typography>
          <Typography variant="body2">
            <strong>Instagram:</strong>{" "}
            <a
              href={localUserData.socialMedia?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {localUserData.socialMedia?.instagram || ""}
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
            value={localUserData.firstName || ""}
            onChange={(e) =>
              setLocalUserData({ ...localUserData, firstName: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            value={localUserData.lastName || ""}
            onChange={(e) =>
              setLocalUserData({ ...localUserData, lastName: e.target.value })
            }
          />
          <TextField
            label="Bio"
            value={localUserData.bio || ""}
            onChange={(e) =>
              setLocalUserData({ ...localUserData, bio: e.target.value })
            }
          />
          <TextField
            label="Phone Number"
            value={localUserData.phoneNumber || ""}
            onChange={(e) =>
              setLocalUserData({
                ...localUserData,
                phoneNumber: e.target.value,
              })
            }
          />
          <TextField
            label="Address"
            value={localUserData.address || ""}
            onChange={(e) =>
              setLocalUserData({ ...localUserData, address: e.target.value })
            }
          />
          <TextField
            label="LinkedIn"
            value={localUserData.socialMedia?.linkedIn || ""}
            onChange={(e) =>
              setLocalUserData({
                ...localUserData,
                socialMedia: {
                  ...localUserData.socialMedia,
                  linkedIn: e.target.value,
                },
              })
            }
          />
          <TextField
            label="GitHub"
            value={localUserData.socialMedia?.github || ""}
            onChange={(e) =>
              setLocalUserData({
                ...localUserData,
                socialMedia: {
                  ...localUserData.socialMedia,
                  github: e.target.value,
                },
              })
            }
          />
          <TextField
            label="Instagram"
            value={localUserData.socialMedia?.instagram || ""}
            onChange={(e) =>
              setLocalUserData({
                ...localUserData,
                socialMedia: {
                  ...localUserData.socialMedia,
                  instagram: e.target.value,
                },
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSavePersonalInfo}
          >
            {" "}
            {/* Call handleSavePersonalInfo */}
            Save
          </Button>
        </Stack>
      )}
    </>
  );
};

export default PersonalInfo;
