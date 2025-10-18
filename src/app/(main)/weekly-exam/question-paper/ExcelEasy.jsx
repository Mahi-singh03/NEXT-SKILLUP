import { useState } from 'react';

const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const allQuestions = [
    {
        "question": "What is the default file extension for a Microsoft Excel workbook?",
        "options": [".xls", ".xlsx", ".csv", ".txt"],
        "answer": ".xlsx"
    },
    {
        "question": "Which key combination is used to save a workbook?",
        "options": ["Ctrl + S", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
        "answer": "Ctrl + S"
    },
    {
        "question": "What is the intersection of a row and column called?",
        "options": ["Cell", "Box", "Square", "Field"],
        "answer": "Cell"
    },
    {
        "question": "Which tab contains the most commonly used formatting options?",
        "options": ["Insert", "Page Layout", "Home", "Data"],
        "answer": "Home"
    },
    {
        "question": "What does the formula =A1+B1 do?",
        "options": ["Multiplies A1 and B1", "Adds A1 and B1", "Divides A1 by B1", "Subtracts B1 from A1"],
        "answer": "Adds A1 and B1"
    },
    {
        "question": "Which function is used to find the sum of a range of cells?",
        "options": ["COUNT", "SUM", "AVERAGE", "MAX"],
        "answer": "SUM"
    },
    {
        "question": "What is the shortcut to select all cells in a worksheet?",
        "options": ["Ctrl + A", "Ctrl + S", "Ctrl + C", "Ctrl + V"],
        "answer": "Ctrl + A"
    },
    {
        "question": "Which key is used to edit the active cell?",
        "options": ["Enter", "F2", "Space", "Tab"],
        "answer": "F2"
    },
    {
        "question": "What does the AutoSum button do?",
        "options": ["Counts cells", "Finds the average", "Adds up numbers", "Finds the maximum"],
        "answer": "Adds up numbers"
    },
    {
        "question": "Which view shows how the worksheet will look when printed?",
        "options": ["Normal View", "Page Layout View", "Page Break Preview", "Custom View"],
        "answer": "Page Layout View"
    },
    {
        "question": "What is the maximum number of rows in a modern Excel worksheet?",
        "options": ["65,536", "1,048,576", "16,384", "32,768"],
        "answer": "1,048,576"
    },
    {
        "question": "Which function is used to count the number of cells that contain numbers?",
        "options": ["COUNT", "COUNTA", "COUNTIF", "SUM"],
        "answer": "COUNT"
    },
    {
        "question": "What does the formula =A1*B1 do?",
        "options": ["Adds A1 and B1", "Multiplies A1 and B1", "Divides A1 by B1", "Subtracts B1 from A1"],
        "answer": "Multiplies A1 and B1"
    },
    {
        "question": "Which key combination is used to copy selected cells?",
        "options": ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
        "answer": "Ctrl + C"
    },
    {
        "question": "What does the formula =A1/B1 do?",
        "options": ["Adds A1 and B1", "Multiplies A1 and B1", "Divides A1 by B1", "Subtracts B1 from A1"],
        "answer": "Divides A1 by B1"
    },
    {
        "question": "Which function is used to find the average of a range of cells?",
        "options": ["SUM", "COUNT", "AVERAGE", "MAX"],
        "answer": "AVERAGE"
    },
    {
        "question": "What is the shortcut to paste copied cells?",
        "options": ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
        "answer": "Ctrl + V"
    },
    {
        "question": "Which function is used to find the largest number in a range?",
        "options": ["MIN", "MAX", "SUM", "AVERAGE"],
        "answer": "MAX"
    },
    {
        "question": "What does the formula =A1-B1 do?",
        "options": ["Adds A1 and B1", "Multiplies A1 and B1", "Divides A1 by B1", "Subtracts B1 from A1"],
        "answer": "Subtracts B1 from A1"
    },
    {
        "question": "Which function is used to find the smallest number in a range?",
        "options": ["MIN", "MAX", "SUM", "AVERAGE"],
        "answer": "MIN"
    },
    {
        "question": "What is the shortcut to cut selected cells?",
        "options": ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
        "answer": "Ctrl + X"
    },
    {
        "question": "Which function is used to count all non-empty cells?",
        "options": ["COUNT", "COUNTA", "COUNTIF", "SUM"],
        "answer": "COUNTA"
    },
    {
        "question": "What does the formula =A1^B1 do?",
        "options": ["Adds A1 and B1", "Multiplies A1 and B1", "Raises A1 to the power of B1", "Divides A1 by B1"],
        "answer": "Raises A1 to the power of B1"
    },
    {
        "question": "Which key combination is used to undo the last action?",
        "options": ["Ctrl + Z", "Ctrl + Y", "Ctrl + U", "Ctrl + R"],
        "answer": "Ctrl + Z"
    },
    {
        "question": "What does the formula =A1&B1 do?",
        "options": ["Adds A1 and B1", "Multiplies A1 and B1", "Concatenates A1 and B1", "Divides A1 by B1"],
        "answer": "Concatenates A1 and B1"
    },
    {
        "question": "Which function is used to find the current date?",
        "options": ["TODAY", "NOW", "DATE", "TIME"],
        "answer": "TODAY"
    },
    {
        "question": "What is the shortcut to redo the last undone action?",
        "options": ["Ctrl + Z", "Ctrl + Y", "Ctrl + U", "Ctrl + R"],
        "answer": "Ctrl + Y"
    },
    {
        "question": "Which function is used to find the current date and time?",
        "options": ["TODAY", "NOW", "DATE", "TIME"],
        "answer": "NOW"
    },
    {
        "question": "What does the formula =A1=B1 do?",
        "options": ["Adds A1 and B1", "Compares A1 and B1 for equality", "Multiplies A1 and B1", "Divides A1 by B1"],
        "answer": "Compares A1 and B1 for equality"
    },
    {
        "question": "Which function is used to find the length of text in a cell?",
        "options": ["LEN", "LENGTH", "TEXT", "CHAR"],
        "answer": "LEN"
    },
    {
        "question": "What is the shortcut to open the Find and Replace dialog?",
        "options": ["Ctrl + F", "Ctrl + H", "Ctrl + G", "Ctrl + E"],
        "answer": "Ctrl + F"
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
export const ExcelEasy = getRandomQuestions(allQuestions, 30);
