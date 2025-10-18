"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/app/components/new/userContext.js";
import { generateContent } from "@/lib/SkillupAI.js";

import { WordEasy } from "../question-paper/WordEasy.jsx";
import { WordMedium } from "../question-paper/WordMedium.jsx";
import { WordHard } from "../question-paper/WordHard.jsx";
import { ExcelEasy } from "../question-paper/ExcelEasy.jsx";
import { ExcelMedium } from "../question-paper/ExcelMedium.jsx";
import { ExcelHard } from "../question-paper/ExcelHard.jsx";
import { FaRobot } from 'react-icons/fa';

// Text Formatter Component for AI Responses
function FormattedText({ text }) {
  if (!text) return null;

  const formatText = (text) => {
    // Split by line breaks and process each line
    return text.split('\n').map((line, index) => {
      line = line.trim();
      if (!line) return <br key={index} />;

      // Handle numbered lists (1. 2. 3.)
      if (/^\d+\./.test(line)) {
        return (
          <div key={index} className="flex items-start gap-2 mb-3">
            <span className="font-bold text-blue-600 min-w-[1.5rem]">{line.match(/^\d+\./)[0]}</span>
            <span className="text-gray-700">{line.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '')}</span>
          </div>
        );
      }

      // Handle bullet points (* or -)
      if (/^[\*\-]\s/.test(line)) {
        return (
          <div key={index} className="flex items-start gap-2 mb-2 ml-4">
            <span className="text-blue-600 mt-1 font-bold">•</span>
            <span className="text-gray-700">{line.replace(/^[\*\-]\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '')}</span>
          </div>
        );
      }

      // Handle bold text with colons (like "**Why Ctrl + B is correct:**")
      if (line.includes('**') && line.includes(':')) {
        const parts = line.split(':');
        const boldPart = parts[0].replace(/\*\*/g, '').trim();
        const restPart = parts.slice(1).join(':').trim().replace(/\*\*/g, '').replace(/\*/g, '');
        
        return (
          <div key={index} className="mb-3">
            <span className="font-bold text-gray-900 text-lg">{boldPart}:</span>
            <span className="text-gray-700 ml-2">{restPart}</span>
          </div>
        );
      }

      // Clean text by removing all markdown symbols
      const cleanText = line.replace(/\*\*/g, '').replace(/\*/g, '');

      // Handle headings (lines that start with #)
      if (line.startsWith('#')) {
        const level = line.match(/^#+/)[0].length;
        const headingText = line.replace(/^#+\s*/, '').replace(/\*\*/g, '').replace(/\*/g, '');
        const className = level === 1 ? 'text-xl font-bold text-gray-900 mb-3' : 
                         level === 2 ? 'text-lg font-semibold text-gray-800 mb-2' : 
                         'text-base font-medium text-gray-700 mb-1';
        
        if (level === 1) {
          return <h1 key={index} className={className}>{headingText}</h1>;
        } else if (level === 2) {
          return <h2 key={index} className={className}>{headingText}</h2>;
        } else if (level === 3) {
          return <h3 key={index} className={className}>{headingText}</h3>;
        } else {
          return <h4 key={index} className={className}>{headingText}</h4>;
        }
      }

      // Regular paragraph - clean text without markdown
      return (
        <p key={index} className="mb-3 text-gray-700 leading-relaxed">{cleanText}</p>
      );
    });
  };

  return <div className="space-y-1">{formatText(text)}</div>;
}

// AI Explanation Modal Component
function AIExplanationModal({ isOpen, onClose, question, userAnswer, correctAnswer, isLoading, explanation, selectedLanguage, onLanguageChange }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blur bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-blue-500 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="bg-white text-blue-600 rounded-full p-1">
                🚀
              </span>
              Skillup AI Explanation
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Language Selection */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">🌐 Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              <option value="english">English</option>
              <option value="hindi">Roman English</option>
              <option value="punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
            
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Question */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Question:</h3>
            <p className="text-gray-800">{question}</p>
          </div>

          {/* Answer Status */}
          <div className={`mb-6 p-4 rounded-lg border ${
            userAnswer === correctAnswer 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-full ${
                userAnswer === correctAnswer ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {userAnswer === correctAnswer ? '✓' : '✗'}
              </div>
              <div>
                <span className="font-semibold">
                  {userAnswer === correctAnswer ? 'Correct!' : 'Incorrect'}
                </span>
                <p className="text-sm text-gray-600">
                  Your answer: <span className="font-medium">{userAnswer}</span>
                </p>
              </div>
            </div>
            <p className="text-sm">
              <span className="font-semibold text-green-600">Correct answer:</span> {correctAnswer}
            </p>
          </div>

          {/* Explanation */}
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-purple-600">🤖</span>
                AI Explanation
              </h3>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="flex items-center justify-center gap-3 py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="text-gray-600">Skillup AI is analyzing the question...</span>
                </div>
              ) : explanation ? (
                <div className="max-w-none">
                  <FormattedText text={explanation} />
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Unable to load explanation
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}

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

  const [aiState, setAiState] = useState({
    isModalOpen: false,
    currentQuestion: null,
    isLoading: false,
    explanation: "",
    selectedLanguage: "english", 
  });

  const questionsMap = {
    WordEasy, WordMedium, WordHard,
    ExcelEasy, ExcelMedium, ExcelHard,
  };

  // Ensure exactly 30 questions
  const questions = questionsMap[examId]?.slice(0, 30) || [];

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

  // AI Explanation Handler
  const handleAIExplanation = async (questionIndex, selectedLang = null) => {
    const question = questions[questionIndex];
    const userAnswer = state.answers[questionIndex];
    const currentLanguage = selectedLang || aiState.selectedLanguage;
    
    setAiState(prev => ({
      ...prev,
      isModalOpen: true,
      currentQuestion: questionIndex,
      isLoading: true,
      explanation: "",
    }));

    try {
      const languageInstructions = {
        english: "Respond in English. Use simple English words that any student can understand.",
        hindi: "Respond in Hindi. Use simple Hindi words (हिंदी में जवाब दें). Make it easy to understand for Hindi students.",
        punjabi: "Respond in Punjabi. Use simple Punjabi words (ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ). Make it easy to understand for Punjabi students."
      };

      const prompt = `
        You are a friendly teacher helping a student understand a multiple choice question. ${languageInstructions[currentLanguage]}
        
        Question: ${question.question}
        
        Options:
        ${question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')}
        
        Correct Answer: ${question.answer}
        User's Answer: ${userAnswer || 'Not answered'}
        
        IMPORTANT INSTRUCTIONS:
        1. Use only simple, everyday words that any student can understand
        2. Avoid technical jargon or complex terms
        3. Explain like you're talking to a 12-year-old student
        4. Keep sentences short and clear
        5. Use examples from daily life when possible
        
        Format your response exactly like this:
        
        **Why [correct answer] is correct:** [Simple explanation in easy words]
        
        **Why the other options are wrong:**
        * [Option 1]: [Simple reason why it's wrong]
        * [Option 2]: [Simple reason why it's wrong]  
        * [Option 3]: [Simple reason why it's wrong]
        
        **Key concept:** [One simple sentence about what the student should remember]
        
        Rules:
        - Use **bold text** for section headers
        - Use bullet points (*) for lists
        - Maximum 120 words total
        - Use words like "helps", "makes", "easy", "simple", "good", "bad"
        - Avoid words like "utilize", "implement", "facilitate", "comprehensive"
        - Make it sound like a helpful friend explaining, not a textbook
      `;

      const explanation = await generateContent({ prompt });
      setAiState(prev => ({
        ...prev,
        isLoading: false,
        explanation: explanation.trim(),
      }));
    } catch (error) {
      console.error('AI Explanation error:', error);
      setAiState(prev => ({
        ...prev,
        isLoading: false,
        explanation: "Sorry, I couldn't generate an explanation at the moment. Please try again later.",
      }));
    }
  };

  // Language change handler
  const handleLanguageChange = async (newLanguage) => {
    setAiState(prev => ({
      ...prev,
      selectedLanguage: newLanguage,
    }));

    // Automatically regenerate explanation in new language if modal is open
    if (aiState.isModalOpen && aiState.currentQuestion !== null) {
      await handleAIExplanation(aiState.currentQuestion, newLanguage);
    }
  };


  const formatExamId = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
  };



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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const progress = Math.round((Object.keys(state.answers).length / questions.length) * 100);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your exam...</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Exam ID</h1>
          <p className="text-gray-600 mb-6">The exam you're trying to access doesn't exist or is unavailable.</p>
          <Link href="/exams" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
            Back to Exam List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-sans">
      {/* AI Explanation Modal */}
      <AIExplanationModal
        isOpen={aiState.isModalOpen}
        onClose={() => setAiState(prev => ({ ...prev, isModalOpen: false }))}
        question={aiState.currentQuestion !== null ? questions[aiState.currentQuestion]?.question : ''}
        userAnswer={aiState.currentQuestion !== null ? state.answers[aiState.currentQuestion] : ''}
        correctAnswer={aiState.currentQuestion !== null ? questions[aiState.currentQuestion]?.answer : ''}
        isLoading={aiState.isLoading}
        explanation={aiState.explanation}
        selectedLanguage={aiState.selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Fixed Header with Timer */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-lg py-4 px-6 border-b border-gray-200">
        <div className="container mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-blue-400 text-white p-2 rounded-lg text-2xl">
              <FaRobot />
              <span>AI Powered</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Weekly Exam</h1>
              <p className="text-sm text-gray-600 capitalize">
                {formatExamId(examId)}
              </p>
            </div>
          </div>
                
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 border border-yellow-200 px-4 py-2 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-600">⏱️</span>
                <span className="text-lg font-bold text-gray-800">{formatTime(state.timeLeft)}</span>
              </div>
            </div>
            <div className="hidden md:block bg-blue-100 px-4 py-2 rounded-lg border border-blue-200">
              <span className="text-sm font-medium text-blue-800">
                Progress: {Object.keys(state.answers).length}/{questions.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Result Box */}
        {state.score !== null && (
          <div className="mb-8 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Exam Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">{state.score}/{questions.length * 2}</div>
                <div className="text-gray-600 font-medium">Total Score</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-green-200 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round((state.score / (questions.length * 2)) * 100)}%
                </div>
                <div className="text-gray-600 font-medium">Percentage</div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              {progress}% Complete ({Object.keys(state.answers).length}/{questions.length} questions)
            </span>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              state.isSubmitted 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {state.isSubmitted ? "✅ Submitted" : "⏳ In Progress"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {questions.map((q, index) => {
            const isCorrect = state.isSubmitted && state.answers[index] === q.answer;
            const isWrong = state.isSubmitted && state.answers[index] && state.answers[index] !== q.answer;

            return (
              <div 
                key={index}
                className={`bg-white border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${
                  isCorrect ? 'border-green-300 bg-green-50' : 
                  isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-lg font-semibold text-gray-800 flex-1">
                    <span className="text-blue-600 font-bold">Q{index + 1}:</span> {q.question}
                  </p>
                  {state.isSubmitted && (
                    <button
                      onClick={() => handleAIExplanation(index)}
                      className="ml-3 px-3 py-1 bg-blue-400 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all duration-200 flex items-center gap-1"
                    >
                      <span>🤖</span>
                      <span> Ask AI</span>
                    </button>
                  )}  
                </div>
                
                <div className="space-y-3">
                  {q.options.map((option, i) => {
                    const isSelected = state.answers[index] === option;
                    const showCorrect = state.isSubmitted && option === q.answer;
                    const showWrong = state.isSubmitted && isSelected && !showCorrect;

                    return (
                      <label 
                        key={i}
                        className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                          showCorrect ? 'border-green-400 bg-green-100 shadow-sm' :
                          showWrong ? 'border-red-400 bg-red-100 shadow-sm' :
                          isSelected ? 'border-blue-400 bg-blue-50 shadow-sm' : 
                          'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
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
                        <span className="ml-3 text-gray-700 flex-1">{option}</span>
                        {showCorrect && (
                          <span className="text-green-600 font-bold ml-2">✓</span>
                        )}
                        {showWrong && (
                          <span className="text-red-600 font-bold ml-2">✗</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {!state.isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Submit Answers
            </button>
          ) : (
            <div className="text-center">
              <div className="bg-green-100 border border-green-200 text-green-800 px-6 py-3 rounded-xl font-semibold mb-4">
                ✅ Exam Successfully Submitted
              </div>
              <p className="text-gray-600 mb-4">
                Review your answers and use the AI button 🤖 on each question for detailed explanations!
              </p>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link 
            href="/weekly-exam" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Exam List
          </Link>
        </div>
      </div>
    </div>
  );
}