import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";

export default function Logout({ setIsLoggedIn }) {
  const handleLogout = async () => {
    try {
      const resp = await axios.get("/user/logout");
      if (resp.status === 200) {
        toast.success("Logged out successfully!");
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const btnStyle = {
    marginRight: "20px",
    padding: "0.3rem 1.4rem",
    backgroundColor: "transparent",
    color: "rgb(235, 230, 230)",
    borderRadius: "40px",
    fontFamily: "fantasy",
  };

  return (
    <>
  <Toaster position="bottom-center" />
    <Button style={btnStyle} onClick={handleLogout}>
      Logout
    </Button>
    </>
  );
}
