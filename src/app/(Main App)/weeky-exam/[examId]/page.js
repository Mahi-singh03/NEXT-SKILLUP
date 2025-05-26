// app/exams/weekly-exam/[examId]/page.jsx
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../../components/UserContext.js";
import { WE_1 } from "@/WE_Question_paper/WE_1.jsx";
import { WE_2 } from "@/WE_Question_paper/WE_2.jsx";
import { WE_3 } from "@/WE_Question_paper/WE_3.jsx";
import { WE_4 } from "@/WE_Question_paper/WE_4.jsx";
import { WE_5 } from "@/WE_Question_paper/WE_5.jsx";
import { WE_6 } from "@/WE_Question_paper/WE_6.jsx";
import { WE_7 } from "@/WE_Question_paper/WE_7.jsx";
import { WE_8 } from "@/WE_Question_paper/WE_8.jsx";
import { WE_9 } from "@/WE_Question_paper/WE_9.jsx";
import { WE_10 } from "@/WE_Question_paper/WE_10.jsx";
import { WE_11 } from "@/WE_Question_paper/WE_11.jsx";
import { WE_12 } from "@/WE_Question_paper/WE_12.jsx";
import { WE_13 } from "@/WE_Question_paper/WE_13.jsx";
import { WE_14 } from "@/WE_Question_paper/WE_14.jsx";
import "../style/question.css";

export default function WeeklyExam({ params }) {
  const { examId } = params;
  const { isAuthenticated, loading } = useContext(UserContext);
  const router = useRouter();

  const [state, setState] = useState({
    answers: {},
    score: null,
    timeLeft: 45 * 60,
    isSubmitted: false,
    error: "",
  });

  const questionsMap = { WE_1, WE_2, WE_3, WE_4, WE_5, WE_6, WE_7, WE_8, WE_9, WE_10, WE_11, WE_12, WE_13, WE_14 };
  const questions = questionsMap[examId] || [];

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Scroll to top after submission
  useEffect(() => {
    if (state.isSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.isSubmitted]);

  // Timer effect
  useEffect(() => {
    if (!questions.length) return;

    const timer = setInterval(() => {
      if (state.timeLeft > 0 && !state.isSubmitted) {
        setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      } else if (state.timeLeft === 0 && !state.isSubmitted) {
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeLeft, state.isSubmitted, questions.length]);

  const handleChange = (qIndex, option) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [qIndex]: option },
      error: "",
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(state.answers).length < questions.length) {
      setState((prev) => ({ ...prev, error: "Please answer all questions before submitting." }));
      return;
    }

    const totalScore = questions.reduce(
      (acc, q, index) => (state.answers[index] === q.answer ? acc + 2 : acc),
      0
    );

    setState((prev) => ({
      ...prev,
      score: totalScore,
      isSubmitted: true,
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const progress = Math.round((Object.keys(state.answers).length / questions.length) * 100);

  if (loading) return <div>Loading...</div>;

  if (!questions.length) return <div className="exam-container">Invalid exam ID</div>;

  return (
    <div className="exam-container">
      <div className="exam-header">
        <h1 className="exam-title">Weekly Exams</h1>
        <div className="timer">⏳ {formatTime(state.timeLeft)}</div>
      </div>

      {state.score !== null && (
        <div className="result-box">
          <h2>Exam Results</h2>
          <p>Your Score: {state.score} out of {questions.length * 2}</p>
          <p>Percentage: {Math.round((state.score / (questions.length * 2)) * 100)}%</p>
        </div>
      )}

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <p className="progress-text">
          Progress: {progress}% ({Object.keys(state.answers).length}/{questions.length})
        </p>
      </div>

      <div className="question-grid">
        {questions.map((q, index) => {
          const isCorrect = state.isSubmitted && state.answers[index] === q.answer;
          const isWrong = state.isSubmitted && state.answers[index] !== q.answer;

          return (
            <div
              key={index}
              className={`question-card ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
            >
              <p className="question-text">{index + 1}. {q.question}</p>
              <div className="options-container">
                {q.options.map((option, i) => {
                  const isSelected = state.answers[index] === option;
                  const showCorrect = state.isSubmitted && option === q.answer;
                  const showWrong = state.isSubmitted && isSelected && !showCorrect;

                  return (
                    <label
                      key={i}
                      className={`option ${showCorrect ? "correct-answer" : ""} ${
                        showWrong ? "wrong-answer" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleChange(index, option)}
                        checked={isSelected}
                        disabled={state.isSubmitted}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="submit-button"
        disabled={state.isSubmitted}
      >
        {state.isSubmitted ? "Submitted" : "Submit"}
      </button>

      {state.error && <div className="error-message">{state.error}</div>}

      <Link href="/exams" className="back-link">
        Back to Exam List
      </Link>
    </div>
  );
}