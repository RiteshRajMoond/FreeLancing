import React from "react";
import { AppBar, Button, Typography, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
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
    <>
      <Toolbar style={toolStyle}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "fantasy",
            color: "rgb(235, 230, 230)",
          }}
        >
          FreelanceHub
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
    </>
  );
}
