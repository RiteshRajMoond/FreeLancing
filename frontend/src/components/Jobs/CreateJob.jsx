import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    requirements: [],
    budget: '',
    deadline: '',
  });

  const [requirement, setRequirement] = useState('');

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
  };

  const addRequirement = () => {
    if (requirement.trim()) {
      setJob({ ...job, requirements: [...job.requirements, requirement] });
      setRequirement('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/job/create-job', job);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        name="title"
        value={job.title}
        onChange={handleChange}
        placeholder="Job Title"
        required
        style={inputStyle}
      />
      <textarea
        name="description"
        value={job.description}
        onChange={handleChange}
        placeholder="Job Description"
        required
        style={textareaStyle}
      />
      <div style={requirementContainerStyle}>
        <input
          type="text"
          value={requirement}
          onChange={handleRequirementChange}
          placeholder="Add Requirement"
          style={inputStyle}
        />
        <button type="button" onClick={addRequirement} style={buttonStyle}>
          Add
        </button>
      </div>
      <ul style={requirementListStyle}>
        {job.requirements.map((req, index) => (
          <li key={index} style={requirementItemStyle}>{req}</li>
        ))}
      </ul>
      <input
        type="number"
        name="budget"
        value={job.budget}
        onChange={handleChange}
        placeholder="Budget"
        required
        style={inputStyle}
      />
      <input
        type="date"
        name="deadline"
        value={job.deadline}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Job</button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  margin: 'auto',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc',
  minHeight: '100px',
};

const requirementContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

const requirementListStyle = {
  listStyleType: 'none',
  padding: '0',
  width: '100%',
};

const requirementItemStyle = {
  backgroundColor: '#e0e0e0',
  padding: '5px 10px',
  margin: '5px 0',
  borderRadius: '4px',
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px 0',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
};

export default CreateJob;