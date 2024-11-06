import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ClientDashboard = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log("Fetching job details for jobId:", jobId);
        const response = await axios.get(`/user/job/get-job/${jobId}`);
        console.log("Job details fetched:", response.data);
        setJobDetails(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Project Dashboard</h2>
      {jobDetails && (
        <div>
          <h3>Project Details</h3>
          <p>
            <strong>Title:</strong> {jobDetails.title || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {jobDetails.description || "N/A"}
          </p>
          <p>
            <strong>Requirements:</strong>{" "}
            {jobDetails.requirements
              ? jobDetails.requirements.join(", ")
              : "N/A"}
          </p>
          <p>
            <strong>Budget:</strong> ${jobDetails.budget || "N/A"}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {jobDetails.deadline
              ? new Date(jobDetails.deadline).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Posted By:</strong>{" "}
            {jobDetails.postedBy
              ? `${jobDetails.postedBy.firstName} ${jobDetails.postedBy.lastName}`
              : "N/A"}
          </p>
          <p>
            <strong>Progress Status:</strong>{" "}
            {jobDetails.progressStatus || "N/A"}
          </p>
          <p>
            <strong>Feedback:</strong> {jobDetails.feedback || "N/A"}
          </p>
          <p>
            <strong>Completion Date:</strong>{" "}
            {jobDetails.completionDate
              ? new Date(jobDetails.completionDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      )}
      <h3>Submitted Files</h3>
      {jobDetails && jobDetails.submittedFiles.length > 0 ? (
        jobDetails.submittedFiles.map((file, index) => (
          <div key={index}>
            <p>
              <strong>File:</strong>{" "}
              <a href={file} target="_blank" rel="noopener noreferrer">
                Download
              </a>
            </p>
          </div>
        ))
      ) : (
        <p>No submitted files available.</p>
      )}
    </div>
  );
};

export default ClientDashboard;
