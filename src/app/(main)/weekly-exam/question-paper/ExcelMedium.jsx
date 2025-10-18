import { useState } from 'react';

const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const allQuestions = [
    {
        "question": "Which function is used to look up a value in a table and return a corresponding value?",
        "options": ["VLOOKUP", "HLOOKUP", "LOOKUP", "INDEX"],
        "answer": "VLOOKUP"
    },
    {
        "question": "What does the IF function do?",
        "options": ["Performs a calculation", "Tests a condition and returns one value if true, another if false", "Finds the maximum value", "Counts cells"],
        "answer": "Tests a condition and returns one value if true, another if false"
    },
    {
        "question": "Which function is used to find the position of a value in a range?",
        "options": ["MATCH", "FIND", "SEARCH", "LOCATE"],
        "answer": "MATCH"
    },
    {
        "question": "What does the SUMIF function do?",
        "options": ["Adds all numbers in a range", "Adds numbers that meet a specific criteria", "Finds the sum of two ranges", "Counts cells with numbers"],
        "answer": "Adds numbers that meet a specific criteria"
    },
    {
        "question": "Which function is used to count cells that meet multiple criteria?",
        "options": ["COUNTIF", "COUNTIFS", "SUMIF", "SUMIFS"],
        "answer": "COUNTIFS"
    },
    {
        "question": "What does the INDEX function do?",
        "options": ["Finds the position of a value", "Returns the value at a specific position in a range", "Looks up a value", "Tests a condition"],
        "answer": "Returns the value at a specific position in a range"
    },
    {
        "question": "Which function is used to find the sum of cells that meet multiple criteria?",
        "options": ["SUMIF", "SUMIFS", "COUNTIF", "COUNTIFS"],
        "answer": "SUMIFS"
    },
    {
        "question": "What does the CONCATENATE function do?",
        "options": ["Adds numbers", "Joins text from multiple cells", "Finds the average", "Counts cells"],
        "answer": "Joins text from multiple cells"
    },
    {
        "question": "Which function is used to find the average of cells that meet a specific criteria?",
        "options": ["AVERAGE", "AVERAGEIF", "SUMIF", "COUNTIF"],
        "answer": "AVERAGEIF"
    },
    {
        "question": "What does the ROUND function do?",
        "options": ["Finds the maximum value", "Rounds a number to a specified number of digits", "Counts cells", "Tests a condition"],
        "answer": "Rounds a number to a specified number of digits"
    },
    {
        "question": "Which function is used to find the current date and time?",
        "options": ["TODAY", "NOW", "DATE", "TIME"],
        "answer": "NOW"
    },
    {
        "question": "What does the LEFT function do?",
        "options": ["Returns the leftmost characters from a text string", "Finds the maximum value", "Tests a condition", "Counts cells"],
        "answer": "Returns the leftmost characters from a text string"
    },
    {
        "question": "Which function is used to find the rightmost characters from a text string?",
        "options": ["LEFT", "RIGHT", "MID", "LEN"],
        "answer": "RIGHT"
    },
    {
        "question": "What does the MID function do?",
        "options": ["Finds the middle value", "Returns characters from the middle of a text string", "Tests a condition", "Counts cells"],
        "answer": "Returns characters from the middle of a text string"
    },
    {
        "question": "Which function is used to find the length of text?",
        "options": ["LEN", "LENGTH", "TEXT", "CHAR"],
        "answer": "LEN"
    },
    {
        "question": "What does the UPPER function do?",
        "options": ["Finds the maximum value", "Converts text to uppercase", "Tests a condition", "Counts cells"],
        "answer": "Converts text to uppercase"
    },
    {
        "question": "Which function is used to convert text to lowercase?",
        "options": ["UPPER", "LOWER", "PROPER", "TEXT"],
        "answer": "LOWER"
    },
    {
        "question": "What does the PROPER function do?",
        "options": ["Finds the maximum value", "Capitalizes the first letter of each word", "Tests a condition", "Counts cells"],
        "answer": "Capitalizes the first letter of each word"
    },
    {
        "question": "Which function is used to find the number of workdays between two dates?",
        "options": ["DAYS", "WORKDAY", "NETWORKDAYS", "DATEDIF"],
        "answer": "NETWORKDAYS"
    },
    {
        "question": "What does the DATEDIF function do?",
        "options": ["Finds the maximum value", "Calculates the difference between two dates", "Tests a condition", "Counts cells"],
        "answer": "Calculates the difference between two dates"
    },
    {
        "question": "Which function is used to find the day of the week for a date?",
        "options": ["DAY", "WEEKDAY", "MONTH", "YEAR"],
        "answer": "WEEKDAY"
    },
    {
        "question": "What does the ISERROR function do?",
        "options": ["Finds the maximum value", "Tests if a value is an error", "Tests a condition", "Counts cells"],
        "answer": "Tests if a value is an error"
    },
    {
        "question": "Which function is used to find the number of days between two dates?",
        "options": ["DAYS", "DATEDIF", "NETWORKDAYS", "WORKDAY"],
        "answer": "DAYS"
    },
    {
        "question": "What does the TRIM function do?",
        "options": ["Finds the maximum value", "Removes extra spaces from text", "Tests a condition", "Counts cells"],
        "answer": "Removes extra spaces from text"
    },
    {
        "question": "Which function is used to find the number of characters in text?",
        "options": ["LEN", "LENGTH", "TEXT", "CHAR"],
        "answer": "LEN"
    },
    {
        "question": "What does the SUBSTITUTE function do?",
        "options": ["Finds the maximum value", "Replaces text in a string", "Tests a condition", "Counts cells"],
        "answer": "Replaces text in a string"
    },
    {
        "question": "Which function is used to find the position of text within another text?",
        "options": ["FIND", "SEARCH", "MATCH", "LOCATE"],
        "answer": "FIND"
    },
    {
        "question": "What does the SEARCH function do?",
        "options": ["Finds the maximum value", "Finds the position of text (case-insensitive)", "Tests a condition", "Counts cells"],
        "answer": "Finds the position of text (case-insensitive)"
    },
    {
        "question": "Which function is used to find the number of months between two dates?",
        "options": ["MONTHS", "DATEDIF", "NETWORKDAYS", "WORKDAY"],
        "answer": "DATEDIF"
    },
    {
        "question": "What does the RANK function do?",
        "options": ["Finds the maximum value", "Returns the rank of a number in a list", "Tests a condition", "Counts cells"],
        "answer": "Returns the rank of a number in a list"
    }
];

const questions = getRandomQuestions(allQuestions, 30);

const Question = ({ currentQuestion, onAnswerSubmit }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    
    const handleOptionSelect = (option) => {
      setSelectedAnswer(option);
    };
  
    const handleSubmit = () => {
      if (selectedAnswer) {
        onAnswerSubmit(selectedAnswer);
        setSelectedAnswer('');
      }
    };
  
    if (!questions[currentQuestion]) {
      return <div>No question available</div>;
    }
  
    const question = questions[currentQuestion];
  
    return (
      <div className="question-container">
        <h3>{question.question}</h3>
        <div className="options-container">
          {question.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="question-option"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleOptionSelect(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!selectedAnswer}
        >
          Submit Answer
        </button>
      </div>
    );
};

// Only export the 30 random questions and the component
export { questions };
export default Question;
export const ExcelMedium = getRandomQuestions(allQuestions, 30);