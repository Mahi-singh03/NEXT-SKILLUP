
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../../components/UserContext.js";
import { WE_1 } from "../question-paper/WE_1.jsx";
import { WE_2 } from "../question-paper/WE_2.jsx";
import { WE_3 } from "../question-paper/WE_3.jsx";
import { WE_4 } from "../question-paper/WE_4.jsx";
import { WE_5 } from "../question-paper/WE_5.jsx";
import { WE_6 } from "../question-paper/WE_6.jsx";
import { WE_7 } from "../question-paper/WE_7.jsx";
import { WE_8 } from "../question-paper/WE_8.jsx";
import { WE_9 } from "../question-paper/WE_9.jsx";
import { WE_10 } from "../question-paper/WE_10.jsx";
import { WE_11 } from "../question-paper/WE_11.jsx";
import { WE_12 } from "../question-paper/WE_12.jsx";
import { WE_13 } from "../question-paper/WE_13.jsx";
import { WE_14 } from "../question-paper/WE_14.jsx";

export default function WeeklyExam() {
  const { examId } = useParams();
  const { isAuthenticated, loading } = useContext(UserContext);
  const router = useRouter();

  const [state, setState] = useState({
    answers: {},
    score: null,
    timeLeft: 45 * 60,
    isSubmitted: false,
    error: "",
  });

  const questionsMap = {
    WE_1, WE_2, WE_3, WE_4, WE_5, WE_6, WE_7, WE_8,
    WE_9, WE_10, WE_11, WE_12, WE_13, WE_14
  };

  // Ensure exactly 30 questions
  const questions = questionsMap[examId]?.slice(0, 30) || [];

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
    
    if (state.timeLeft > 0 && !state.isSubmitted) {
      const timer = setInterval(() => {
        setState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else if (state.timeLeft === 0 && !state.isSubmitted) {
      handleSubmit();
    }
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
      setState((prev) => ({ 
        ...prev, 
        error: "Please answer all questions before submitting." 
      }));
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#e3f1f1] p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid Exam ID</h1>
          <p className="text-gray-600 mb-6">The exam you're trying to access doesn't exist.</p>
          <Link href="/exams" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Back to Exam List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[1200px] mx-auto font-sans py-7 px-[10%]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[44px] font-bold text-[#1E90FF]">Weekly Exams</h1>
        <div className="text-[28px] font-bold bg-[#FFE819] px-4 py-1 rounded-md">
          ⏳ {formatTime(state.timeLeft)}
        </div>
      </div>

      {/* Result Box */}
      {state.score !== null && (
        <div className="mt-5 p-5 bg-[#CEE6E7] rounded-md text-center text-[69px]">
          <h2 className="text-[20px] font-bold">Exam Results</h2>
          <p>Your Score: {state.score} out of {questions.length * 2}</p>
          <p>Percentage: {Math.round((state.score / (questions.length * 2)) * 100)}%</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-white rounded-md h-5 mb-5 relative">
        <div 
          className="h-5 bg-[#51C90B] rounded-md transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
        <p className="text-[44px] pt-5 mb-[100px]">
          Progress: {progress}% ({Object.keys(state.answers).length}/{questions.length})
        </p>
      </div>

      {/* Error Message */}
      {state.error && (
        <div className="bg-[#FFDDDD] text-red-600 p-2.5 mb-3.5 rounded-md text-center">
          {state.error}
        </div>
      )}

      {/* Questions Grid */}
      <div className="pt-[100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {questions.map((q, index) => {
          const isCorrect = state.isSubmitted && state.answers[index] === q.answer;
          const isWrong = state.isSubmitted && state.answers[index] && state.answers[index] !== q.answer;

          return (
            <div 
              key={index}
              className={`bg-white border border-gray-300 rounded-lg p-5 shadow-md transition-transform duration-200 hover:scale-[1.02] ${
                isCorrect ? 'border-2 border-[#4CAF50] bg-[#E8F5E9]' : 
                isWrong ? 'border-2 border-[#F44336] bg-[#FFEBEE]' : ''
              }`}
            >
              <p className="text-base font-bold mb-2.5">
                {index + 1}. {q.question}
              </p>
              <div className="flex flex-col gap-2.5">
                {q.options.map((option, i) => {
                  const isSelected = state.answers[index] === option;
                  const showCorrect = state.isSubmitted && option === q.answer;
                  const showWrong = state.isSubmitted && isSelected && !showCorrect;

                  return (
                    <label 
                      key={i}
                      className={`flex items-center gap-2.5 p-2.5 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 ${
                        showCorrect ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50] font-bold' :
                        showWrong ? 'border-[#F44336] bg-[#FFEBEE] text-[#F44336] font-bold' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleChange(index, option)}
                        checked={isSelected}
                        disabled={state.isSubmitted}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={state.isSubmitted}
        className="w-full py-3 mt-5 text-base font-bold bg-[#007BFF] text-white rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {state.isSubmitted ? "Submitted" : "Submit"}
      </button>

      {/* Back Link */}
      <div className="text-center mt-5">
        <Link 
          href="/exams" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          ← Back to Exam List
        </Link>
      </div>
    </div>
  );
}
