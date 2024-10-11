import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const SuperAdmin = () => {
  const vidStyle = {
    position: "fixed",
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    objectFit: "cover",
    transform: "translate(-50%, -50%)",
    zIndex: "-1",
  };
  const inputStyle = {
    margin: "10px 0",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "10px",
  };
  const buttonStyle = {
    backgroundColor: "#191f3d",
    color: "white",
    padding: "10px",
    marginTop: "20px",
    "&:hover": { backgroundColor: "#d40000" },
  };
  const boxStyle1 = {
    marginLeft: "470px",
    position: "relative",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const boxStyle2 = {
    position: "relative",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPermissions, setAdminPermissions] = useState([]);

  const handleSendMail = async (e) => {
    try {
      e.preventDefault();
      const resp = await axios.post("/admin/generate-invite", {
        email: adminEmail,
        permissions: adminPermissions,
      });
      if (resp.status === 200) {
        alert("Invite Sent Successfully");
      }
    } catch (err) {
      if (err.response && err.response.status !== 200) {
        console.log(err.response.data.message);
        alert("Error sending invite");
      }
      console.error("Error sending invite: ", err);
    }
  };

  const handlePermissionChange = (event) => {
    try {
      const value = event.target.value;
      const newPermissions = Array.isArray(value) ? value : value.split(",");
      setAdminPermissions(newPermissions);
    } catch (error) {
      console.error("Error updating permissions: ", error);
    }
  };

  const permissions = [
    "manage_users",
    "manage_jobs",
    "manage_payments",
    "issue_refunds",
    "view_reports",
  ];

  return (
    <Box sx={boxStyle1}>
      <Box sx={boxStyle2}>
        <Typography variant="h4" sx={{ color: "purple", marginBottom: "20px" }}>
          Add Admin
        </Typography>
        <form onSubmit={handleSendMail}>
          <TextField
            sx={{
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "rgb(66, 66, 66)", // Label color when focused
                },
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgb(66, 66, 66)", // Remove default underline
              },
              "& .MuiFilledInput-underline:after": {
                borderBottom: "rgb(66, 66, 66)", // Remove underline on focus
              },
            }}
            name="email"
            type="text"
            onChange={(e) => setAdminEmail(e.target.value)}
            variant="filled"
            label="Email"
            required
            fullWidth
            style={inputStyle}
          />
          <FormControl variant="filled" fullWidth style={inputStyle}>
            <InputLabel id="permissions-label">Permissions</InputLabel>
            <Select
              labelId="permissions-label"
              multiple
              value={adminPermissions}
              onChange={handlePermissionChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {permissions.map((permission) => (
                <MenuItem key={permission} value={permission}>
                  <Checkbox
                    checked={adminPermissions.indexOf(permission) > -1}
                  />
                  <ListItemText primary={permission} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={buttonStyle}>
            Send Mail
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SuperAdmin;
