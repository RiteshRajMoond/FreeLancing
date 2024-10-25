import React, { useState, useEffect } from "react";
import axios from "axios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/user/job/all-jobs");
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Job List</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Requirements: {job.requirements.join(", ")}</p>
            <p>Budget: ${job.budget}</p>
            <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
            <p>
              Posted by: {job.postedBy ? job.postedBy.email : "Unknown"}
            </p>{" "}
            {/* Handle missing postedBy */}
            <p>Created at: {new Date(job.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllJobs;
