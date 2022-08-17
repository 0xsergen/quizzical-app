import React from "react";

export default function Quiz(props) {
  const optionElements = props.options.map((opt) => {
    let clickAnswer;
    let styles;

    if (props.isOver) {
      if (opt === props.answer) {
        styles = {
          backgroundColor: "#94D7A2",
          color: "#293264",
        };
      } else if (props.selectedAnswer === opt) {
        styles = {
          backgroundColor: "#F8BCBC",
          color: "#293264",
        };
      }
    } else {
      clickAnswer = () => {
        props.setAnswer(props.id, opt);
      };

      styles = {
        backgroundColor: props.selectedAnswer === opt ? "#D6DBF5" : "white",
      };
    }

    return (
      <button
        className="answer-section-btn"
        key={opt}
        onClick={clickAnswer}
        style={styles}
      >
        {opt}
      </button>
    );
  });

  return (
    <main className="quiz" key={props.id}>
      <p className="question-section">{props.question}</p>
      <div className="answer-section">{optionElements}</div>
    </main>
  );
}
