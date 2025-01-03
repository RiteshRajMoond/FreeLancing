import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GavelIcon from "@mui/icons-material/Gavel";
import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InsightsIcon from "@mui/icons-material/Insights";

const Homepage = () => {
  const [currentMessage, setCurrentMessage] = useState(0); // State for changing messages
  const [open, setOpen] = useState(false); // Modal open state
  const [selectedCard, setSelectedCard] = useState(null); // Selected card data

  const messages = [
    "Welcome to FreelanceHub!",
    "Connect with top freelancers and clients",
    "Find projects that suit your expertise",
    "Build your freelancing career today",
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) =>
        prev === messages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const blurValue = Math.min(scrollPosition / 20, 15);
      const opacityValue = Math.max(1 - scrollPosition / 1500, 0);
      const containerElement = document.getElementById("blur-container-1");
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
  const cards = [
    {
      title: "Create Freelancer Profiles",
      content:
        "Showcase skills, experience, and portfolio with a sleek and modern design to attract the best opportunities.",
      icon: <PersonIcon sx={{ color: "#4caf50", fontSize: 48 }} />,
    },
    {
      title: "Explore Project Listings",
      content:
        "Discover projects with detailed descriptions, budgets, and timelines to match your expertise.",
      icon: <AssignmentIcon sx={{ color: "#ff9800", fontSize: 48 }} />,
    },
    {
      title: "Engage in Smart Bidding",
      content:
        "Participate in a fair and transparent bidding system, helping you win projects that match your skills.",
      icon: <GavelIcon sx={{ color: "#3f51b5", fontSize: 48 }} />,
    },
    {
      title: "Secure Payments",
      content:
        "Get paid securely and on time through an integrated payment gateway, ensuring peace of mind for all users.",
      icon: <PaymentIcon sx={{ color: "#f44336", fontSize: 48 }} />,
    },
    {
      title: "Ratings and Reviews",
      content:
        "Build trust with a transparent rating and review system for freelancers and clients alike.",
      icon: <StarIcon sx={{ color: "#ffeb3b", fontSize: 48 }} />,
    },
    {
      title: "Dedicated Support",
      content:
        "Access 24/7 support to resolve any issues and ensure a seamless freelancing experience.",
      icon: <SupportAgentIcon sx={{ color: "#9c27b0", fontSize: 48 }} />,
    },
    {
      title: "Insights and Analytics",
      content:
        "Gain actionable insights into your projects and performance to improve and grow your freelancing business.",
      icon: <InsightsIcon sx={{ color: "#00bcd4", fontSize: 48 }} />,
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setOpen(true);
    // Apply blur effect to the background
    document.getElementById("blur-container").style.filter = "blur(5px)";
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
    // Remove blur effect from the background
    document.getElementById("blur-container").style.filter = "none";
  };

  const positions = [
    { top: "120vh", left: "2rem" }, // Top-left
    { top: "120vh", right: "2rem" }, // Top-right
    { top: "140vh", left: "2rem" }, // Bottom-left
    { top: "140vh", right: "2rem" }, // Bottom-right
    { top: "160vh", left: "2rem" }, // Extra positions
    { top: "160vh", right: "2rem" },
    { top: "180vh", left: "2rem" },
  ];

  return (
    <>
      {/* Welcome Message Section */}
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
          id="blur-container-1"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: 'url("../../assets/moth.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: "fantasy",
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: "teal",
              animation: `fadeInOut 5s ease-in-out infinite`,
            }}
          >
            {messages[currentMessage]}
          </Typography>
        </Box>
      </Box>

      {/* Cards Section */}
      <Box
        id="blur-container"
        sx={{
          height: "90vh",
          width: "94.6vw",
          display: "flex",
          overflow: "hidden",
          flexWrap: "nowrap",
          backgroundImage: 'url("../../assets/giffy6.gif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "2rem",
          backgroundColor: "#f5f5f5",
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            onClick={() => handleCardClick(card)}
            sx={{
              position: "absolute",
              ...positions[index],
              height: "10vh",
              width: "10vw",
              marginRight: "1rem",
              padding: "1.5rem",
              backgroundColor: "teal",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "60px",
              cursor: "pointer",
              textAlign: "center",
              animation: "float 3s ease-in-out infinite", // Add animation here
              "&:hover": {
                transform: "scale(1.1)", // Slight scaling for floating effect
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.9)", // Stronger shadow when hovered
              },
            }}
          >
            {card.icon}
            <Typography
              variant="body1"
              sx={{ color: "white", fontWeight: "bold", marginTop: "0rem" }}
            >
              {card.title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Modal Section */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        aria-labelledby="card-title"
        aria-describedby="card-content"
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              height: "55%",
              // backgroundImage: "linear-gradient(300deg,rgb(182, 253, 236),rgb(255, 197, 206))", // Light teal to light pink gradient
              backgroundImage: 'url("../../assets/clouds.jpg")',
              backgroundSize: "cover",
              borderRadius: "30px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight="bold">
                {selectedCard?.title}
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography sx={{ marginTop: "1rem" }}>
              {selectedCard?.content}
            </Typography>
          </Box>
        </Fade>
      </Modal>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateX(100%); /* Start from the right */
            }
            25% {
              opacity: 1;
              transform: translateX(0); /* Fully visible */
            }
            75% {
              opacity: 1;
              transform: translateX(0); /* Keep visible */
            }
            100% {
              opacity: 0;
              transform: translateX(-100%); /* Fade out and move to the left */
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px); /* Move up */
            }
            100% {
              transform: translateY(0); /* Move down */
            }
          }
        `}
      </style>
    </>
  );
};

export default Homepage;
