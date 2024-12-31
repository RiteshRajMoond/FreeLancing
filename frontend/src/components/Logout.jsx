import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function Logout({ setIsLoggedIn }) {
  const handleLogout = async () => {
    try {
      const resp = await axios.get("/user/logout");
      if (resp.status === 200) {
        toast.success("Logged out successfully!", {
          position:"bottom-right", // Predefined position
          duration: 3000, // Optional: Duration in milliseconds
        });
        setTimeout(() => setIsLoggedIn(false), 2000); // Adjust delay as needed
      }
    } catch (error) {
      toast.error("An error occurred while logging out.", {
        position: "bottom-center",
        className: "custom-toast",
      });
    }
  };

  const btnStyle = {
    marginRight: "20px",
    padding: "0.3rem 1.4rem",
    backgroundColor: "teal",
    color: "white",
    borderRadius: "40px",
    fontFamily: "fantasy",
  };

  return (
    <>

      <Toaster />
      <Button style={btnStyle} onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}
