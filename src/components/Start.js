import React from "react";

export default function Start(props) {
  return (
    <div className="start-container">
      <h1 className="start-title">Quizzical</h1>
      <h3 className="start-desc">Show your knowledge!</h3>
      <button
        className="start-button"
        onClick={props.startFunc}
        disabled={props.isLoading}
      >
        Start Quiz
      </button>
    </div>
  );
}
