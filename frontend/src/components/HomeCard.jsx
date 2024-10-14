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
      title: "Dropbox Sign",
      value: "4X",
      description: "faster speed to market",
      borderColor: "purple",
    },
    {
      title: "Refokus",
      value: "200+",
      description: "Webflow sites launched",
      borderColor: "green",
    },
    {
      title: "attentive",
      value: "27%",
      description: "traffic increase one week post-launch",
      borderColor: "red",
    },
    {
      title: "Example Company 1",
      value: "5X",
      description: "growth in users",
      borderColor: "blue",
    },
    {
      title: "Example Company 2",
      value: "100%",
      description: "customer satisfaction",
      borderColor: "orange",
    },
    {
      title: "Example Company 3",
      value: "3X",
      description: "improved efficiency",
      borderColor: "yellow",
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
          marginBottom: "40px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        Trusted by 3,000+ freelancers and agencies
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
              transition: "border-color 0.3s",
              backgroundColor: "#111",
              "&:hover": {
                transition: "background-color .5s, color .5s",
                border: "none",
                backgroundColor: `${card.borderColor}`,
                color: "#000",
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
                Read Story
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
