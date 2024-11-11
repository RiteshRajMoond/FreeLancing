// Layout.js
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <div
        style={{ position: "fixed", top: "10px", left: "10px", zIndex: 1000 }}
      >
        <Link to="/">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/freelancing-2af5d.appspot.com/o/assets%2Flogo.jpg?alt=media&token=2b86205e-c740-4519-b808-84fe233e7a0b"
            }
            alt="Logo"
            style={{ height: "60px", width: "60px", borderRadius: "50%" }}
          />
        </Link>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
