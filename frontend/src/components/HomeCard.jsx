import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import bg from "../../assets/leaf.webp";
// Import Google Font
import "@fontsource/poppins"; // Modern and aesthetic font

const HomeCard = () => {
  const cards = [
    {
      title: "Web Development",
      value: "500+",
      description: "Websites and applications delivered",
      borderColor: "#503f66",
    },
    {
      title: "Graphic Design",
      value: "300+",
      description: "Logos, branding, and UI/UX designs completed",
      borderColor: "#578355",
    },
    {
      title: "SEO Optimization",
      value: "70%",
      description: "Clients saw improved rankings within 3 months",
      borderColor: "#845656",
    },
    {
      title: "Content Writing",
      value: "1M+",
      description: "Words written for blogs, websites, and marketing",
      borderColor: "#577283",
    },
    {
      title: "Digital Marketing",
      value: "50+",
      description: "Campaigns launched with a high ROI",
      borderColor: "#7d6352",
    },
    {
      title: "Mobile App Development",
      value: "100+",
      description: "Mobile apps developed across iOS and Android",
      borderColor: "#837e55",
    },
  ];

  const containerRef = useRef(null);
  const scrollAmount = 300; // Adjust scroll amount as needed

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = (direction) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      let newPosition;

      if (direction === "left") {
        newPosition = Math.max(containerRef.current.scrollLeft - scrollAmount, 0);
      } else {
        newPosition = Math.min(
          containerRef.current.scrollLeft + scrollAmount,
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        );
      }

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setIsAtStart(newPosition === 0);
      setIsAtEnd(
        newPosition >= containerRef.current.scrollWidth - containerWidth
      );
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        padding: "40px",
        backgroundColor: "white",
        backgroundSize: "contain",
        color: "#fff",
        fontFamily: "Poppins, sans-serif", // Set default font
        overflow: "hidden", // Prevents horizontal scroll on the entire site
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "70px",
          fontWeight: "bold",
          color: "#503f66",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Trusted and utilized by our precious clients
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#837e55",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Services we provide💻
      </Typography>
      <IconButton
        onClick={() => handleScroll("left")}
        disabled={isAtStart}
        sx={{
          position: "absolute",
          left: { xs: "5px", md: "10px" },
          top: "65%",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "#503f66",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          gap: "20px",
          padding: "40px 0",
          scrollBehavior: "smooth",
          backgroundImage: `url(${bg})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          overflowX: "auto", // Enables scrolling within the container
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Edge
          },
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              minWidth: "350px",
              minHeight: "250px",
              color: `${card.borderColor}`,
              border: `2px solid ${card.borderColor}`,
              borderRadius: "15%",
              transition: "all 0.5s ease", // Smooth transition for all changes
              backgroundColor: "white",
              fontFamily: "Poppins, sans-serif",
              overflow: "hidden", // Ensures content stays within the card during resizing
              position: "relative", // Necessary for absolute positioning of the background
              "&:hover": {
                transition: "all 0.5s ease",
                border: "none",
                backgroundColor: `${card.borderColor}`,
                color: "#111",
                boxShadow: `0 0 8px 5px ${card.borderColor}`,
                backgroundImage: `url(${bg})`, // Replace with your image URL or variable
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: "scale(1.1)", // Enlarges the card
                zIndex: 2, // Ensures hovered card appears above others
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  marginBottom: "3rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "3rem",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {card.value}
              </Typography>
              <Typography
                variant="body1"
                component="div"
                gutterBottom
                sx={{ fontFamily: "Poppins, sans-serif" }}
              >
                {card.description}
              </Typography>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "black",
                  marginTop: "1rem",
                  fontFamily: "Poppins, sans-serif",
                }}
                endIcon={<span style={{ fontSize: "16px" }}>→</span>}
              >
                Know more
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <IconButton
        onClick={() => handleScroll("right")}
        disabled={isAtEnd}
        sx={{
          position: "absolute",
          right: { xs: "5px", md: "10px" },
          top: "65%",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: "#503f66",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HomeCard;
