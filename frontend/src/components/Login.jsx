import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const vidStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: "-1",
  };
  const inputStyle = {
    margin: "10px 0",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: "10px",
  };
  const buttonStyle = {
    backgroundColor: "#191f3d",
    color: "white",
    padding: "10px",
    marginTop: "20px",
    "&:hover": { backgroundColor: "#d40000" },
  };
  const boxStyle1 = {
    marginLeft: "470px",
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const boxStyle2 = {
    position: "relative",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  // const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const resp = axios.post("/user/login", { email, password });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={boxStyle1}>
      <video autoPlay loop muted style={vidStyle}>
        <source src="../../assets/login.mp4" type="video/mp4" />
      </video>

      <Box sx={boxStyle2}>
        <Typography variant="h4" sx={{ color: "#fff", marginBottom: "20px" }}>
          {" "}
          Login{" "}
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            required
            label="Email"
            type="text"
            fullWidth
            style={inputStyle}
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            required
            label="Password"
            type="password"
            fullWidth
            style={inputStyle}
          />
          <Button type="submit" variant="contained" style={buttonStyle}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
