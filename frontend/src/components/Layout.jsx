// Layout.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.gif"; // Replace with your logo path

const Layout = ({ children }) => {
  return (
    <div>
      <div style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000 }}>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ height: "80px", width:"80px", borderRadius:"50%" }} />
        </Link>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
