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
      borderColor: "#a565ff",
    },
    {
      title: "Graphic Design",
      value: "300+",
      description: "Logos, branding, and UI/UX designs completed",
      borderColor: "#5df256",
    },
    {
      title: "SEO Optimization",
      value: "70%",
      description: "Clients saw improved rankings within 3 months",
      borderColor: "#ff6868",
    },
    {
      title: "Content Writing",
      value: "1M+",
      description: "Words written for blogs, websites, and marketing",
      borderColor: "#4dbaff",
    },
    {
      title: "Digital Marketing",
      value: "50+",
      description: "Campaigns launched with a high ROI",
      borderColor: "#ff8c42",
    },
    {
      title: "Mobile App Development",
      value: "100+",
      description: "Mobile apps developed across iOS and Android",
      borderColor: "#ffeb3b",
    },
  ];

  const containerRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newPosition = Math.max(scrollPosition - containerWidth, 0);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newPosition = Math.min(
        scrollPosition + containerWidth,
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
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
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
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
        }}
      >
        Services we provide💻
      </Typography>
      <IconButton
        onClick={handleScrollLeft}
        disabled={isAtStart}
        sx={{
          position: "absolute",
          left: { xs: "5px", md: "10px" },
          top: "65%",
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
          display: "flex",
          gap: "20px",
          padding: "40px 0",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            sx={{
              minWidth: { xs: "250px", sm: "300px", md: "350px" },
              minHeight: { xs: "200px", sm: "220px", md: "250px" }, // Reduced height
              color: "#fff",
              border: `2px solid ${card.borderColor}`,
              borderRadius: "10%",
              transition: "border-color 0.3s",
              backgroundColor: "#111",
              "&:hover": {
                transition: "background-color .5s, color .1s, box-shadow 0.3s",
                border: "none",
                backgroundColor: `${card.borderColor}`,
                color: "#111",
                boxShadow: `0 0 8px 5px ${card.borderColor}`,
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
          right: { xs: "5px", md: "10px" },
          top: "65%",
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
