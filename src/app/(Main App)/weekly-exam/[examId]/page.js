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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Weekly Exam {examId.split('_')[1]}</h1>
            <p className="text-gray-600 mt-1">Answer all questions to complete the exam</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-md font-bold ${
              state.timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              ⏳ {formatTime(state.timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {progress}% ({Object.keys(state.answers).length}/{questions.length} questions)
            </span>
            <span className="text-sm font-medium text-blue-600">
              {state.isSubmitted ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Results Display */}
        {state.isSubmitted && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border border-blue-200">
            <h2 className="text-xl font-bold text-center text-blue-800 mb-4">Exam Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Your Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {state.score} / {questions.length * 2}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Percentage</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((state.score / (questions.length * 2)) * 100)}%
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Correct Answers</p>
                <p className="text-2xl font-bold text-blue-600">
                  {state.score / 2} / {questions.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {state.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {questions.map((q, index) => {
            const isCorrect = state.isSubmitted && state.answers[index] === q.answer;
            const isWrong = state.isSubmitted && state.answers[index] && state.answers[index] !== q.answer;

            return (
              <div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${
                  isCorrect ? 'border-green-500 bg-green-50' : 
                  isWrong ? 'border-red-500 bg-red-50' : 'border-blue-500'
                } transition-all duration-200`}
              >
                <p className="font-medium text-gray-800 mb-4">
                  <span className="font-bold text-blue-600">Q{index + 1}:</span> {q.question}
                </p>
                
                <div className="space-y-3">
                  {q.options.map((option, i) => {
                    const isSelected = state.answers[index] === option;
                    const showCorrect = state.isSubmitted && option === q.answer;
                    const showWrong = state.isSubmitted && isSelected && !showCorrect;

                    return (
                      <label 
                        key={i}
                        className={`flex items-start p-3 rounded-lg border cursor-pointer ${
                          showCorrect ? 'border-green-500 bg-green-50' :
                          showWrong ? 'border-red-500 bg-red-50' :
                          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                        } transition-colors duration-200`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          onChange={() => handleChange(index, option)}
                          checked={isSelected}
                          disabled={state.isSubmitted}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`ml-3 text-sm ${
                          showCorrect ? 'text-green-800 font-medium' :
                          showWrong ? 'text-red-800 font-medium' : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {state.isSubmitted && (
                  <div className={`mt-4 p-3 rounded-md ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <p className="text-sm font-medium">
                      {isCorrect ? '✓ Correct answer' : `✗ Correct answer: ${q.answer}`}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {!state.isSubmitted && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 border-t">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Answered: {Object.keys(state.answers).length}/{questions.length}
                </p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={state.isSubmitted}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                Submit Exam
              </button>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link 
            href="/exams" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back to Exam List
          </Link>
        </div>
      </div>
    </div>
  );
}