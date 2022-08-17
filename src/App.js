import React from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { nanoid } from "nanoid";

export default function App() {
  const [isStarted, setIsStarted] = React.useState(false);
  const [datas, setDatas] = React.useState([]);
  const [isOver, setIsOver] = React.useState(false);
  const [score, setScore] = React.useState(0);

  function startQuiz() {
    // setIsStarted((prevState) => !prevState);
    setIsStarted(true);
    fetchQs();
  }

  // console.log(nanoid());

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * arr.length);
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  const fetchQs = () => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setDatas(
          data.results.map((data) => {
            return {
              question: data.question
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")
                .replace(/&#039;/g, "'")
                .replace(/&rsquo;/g, "''")
                .replace(/&ouml;/g, "ö"),

              answer: data.correct_answer.replace(/&quot;/g, '"'),
              options: shuffleArray(
                data.incorrect_answers.concat(data.correct_answer)
              ),
              selected_answer: "",
              id: nanoid(),
            };
          })
        )
      );
  };

  //React.useEffect(() => fetchQs, []);
  console.log(datas);

  // to save selected answer
  const setSelectAnswer = (id, answer) => {
    setDatas((prevDatas) => {
      return prevDatas.map((question) => {
        return question.id === id
          ? { ...question, selected_answer: answer }
          : question;
      });
    });
  };

  // quizElements that is passed into Quiz component
  const quizElements = datas.map((data) => {
    return (
      <Quiz
        key={data.id}
        id={data.id}
        question={data.question}
        answer={data.answer}
        options={data.options}
        selectedAnswer={data.selected_answer}
        isOver={isOver}
        setAnswer={setSelectAnswer}
        //setAnswer={}
      />
    );
  });

  // to check if all questions are answered
  const checkIfOver = () => {
    if (
      datas.length > 0 &&
      datas.every((data) => data.selected_answer !== "")
    ) {
      setIsOver(true);
      console.log(isOver);
    }
  };

  //React.useEffect(checkIfOver, [datas]);

  React.useEffect(() => {
    if (isOver) {
      const score = datas.reduce((acc, curr) => {
        return curr.selected_answer === curr.answer ? acc + 1 : acc;
      }, 0);
      setScore(score);
      console.log(score);
    }
  });

  return (
    <main>
      {!isStarted ? (
        <Start startFunc={() => startQuiz()} />
      ) : (
        <div className="quiz-container">
          <div className="quiz-elements">{quizElements}</div>
          {isOver ? (
            <div className="score-section">
              <h3 className="score">Your score: {score}/5</h3>
              <button
                className="restart-btn"
                onClick={() => {
                  fetchQs();
                  setIsOver(false);
                }}
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="submit-btn-container">
              <button className="submit-btn" onClick={checkIfOver}>
                Check Answers
              </button>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
