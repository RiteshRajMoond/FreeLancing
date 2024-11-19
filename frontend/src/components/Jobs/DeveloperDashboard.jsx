import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import Chat from "../Chat/Chat";

const DeveloperDashboard = () => {
  const { jobId } = useParams();
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [senderName, setSenderName] = useState("Developer Name"); // Replace with actual developer name

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
    setFileName(chosenFile ? chosenFile.name : ""); // Update file name state
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("status", status);
    formData.append("file", file);

    try {
      const response = await axios.post(
        `/user/job/upload-file/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("File uploaded successfully");
      setError(null);
      // console.log(response.data.url);

      // Reset file and fileName after successful upload
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error(error);
      setError("Failed to upload file");
      setSuccess(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fbg5.jpg?alt=media&token=512cce5e-c5ff-4ed7-9a57-f84b5247e0b1)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 4,
        color: "#ffffff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textShadow: "1px 1px 3px rgba(0, 0, 0, 0.8)" }}
      >
        Developer Dashboard
      </Typography>
      <TextField
        label="Project Status"
        multiline
        rows={4}
        value={status}
        onChange={handleStatusChange}
        placeholder="Enter project status"
        variant="outlined"
        sx={{
          width: "80%",
          maxWidth: 500,
          mb: 2,
          backgroundColor: "#333",
          borderRadius: 1,
          "& .MuiInputBase-root": {
            color: "#fff",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#777",
          },
        }}
        InputLabelProps={{
          style: { color: "#ccc" },
        }}
      />
      <Button
        variant="contained"
        component="label"
        sx={{
          width: "80%",
          maxWidth: 500,
          mb: 1,
          backgroundColor: "#555",
          "&:hover": {
            backgroundColor: "#777",
          },
        }}
      >
        Choose File
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {fileName && (
        <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
          Selected file: {fileName}
        </Typography>
      )}
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          width: "80%",
          maxWidth: 500,
          backgroundColor: "#444",
          color: "#fff",
          fontWeight: "bold",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.4)",
          "&:hover": {
            backgroundColor: "#666",
          },
        }}
      >
        Upload File
      </Button>
      <Chat userRole="Developer" /> {/* Add the Chat component */}
    </Box>
  );
};

export default DeveloperDashboard;
