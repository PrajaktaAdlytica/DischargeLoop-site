import React from "react";
import { createRoot } from "react-dom/client";
import { Website } from "./Website.jsx";
import "./styles.css";
import "./homepage.css";
import "./journey-canvas.css";
import "./website.css";
import "./intro/intro.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Website />
  </React.StrictMode>,
);
