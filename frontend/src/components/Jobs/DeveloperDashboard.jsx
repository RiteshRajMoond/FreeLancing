import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chat from "../Chat/Chat"; // Import the Chat component

const DeveloperDashboard = () => {
  const { jobId } = useParams();
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [senderName, setSenderName] = useState("Developer Name"); // Replace with actual developer name

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      console.log(response.data.url);
    } catch (error) {
      console.error(error);
      setError("Failed to upload file");
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Developer Dashboard</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <textarea
        value={status}
        onChange={handleStatusChange}
        placeholder="Enter project status"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload File</button>
      <Chat senderName={senderName} jobId={jobId} />{" "}
      {/* Add the Chat component */}
    </div>
  );
};

export default DeveloperDashboard;
