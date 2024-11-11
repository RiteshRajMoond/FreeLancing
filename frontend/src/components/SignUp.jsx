import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  Select,
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const SignUp = () => {
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "5px",
  };
  const buttonStyle = {
    backgroundColor: "#191f3d",
    color: "white",
    padding: "10px",
    marginTop: "20px",
    "&:hover": { backgroundColor: "#d40000" },
  };
  const boxStyle1 = {
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("option1");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleUserSignup = async () => {
    try {
      const res = await axios.post("/user/signup", {
        username: username,
        email: email,
        password: password,
      });
      toast.success("Login successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("This is the error!\n", error);
    }
  };

  const handleAdminSignup = async () => {
    try {
      const res = await axios.post("/admin/signup", {
        username: username,
        email: email,
        password: password,
        inviteJWT: token,
      });
      console.log("Admin signed Up!", res);
    } catch (error) {
      console.error("This is the error!\n", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "option2") handleAdminSignup();
    else handleUserSignup();
  };

  return (
    <Box sx={boxStyle1}>
      <video autoPlay loop muted style={vidStyle}>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Fsignup.mp4?alt=media&token=c00fff8e-5864-4967-b3c6-93047fa87466"
          type="video/mp4"
        />
      </video>
      <Toaster />
      <Box sx={boxStyle2}>
        <Typography variant="h4" sx={{ color: "#fff", marginBottom: "20px" }}>
          {" "}
          Sign Up{" "}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "rgb(66, 66, 66)", // Label color when focused
                },
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgb(66, 66, 66)", // Remove default underline
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "rgb(66, 66, 66)", // Remove underline on focus
              },
            }}
            variant="filled"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            name="username"
            required
            label="Username"
            type="text"
            fullWidth
            style={inputStyle}
          />
          <TextField
            sx={{
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "rgb(66, 66, 66)", // Label color when focused
                },
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgb(66, 66, 66)", // Remove default underline
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "rgb(66, 66, 66)", // Remove underline on focus
              },
            }}
            variant="filled"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            required
            label="Email"
            type="email"
            fullWidth
            style={inputStyle}
          />
          <TextField
            sx={{
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "rgb(66, 66, 66)", // Label color when focused
                },
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgb(66, 66, 66)", // Remove default underline
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "rgb(66, 66, 66)", // Remove underline on focus
              },
            }}
            variant="filled"
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
          <FormControl
            variant="filled"
            style={inputStyle}
            fullWidth
            sx={{
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "rgb(66, 66, 66)", // Label color when focused
                },
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgb(66, 66, 66)", // Remove default underline
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "none", // Remove underline on focus
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Remove the blue border on focus
                },
              },
            }}
          >
            <InputLabel id="select-label">Choose an option</InputLabel>
            <Select
              labelId="select-label"
              label="Choose an option"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="option1">User</MenuItem>
              <MenuItem value="option2">Admin</MenuItem>
            </Select>
          </FormControl>
          {role === "option2" && (
            <TextField
              sx={{
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "rgb(66, 66, 66)",
                  },
                },
                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "rgb(66, 66, 66)",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottom: "rgb(66, 66, 66)",
                },
              }}
              variant="filled"
              onChange={(e) => setToken(e.target.value)}
              name="inviteJWT"
              required
              label="Admin Token"
              type="password"
              fullWidth
              style={inputStyle}
            />
          )}
          <Button type="submit" variant="contained" style={buttonStyle}>
            {" "}
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
