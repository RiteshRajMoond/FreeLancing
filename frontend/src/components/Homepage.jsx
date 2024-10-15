import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Collapse, LinearProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GavelIcon from "@mui/icons-material/Gavel";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";

const Homepage = () => {
  const [expandedCard, setExpandedCard] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videoRef = useRef(null);

  const intervalTime = 4450;
  const updateInterval = 400;

  const videos = ["../../assets/features.mp4"];

  // Loop for updating progress
  useEffect(() => {
    let interval;

    if (expandedCard !== null) {
      setProgress(0); // Reset progress when a new card is expanded
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNextCard(); // Move to the next card when progress completes
            return 0;
          }
          return prev + 100 / (intervalTime / updateInterval);
        });
      }, updateInterval);
    }
    return () => clearInterval(interval); // Clean up the interval on component unmount or when card changes
  }, [expandedCard]);

  // Blur effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const blurValue = Math.min(scrollPosition / 20, 15);
      const opacityValue = Math.max(1 - scrollPosition / 1500, 0);
      const containerElement = document.getElementById("blur-container");
      if (containerElement) {
        containerElement.style.filter = `blur(${blurValue}px)`;
        containerElement.style.opacity = opacityValue;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // switch videos every 4 secs
  useEffect(() => {
    const videoInterval = setInterval(() => {
      setCurrentVideo((prev) => (prev === 0 ? 1 : 0));
    }, 25000); // 25 secs

    // return () => clearInterval(videoInterval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videos[currentVideo];
      videoRef.current.load();
      videoRef.current.onloadeddata = () => {
        videoRef.current
          .play()
          .catch((err) => console.error("Error playing video: ", error));
      };
    }
  }, [currentVideo]);

  const handleNextCard = () => {
    setExpandedCard((prev) =>
      prev === null || prev === cards.length - 1 ? 0 : prev + 1
    );
  };

  const handleToggle = (index) => {
    // Reset progress and toggle the card
    setExpandedCard((prev) => (prev === index ? null : index));
    if (videoRef.current) {
      // Set video to play from the corresponding time
      videoRef.current.currentTime = index * 5; // 0s, 5s, 10s, etc.
      videoRef.current.play();
    }
  };

  const cards = [
    {
      title: "Freelancer Profiles",
      content:
        "Allow freelancers to create detailed profiles showcasing their skills, experience, and portfolio.",
      icon: <PersonIcon sx={{ color: "gray" }} />,
    },
    {
      title: "Project Listings",
      content:
        "Enable clients to post projects with detailed descriptions, budgets, and deadlines.",
      icon: <AssignmentIcon sx={{ color: "gray" }} />,
    },
    {
      title: "Bidding System",
      content:
        "Implement a system where freelancers can bid on projects, and clients can review bids and select the best fit.",
      icon: <GavelIcon sx={{ color: "gray" }} />,
    },
    {
      title: "Secure Payments",
      content:
        "Integrate secure payment gateways to handle transactions between clients and freelancers.",
      icon: <PaymentIcon sx={{ color: "gray" }} />,
    },
    {
      title: "Ratings and Reviews",
      content:
        "Allow clients to rate and review freelancers based on their performance, helping build trust and credibility.",
      icon: <StarIcon sx={{ color: "gray" }} />,
    },
  ];

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh + 89px)"
        sx={{
          backgroundColor: "black",
          position: "relative",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          id="blur-container"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: 'url("../../assets/ac.jpg")', // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "filter 0.3s, opacity 0.3s", // Smooth transition for blur and opacity
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: "rgb(235, 230, 230)",
            }}
          >
            Welcome to FreelanceHub!
          </h1>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "50%",
            padding: "1rem",
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                width:"30vw",
                marginBottom: "1rem",
                padding: "1.5rem",
                backgroundColor: "rgba(235, 230, 230, 0.1)",
                color: "rgba(235, 230, 230)",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(index)}
            >
              <Box display="flex" alignItems="center">
                {card.icon}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginLeft: "0.5rem" }}
                >
                  {card.title}
                </Typography>
              </Box>
              <Collapse in={expandedCard === index}>
                <Typography variant="body1" sx={{ marginTop: ".3rem" }}>
                  {card.content}
                </Typography>
                <LinearProgress
                  sx={{
                    marginBottom: "-23px",
                    marginTop:"25px",
                    height: "0.2px",
                    backgroundColor: "rgba(235, 230, 230, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#0077ff", // Progress bar color
                    },
                  }}
                  variant="determinate"
                  value={expandedCard === index ? progress : 0}
                />
              </Collapse>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "80vw",
            height:"100%",
            marginRight: "-20px",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            loop
            muted
            style={{
              width: "100%",
              height:"100%",
              borderRadius: "10px",
              borderRadius: "10px",
              // left: currentVideo === 0 ? "0" : "100%",
              // transform:
              //   currentVideo === 0 ? "translateX(0)" : "translateX(-10%)",
              // transition: "left 0.5s ease-in-out, transform 0.5s ease-in-out",
            }}
          >
            <source src="../../assets/features.mp4" type="video/mp4"></source>
          </video>

          {/* <img src="../../assets/ac.jpg" alt="" /> */}
        </Box>
      </Box>
    </>
  );
};

export default Homepage;
