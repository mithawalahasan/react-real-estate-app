import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import HouseContext from "./components/HouseContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HouseContext>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </HouseContext>
);
