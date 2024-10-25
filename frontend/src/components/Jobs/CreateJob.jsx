import React, { useState } from 'react';
import backgroundImage from '../../../assets/bg5.jpg'
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

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
      // Optionally, reset the form or show a success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Create Job
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              name="title"
              value={job.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
              variant="outlined"
              margin="normal"
              style={inputStyle}
            />
            <TextField
              name="description"
              value={job.description}
              onChange={handleChange}
              placeholder="Job Description"
              required
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              style={inputStyle}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                value={requirement}
                onChange={handleRequirementChange}
                placeholder="Add Requirement"
                variant="outlined"
                margin="normal"
                style={{ flex: 1, ...inputStyle }}
              />
              <Button variant="contained" color="primary" onClick={addRequirement} style={{ marginLeft: '10px' }}>
                Add
              </Button>
            </div>
            <List style={{ listStyleType: 'none', padding: '0' }}>
              {job.requirements.map((req, index) => (
                <ListItem key={index} style={{ backgroundColor: '#e0e0e0', margin: '5px 0', borderRadius: '4px' }}>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>
            <TextField
              name="budget"
              value={job.budget}
              onChange={handleChange}
              placeholder="Budget"
              required
              variant="outlined"
              margin="normal"
              style={inputStyle}
            />
            <TextField
              name="deadline"
              value={job.deadline}
              onChange={handleChange}
              type="date"
              required
              variant="outlined"
              margin="normal"
              style={inputStyle}
            />
            <CardActions style={{ justifyContent: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Add Job
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

// Styles
const containerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  marginTop: '20px',
  backgroundImage: `url(${backgroundImage})`, // Replace with your image path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh', // Adjust height as needed
};

const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with transparency
  borderRadius: '8px',
};

const inputStyle = {
  width: '100%',
  margin: '10px 0',
};

export default CreateJob;
