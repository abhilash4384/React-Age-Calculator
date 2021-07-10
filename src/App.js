import React from "react";
import "./App.css";

import HeadComponent from "components/headComponent";
import FormComponent from "components/formComponent";

function App() {
  return (
    <div className="container">
      <div className="main">
        <HeadComponent />
        <FormComponent />
      </div>
    </div>
  );
}

export default App;
