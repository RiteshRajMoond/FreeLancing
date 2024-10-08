import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./Homepage.css";

const Homepage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const blurValue = Math.min(scrollPosition / 20, 15);
      const opacityValue = Math.max(1 - scrollPosition / 300, 0);
      const containerElement = document.getElementById('blur-container');
      if (containerElement) {
        containerElement.style.filter = `blur(${blurValue}px)`;
        containerElement.style.opacity = opacityValue;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh + 89px)"
        sx={{
          position: "relative",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          id="blur-container"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: 'url("../../assets/ac.jpg")', // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: 'filter 0.3s, opacity 0.3s', // Smooth transition for blur and opacity
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Welcome to FreelanceHub!
          </h1>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h1"
          align="center"
          sx={{ marginTop: "20px", color: "whitesmoke" }}
        >
          Hello
        </Typography>
        <Typography
          variant="h1"
          align="center"
          sx={{ marginTop: "20px", color: "whitesmoke" }}
        >
          Hello
        </Typography>
        <Typography
          variant="h1"
          align="center"
          sx={{ marginTop: "20px", color: "whitesmoke" }}
        >
          Hello
        </Typography>
      </Box>
    </>
  );
};

export default Homepage;