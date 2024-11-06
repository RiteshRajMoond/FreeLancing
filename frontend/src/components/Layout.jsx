// Layout.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg"; // Replace with your logo path

const Layout = ({ children }) => {
  return (
    <div>
      <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000 }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "50px" }} />
        </Link>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
