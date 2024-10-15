import { Box, Container, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { Facebook, Instagram, YouTube, LinkedIn, GitHub } from "@mui/icons-material";

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
    // { text: "Sitemap", url: "/sitemap" },
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
    <Box sx={{ backgroundColor: "#000", color: "#fff", py: 5, borderTop: "2px solid #111" }}>
  
        <Box
          sx={{
            marginLeft: "10px",
            marginBottom: "50px",
            marginRight: "10px",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* <Box sx={{ mb: { xs: 3, sm: 0 } }}> */}
            <Typography variant="h4" sx={{marginTop:"70px", color:"#848485"}}>
              Quick Links ➩
            </Typography>
            
          {/* </Box> */}
          <Box sx={{ mb: { xs: 3, sm: 0 } }}>
            <Typography variant="h5" sx={{color:"white", mb:"10px"}}>
              Products
            </Typography>
            {productLinks.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                color="inherit"
                display="block"
                sx={{
                  textDecoration: "none",
                  mb: 0, // Add spacing between links
                  color: "rgba(255, 255, 255, 0.7)", // Duller color
                  transition: "color 0.3s", // Smooth transition
                  "&:hover": {
                    color: "rgba(255, 255, 255, 1)", // Brighter color on hover
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
          <Box sx={{ mb: { xs: 3, sm: 0 } }}>
            <Typography variant="h5" sx={{color:"white", mb:"10px"}}>
              Company
            </Typography>
            {companyLinks.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                color="inherit"
                display="block"
                sx={{
                  textDecoration: "none",
                  mb: 0, // Add spacing between links
                  color: "rgba(255, 255, 255, 0.7)", // Duller color
                  transition: "color 0.3s", // Smooth transition
                  "&:hover": {
                    color: "rgba(255, 255, 255, 1)", // Brighter color on hover
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
          <Box sx={{ mb: { xs: 3, sm: 0 } }}>
            <Typography variant="h5" sx={{color:"white", mb:"10px"}}>
              Community
            </Typography>
            {communityLinks.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                color="inherit"
                display="block"
                sx={{
                  textDecoration: "none",
                  mb: 0, // Add spacing between links
                  color: "rgba(255, 255, 255, 0.7)", // Duller color
                  transition: "color 0.3s", // Smooth transition
                  "&:hover": {
                    color: "rgba(255, 255, 255, 1)", // Brighter color on hover
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
          <Box sx={{ mb: { xs: 3, sm: 0 } }}>
            <Typography variant="h5" sx={{color:"white", mb:"10px"}}>
              Get Help
            </Typography>
            {getHelpLinks.map((link) => (
              <Link
                key={link.text}
                href={link.url}
                color="inherit"
                display="block"
                sx={{
                  textDecoration: "none",
                  mb: 0, // Add spacing between links
                  color: "rgba(255, 255, 255, 0.7)", // Duller color
                  transition: "color 0.3s", // Smooth transition
                  "&:hover": {
                    color: "rgba(255, 255, 255, 1)", // Brighter color on hover
                  },
                }}
              >
                {link.text}
              </Link>
            ))}
          </Box>
        </Box>
        <Box sx={{width:"100%", textAlign: 'center', borderTop: "2px solid #111"}}>
          <Typography sx={{color:"#848485", marginTop:"20px"}} variant="h5">Follow Us!</Typography>
          <Box sx={{display: 'flex', justifyContent: 'center', gap: "1", marginTop:"10px", marginBottom:"-20px"}}>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": { color: "rgba(255, 255, 255, 1)" },
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
                "&:hover": { color: "rgba(255, 255, 255, 1)" },
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
                "&:hover": { color: "rgba(255, 255, 255, 1)" },
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
                "&:hover": { color: "rgba(255, 255, 255, 1)" },
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
                "&:hover": { color: "rgba(255, 255, 255, 1)" },
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
