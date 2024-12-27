import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api/v1`;


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
