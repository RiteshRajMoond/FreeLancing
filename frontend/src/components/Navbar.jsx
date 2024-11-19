import React, { useState, useEffect } from "react";
import { AppBar, Button, Typography, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import axios from "axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Call checkLoginStatus when the component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const resp = await axios.get("/user/check-login");
        setIsLoggedIn(resp.data.loggedIn);
        // console.log(resp.data.loggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const btnStyle = {
    marginRight: "20px",
    padding: "0.3rem 1.4rem",
    backgroundColor: "transparent",
    color: "rgb(235, 230, 230)",
    borderRadius: "40px",
    fontFamily: "fantasy",
  };

  const toolStyle = {
    position: "fixed",
    top: "0px",
    left: "0px",
    right: "0px",
    zIndex: "1000",
    padding: "0.3rem 1.4rem",
    border: "none",
    backgroundColor: "rgba(235, 230, 230, 0.1)",
  };

  return (
    <AppBar position="static">
      <Toolbar style={toolStyle}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "fantasy",
            color: "rgb(235, 230, 230)",
          }}
        >
          
        </Typography>

        {/* Conditionally render based on login status */}
        {isLoggedIn ? (
          <>
            <Button style={btnStyle} to="/alljobs" component={Link}>
              Jobs available
            </Button>
            <Button style={btnStyle} to="/joblist" component={Link}>
              Jobs Posted
            </Button>
            <Button style={btnStyle} to="/developer-joblist" component={Link}>
              Applied Jobs
            </Button>
            <Logout setIsLoggedIn={setIsLoggedIn} />
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <AccountCircleIcon sx={{ color: "white", fontSize: "38px" }} />
            </Link>
          </>
        ) : (
          <>
            <Button style={btnStyle} to="/alljobs" component={Link}>
              Jobs available
            </Button>
            <Button style={btnStyle} to="/Login" component={Link}>
              Login
            </Button>
            <Button style={btnStyle} to="/SignUp" component={Link}>
              SignUp
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
