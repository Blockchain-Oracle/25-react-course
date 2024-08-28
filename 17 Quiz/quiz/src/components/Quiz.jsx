import "./quiz.css";
import React, { useState, useEffect, useCallback } from "react";
import Quiz from "react-quiz-component";
import { quiz } from "./QuizQuestion";

export default function QuizComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
    if (prefersDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode");
  };

  const addRipple = useCallback((e) => {
    const ripple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, ripple]);

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== ripple.id)
      );
    }, 1000);
  }, []);

  const renderCustomResultPage = (obj) => {
    return (
      <div className="custom-result-page">
        <h2>Quiz Completed!</h2>
        <p>
          Total Score: {obj.correctPoints} out of {obj.totalPoints}
        </p>
        <p>
          Correct Answers: {obj.correctAnswers} out of {obj.numberOfQuestions}
        </p>
        <button
          className="restart-button"
          onClick={() => window.location.reload()}
        >
          Restart Quiz
        </button>
      </div>
    );
  };

  const onComplete = (obj) => {
    console.log("Quiz completed!", obj);
    // You can add any additional logic here
  };

  const onQuestionSubmit = (obj) => {
    console.log("Question submitted:", obj);
    setCurrentQuestionIndex(obj.currentQuestionIndex);
  };

  return (
    <div
      className={`quiz-container ${isDarkMode ? "dark-mode" : ""}`}
      onClick={addRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
          }}
        />
      ))}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <Quiz
        quiz={quiz}
        shuffle={true}
        showInstantFeedback={true}
        continueTillCorrect={false}
        timer={60}
        allowPauseTimer={true}
        showDefaultResult={false}
        customResultPage={renderCustomResultPage}
        onComplete={onComplete}
        onQuestionSubmit={onQuestionSubmit}
      />
      <div className="question-progress">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </div>
    </div>
  );
}
