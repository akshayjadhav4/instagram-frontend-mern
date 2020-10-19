import React from "react";
import Navbar from "../Navbar/Navbar";
function Base({ children }) {
  return (
    <div className="base">
      <Navbar />
      <div className="base__container" style={{ marginTop: "70px" }}>
        {children}
      </div>
    </div>
  );
}

export default Base;
