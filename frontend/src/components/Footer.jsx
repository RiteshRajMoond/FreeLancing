import { Box, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import {
  Facebook,
  Instagram,
  YouTube,
  LinkedIn,
  GitHub,
} from "@mui/icons-material";
import "@fontsource/poppins";

const Footer = () => {
  const companyLinks = [
    { text: "About Us", url: "/about-us" },
    { text: "Careers", url: "/careers" },
    { text: "Press", url: "/press" },
    { text: "Blog", url: "/blog" },
    { text: "Terms of Service", url: "/terms-of-service" },
    { text: "Privacy Policy", url: "/privacy-policy" },
    { text: "Cookie Policy", url: "/cookie-policy" },
    { text: "Accessibility Statement", url: "/accessibility-statement" },
  ];

  const communityLinks = [
    { text: "Community Guidelines", url: "/community-guidelines" },
    { text: "Forums", url: "/forums" },
    { text: "Events", url: "/events" },
    { text: "Meetups", url: "/meetups" },
    { text: "Affiliate Program", url: "/affiliate-program" },
    { text: "Partner Program", url: "/partner-program" },
  ];

  const getHelpLinks = [
    { text: "Support", url: "/support" },
    { text: "Pricing", url: "/pricing" },
    { text: "FAQ", url: "/faq" },
    { text: "Contact Us", url: "/contact-us" },
    { text: "Report a Bug", url: "/report-bug" },
  ];

  const productLinks = [
    { text: "Find Freelancers", url: "/find-freelancers" },
    { text: "Post a Job", url: "/post-job" },
    { text: "How It Works", url: "/how-it-works" },
    { text: "Categories", url: "/categories" },
    { text: "Success Stories", url: "/success-stories" },
    { text: "Enterprise Solutions", url: "/enterprise-solutions" },
    { text: "Freelancer Resources", url: "/freelancer-resources" },
    { text: "Client Resources", url: "/client-resources" },
  ];

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,rgb(255, 255, 255), #0d0d0d)",
        color: "#FFF",
        py: 6,
        px: 3,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Quick Links Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#503f66",
          textAlign: "center",
          mb: 5,
          fontFamily: "Poppins, sans-serif"
        }}
      >
        Quick Links 
      </Typography>

      {/* Links Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        {[{ title: "Products", links: productLinks }, 
          { title: "Company", links: companyLinks },
          { title: "Community", links: communityLinks },
          { title: "Get Help", links: getHelpLinks }].map((section, index) => (
          <Box key={index}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "teal",
                fontWeight: "bold",
                fontFamily: "Poppins, sans-serif"
              }}
            >
              {section.title}
            </Typography>
            {section.links.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                color="inherit"
                display="block"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  textDecoration: "none",
                  mb: 1,
                  color: "rgb(255, 255, 255)",
                  transition: "color 0.3s",
                  "&:hover": {
                    color: "#FFD700",
                    textDecoration: "underline",
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
        ))}
      </Box>

      {/* Social Media Section */}
      <Box
        sx={{
          mt: 6,
          textAlign: "center",
          borderTop: "1px solid #4a4a4a",
          pt: 3,
        }}
      >
        <Typography
          sx={{ color: "#FFD700", mb: 2, fontFamily: "Poppins, sans-serif" }}
          variant="h5"
        >
          Follow Us!
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": { color: "lightblue",transform: "scale(1.5)" },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": { color: "purple",transform: "scale(1.5)" },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": { color: "#FF0000",transform: "scale(1.5)" },
            }}
          >
            <YouTube />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": { color: "#0E76A8",transform: "scale(1.5)" },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": { color: "#000",transform: "scale(1.5)" },
            }}
          >
            <GitHub />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
