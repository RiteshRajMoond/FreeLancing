import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const HomeCard = () => {
  const cards = [
    {
      title: "Web Development",
      value: "500+",
      description: "Websites and applications delivered",
      borderColor: "#3b2c55", // Medium soft purple
    },
    {
      title: "Graphic Design",
      value: "300+",
      description: "Logos, branding, and UI/UX designs completed",
      borderColor: "#264228", // Medium soft green
    },
    {
      title: "SEO Optimization",
      value: "70%",
      description: "Clients saw improved rankings within 3 months",
      borderColor: "#673232", // Medium soft red
    },
    {
      title: "Content Writing",
      value: "1M+",
      description: "Words written for blogs, websites, and marketing",
      borderColor: "#203e56", // Medium soft blue
    },
    {
      title: "Digital Marketing",
      value: "50+",
      description: "Campaigns launched with a high ROI",
      borderColor: "#694d22", // Medium soft orange
    },
    {
      title: "Mobile App Development",
      value: "100+",
      description: "Mobile apps developed across iOS and Android",
      borderColor: "#6c662d", // Medium soft yellow
    },
    // Add as many cards as you want...
  ];
  
  
  const containerRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(scrollPosition - 300, 0);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const newPosition = Math.min(
        scrollPosition + 300,
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      setIsAtStart(scrollPosition === 0);
      setIsAtEnd(
        scrollPosition >=
          containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  }, [scrollPosition]);

  return (
    <Box
      sx={{
        position: "relative",
        padding: "40px",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <Typography
        variant="h2"
        component="div"
        sx={{
          textAlign: "center",
          marginTop: "70px",
          fontWeight: "bold",
          color: "#fff",
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
          color: "#fff",
        }}
      >
        Services we provide💻
      </Typography>
      <IconButton
        onClick={handleScrollLeft}
        disabled={isAtStart}
        sx={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: isAtStart ? "#888" : "#fff",
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        ref={containerRef}
        sx={{
          overflowX: "hidden",
          display: "flex",
          gap: "20px",
          padding: "40px 0",
          scrollBehaviour: "smooth",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              minWidth: "350px", // Reduced width
              minHeight: "250px", // Reduced height
              color: "#fff",
              border: `2px solid ${card.borderColor}`,
              borderRadius : "10%",
              transition: "border-color 0.3s",
              backgroundColor: "#111",
              "&:hover": {
                transition: "background-color .5s, color .1s, box-shadow 0.3s",
                border: "none",
                backgroundColor: `${card.borderColor}`,
                color: "#111",
                boxShadow:`0 0 8px 5px ${card.borderColor}`
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ marginBottom: "3rem" }}
              >
                {card.title}
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{ fontWeight: "bold", marginBottom: "3rem" }}
              >
                {card.value}
              </Typography>
              <Typography variant="body1" component="div" gutterBottom>
                {card.description}
              </Typography>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "#fff",
                  marginTop: "1rem",
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
        onClick={handleScrollRight}
        disabled={isAtEnd}
        sx={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          color: isAtEnd ? "#888" : "#fff",
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HomeCard;
