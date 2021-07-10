import React from "react";
import { Calculator } from "react-bootstrap-icons";

const HeadComponent = () => (
  <header className="app-header">
    <div>
      <Calculator color="#b0182b" style={{ paddingRight: "10px" }} size={22} />
      <span>Age Calculator</span>
    </div>
  </header>
);

export default HeadComponent;
