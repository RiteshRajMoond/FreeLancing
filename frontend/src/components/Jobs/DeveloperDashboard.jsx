import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chat from "../Chat/Chat"; // Import the Chat component

const DeveloperDashboard = () => {
  const { jobId } = useParams();
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);

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
      alert("File uploaded successfully");
      console.log(response.data.url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload file");
    }
  };

  return (
    <div>
      <h2>Developer Dashboard</h2>
      <textarea
        value={status}
        onChange={handleStatusChange}
        placeholder="Enter project status"
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload File</button>
      <Chat userRole="Developer" /> {/* Add the Chat component */}
    </div>
  );
};

export default DeveloperDashboard;
