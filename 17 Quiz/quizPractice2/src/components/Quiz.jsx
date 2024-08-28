import { useState } from "react";
import { quiz } from "./QuizQuestion";
import "./quiz.css";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(
    Array(quiz.questions.length).fill(null)
  );
  const [score, setScore] = useState(0);

  const handleSelectionBtn = (selection) => {
    setCurrentSelection((prev) => {
      const newSelections = [...prev];
      newSelections[currentQuestionIndex] = selection;
      return newSelections;
    });
  };

  const handlePrevButton = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleNextButton = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (
      currentSelection[currentQuestionIndex] == currentQuestion.correctAnswer
    ) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex === quiz.questions.length - 1) {
      setHasEnded(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
    console.log(currentSelection);
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setCurrentSelection(Array(quiz.questions.length).fill(null));
    setHasEnded(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quiz.quizTitle}</h1>
      <div className="quiz-wrapper">
        {hasEnded ? (
          <div className="quiz-ended-container">
            <h3>Quiz Completed</h3>
            <h4>
              Your score: {score} out of {quiz.questions.length}
            </h4>
            <button className="restart-btn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        ) : (
          <div className="current-quiz-container">
            <h3 className="quiz-number">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </h3>
            <div className="quiz-question-container">
              <p className="question">
                {quiz.questions[currentQuestionIndex].question}
              </p>
            </div>
            <div className="options-container">
              {quiz.questions[currentQuestionIndex].answers.map(
                (option, index) => (
                  <button
                    key={index + 1}
                    className={`option-btn ${
                      currentSelection[currentQuestionIndex] === index + 1
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleSelectionBtn(index + 1)}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
            <div className="prev-next">
              <button
                className="prev-btn"
                disabled={currentQuestionIndex === 0}
                onClick={handlePrevButton}
              >
                Previous
              </button>

              <div className="pagination-btn-container">
                {quiz.questions.map((_, questionIndex) => (
                  <button
                    key={questionIndex + 1}
                    onClick={() => setCurrentQuestionIndex(questionIndex)}
                    className={`pagination-btn ${
                      currentQuestionIndex === questionIndex ? "active" : ""
                    }`}
                    disabled={currentQuestionIndex === questionIndex}
                  >
                    {questionIndex + 1}
                  </button>
                ))}
              </div>

              <button
                className="next-btn"
                disabled={currentSelection[currentQuestionIndex] === null}
                onClick={handleNextButton}
              >
                {currentQuestionIndex === quiz.questions.length - 1
                  ? "Submit"
                  : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
