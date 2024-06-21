import enableMocking from "./mock";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./vars.css";
import "./reset.css";
import "./index.css";

if (import.meta.env.DEV || !import.meta.env.VITE_BACKEND_URL)
  await enableMocking();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
