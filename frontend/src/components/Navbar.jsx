import React from "react";
import { AppBar, Button, Typography, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  const btnStyle = {
    marginRight: "20px",
    padding: "0.3rem 1.4rem",
    backgroundColor: "transparent",
    color: "white",
    borderRadius: "40px",
    fontFamily: "fantasy",
  };
  const toolStyle = { padding: "0.3rem 1.4rem" };
  const barStyle = {
    padding: "0.3rem 1.4rem",
    backgroundColor: "black",
    border: "1px red",
  };

  return (
    <>
      <AppBar style={barStyle}>
        <Toolbar style={toolStyle}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: "fantasy" }}>
            <a href="/">FreelanceHub</a>
          </Typography>
          <Button style={btnStyle} variant="text" to="/Admins" component={Link}>
            Admins
          </Button>
          <Button style={btnStyle} to="/Login" component={Link}>
            Login
          </Button>
          <Button style={btnStyle} to="/SignUp" component={Link}>
            SignUp
          </Button>
          <Logout />
        </Toolbar>
      </AppBar>
    </>
  );
}
