import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MarriageState from "./context/marriage/MarriageState";

ReactDOM.render(
  <MarriageState>
    <App />
  </MarriageState>,
  document.getElementById("root")
);
