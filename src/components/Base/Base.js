import React from "react";
import Navbar from "../Navbar/Navbar";
function Base({ children }) {
  return (
    <div className="base">
      <Navbar />
      {children}
    </div>
  );
}

export default Base;
