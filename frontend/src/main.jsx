import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api/v1`;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    try {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("ServiceWorker registration failed: ", error);
        });
    } catch (error) {
      console.error("ServiceWorker registration encountered an error: ", error);
    }
  });
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
