import React from "react";
import "./../spinner.css";

export default function LoadingSpinner() {
  console.log("LoadingSpinner");
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
