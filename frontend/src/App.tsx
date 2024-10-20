import React from "react";
import "./styles/general.scss";
import Dashboard from "./dashboard";
import Timeline from "./timeline";

function App() {
  return (
    <div className="main">
      <Dashboard />
      <Timeline />
    </div>
  );
}

export default App;
