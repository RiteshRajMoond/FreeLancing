import React, { useState, useEffect } from "react";
import { AppBar, Button, Typography, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import axios from "axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const resp = await axios.get("/user/check-login");
        setIsLoggedIn(resp.data.loggedIn);
        console.log(resp.data.loggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const btnStyle = {
    marginRight: "20px",
    padding: "0.3rem 1.4rem",
    backgroundColor: "teal",
    color: "white",
    borderRadius: "40px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    textTransform: "capitalize",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#008080",
    },
  };

  const toolStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px", 
    backgroundColor: "transparent",
    borderRadius: "50px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)", // For a frosted glass effect
  };

  const appBarStyle = {
    backgroundColor: "transparent",
    position: "fixed",
    top: "20px", // Adjust this to move it up/down
    left: isLoggedIn ? "20%" : "30%",
    right: isLoggedIn ? "20%" : "30%",
    // transform: isLoggedIn ? "translateX(-40%)" : "translateX(-55%)", 
    width: "auto",
    zIndex: 1100,
    borderRadius: "50px",
    animation: "float 3s ease-in-out infinite", // Apply animation
  };
  
  const styles = `
    @keyframes float {
      0%, 100% {
        transform: translateY(-10px); // Only move vertically
      }
      50% {
        transform: translateY(10px); // Only move vertically
      }
    }
  `;
  

  return (
    <AppBar style={appBarStyle} elevation={3}>
      <Toolbar style={toolStyle}>
        {isLoggedIn ? (
          <>
            <Button style={btnStyle} to="/alljobs" component={Link}>
              Jobs Available
            </Button>
            <Button style={btnStyle} to="/joblist" component={Link}>
              Jobs Posted
            </Button>
            <Button style={btnStyle} to="/developer-joblist" component={Link}>
              Applied Jobs
            </Button>
            <Logout setIsLoggedIn={setIsLoggedIn} />
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <AccountCircleIcon sx={{ color: "teal", fontSize: "38px" }} />
            </Link>
          </>
        ) : (
          <>
            <Button style={btnStyle} to="/alljobs" component={Link}>
              Jobs Available
            </Button>
            <Button style={btnStyle} to="/Login" component={Link}>
              Login
            </Button>
            <Button style={btnStyle} to="/SignUp" component={Link}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
