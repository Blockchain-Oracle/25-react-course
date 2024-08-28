/**
 * QuizComponent - A React component for rendering an interactive quiz.
 *
 * This component manages the state and logic for a quiz application, including:
 * - Displaying questions and answer options
 * - Handling user selections
 * - Tracking score
 * - Managing quiz progress (next/previous questions)
 * - Implementing a countdown timer
 * - Toggling dark mode
 *
 * The component uses data from an imported 'quiz' object, which should contain
 * the quiz title, questions, and answer options.
 *
 * @component
 */

import "./quiz.css";
import React, { useState } from "react";
import { quiz } from "./QuizQuestion";

export default function QuizComponent({ intialValue = 100 }) {
  // State variables
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [showResults, setShowResult] = React.useState(false);
  const [selectedoption, setSelectedoption] = React.useState(
    Array(quiz.questions.length).fill(null)
  );
  const [score, setScore] = React.useState(0);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [time, setTime] = useState(intialValue);

  /**
   * Effect hook to manage the countdown timer.
   * Decrements the timer every second and ends the quiz when time runs out.
   */
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prev) => {
          if (prev === 0) {
            clearInterval(interval);
          }
          return prev - 1;
        });
      } else {
        clearInterval(interval);
        setShowResult(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  /**
   * Handles moving to the next question or submitting the quiz.
   * Updates the score if the current answer is correct.
   */
  const handleNextQuestion= () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (selectedoption[cur rentQuestionIndex] == currentQuestion.correctAnswer) {
      setScore((prev) => prev + parseInt(currentQuestion.point, 10));
    }
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setTime(0);
      setShowResult(true);
    }
  };

  /**
   * Handles moving to the previous question.
   */
  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  /**
   * Handles user selection of an answer option.
   * @param {number} answerPicked - The index of the selected answer.
   */
  const handleAnswerClick = (answerPicked) => {
    setSelectedoption((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[currentQuestionIndex] = answerPicked;
      return newOptions;
    });
  };

  /**
   * Resets the quiz to its initial state.
   */
  const handleResetBtn = () => {
    setScore(0);
    setShowResult(false);
    setCurrentQuestionIndex(0);
    setSelectedoption(Array(quiz.questions.length).fill(null));
    setTime(intialValue);
  };

  /**
   * Toggles dark mode for the quiz interface.
   */
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  return (
    <div className={`quiz-container ${isDarkMode ? "dark-mode" : ""}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <h2>{quiz.quizTitle}</h2>
      <h3 className="timer">
        {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
      </h3>
      {showResults ? (
        <div className="quiz-completed">
          <h3>Quiz completed</h3>
          <p>Your score: {score}</p>
          <button className="restart-button" onClick={handleResetBtn}>
            Restart
          </button>
        </div>
      ) : (
        <div className="quiz-question-container">
          <div className="quiz-question">
            <h3 className="current-question">
              Question: {currentQuestionIndex + 1}
            </h3>
            <p>{quiz.questions[currentQuestionIndex].question}</p>
          </div>
          <div className="options">
            {quiz.questions[currentQuestionIndex].answers.map(
              (option, index) => (
                <button
                  key={index + 1}
                  className={`option ${
                    selectedoption[currentQuestionIndex] === index + 1
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(index + 1)}
                >
                  {option}
                </button>
              )
            )}
          </div>
          <div className="button-container">
            <button
              disabled={currentQuestionIndex === 0}
              className="prev-btn"
              onClick={handlePrevQuestion}
            >
              Prev
            </button>
            <button
              className="next-btn"
              onClick={handleNextQuestion}
              disabled={selectedoption[currentQuestionIndex] === null}
            >
              {currentQuestionIndex < quiz.questions.length - 1
                ? "Next"
                : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
