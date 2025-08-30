const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const allQuestions =
    [
        {
            "question": "What is the correct file extension for a Python file?",
            "options": [".pyth", ".py", ".pt", ".python"],
            "answer": ".py"
        },
        {
            "question": "Which of these is used to define a function in Python?",
            "options": ["function", "def", "define", "func"],
            "answer": "def"
        },
        {
            "question": "What is the output of `print(2 + 3 * 2)`?",
            "options": ["10", "8", "7", "12"],
            "answer": "8"
        },
        {
            "question": "Which keyword is used to create a loop in Python?",
            "options": ["for", "loop", "while", "both for and while"],
            "answer": "both for and while"
        },
        {
            "question": "How do you start writing a single-line comment in Python?",
            "options": ["//", "/*", "#", "--"],
            "answer": "#"
        },
        {
            "question": "Which of the following is a valid variable name?",
            "options": ["2nd_name", "my-variable", "_my_var", "global"],
            "answer": "_my_var"
        },
        {
            "question": "What data type is the value `3.14`?",
            "options": ["int", "str", "float", "double"],
            "answer": "float"
        },
        {
            "question": "Which function is used to get input from the user?",
            "options": ["input()", "get()", "scan()", "read()"],
            "answer": "input()"
        },
        {
            "question": "What is the output of `print('Hello'[1])`?",
            "options": ["H", "e", "l", "o"],
            "answer": "e"
        },
        {
            "question": "Which collection is ordered and unchangeable?",
            "options": ["list", "tuple", "set", "dictionary"],
            "answer": "tuple"
        },
        {
            "question": "What is the result of `bool('False')`?",
            "options": ["False", "True", "None", "Error"],
            "answer": "True"
        },
        {
            "question": "Which operator is used to check if two values are equal?",
            "options": ["=", "==", "===", "!="],
            "answer": "=="
        },
        {
            "question": "What keyword is used to handle exceptions?",
            "options": ["try", "catch", "handle", "exception"],
            "answer": "try"
        },
        {
            "question": "How do you create a list of numbers from 0 to 5?",
            "options": ["list(0, 5)", "range(5)", "list(range(6))", "[0, 1, 2, 3, 4, 5]"],
            "answer": "list(range(6))"
        },
        {
            "question": "What method adds an element to the end of a list?",
            "options": [".add()", ".append()", ".insert()", ".push()"],
            "answer": ".append()"
        },
        {
            "question": "What is the output of `print(len('Python'))`?",
            "options": ["5", "6", "P", "y"],
            "answer": "6"
        },
        {
            "question": "Which of these is NOT a built-in data structure in Python?",
            "options": ["array", "list", "dictionary", "tuple"],
            "answer": "array"
        },
        {
            "question": "What does the `import` keyword do?",
            "options": ["Exports a module", "Includes a module to use", "Checks for errors", "Defines a library"],
            "answer": "Includes a module to use"
        },
        {
            "question": "What is the result of `10 // 3`?",
            "options": ["3.333", "3", "1", "4"],
            "answer": "3"
        },
        {
            "question": "Which symbol is used for string formatting to insert a variable's value?",
            "options": ["%", "$", "&", "#"],
            "answer": "%"
        },
        {
            "question": "What is the purpose of the `elif` keyword?",
            "options": ["To end a loop", "To define a function", "To mean 'else if'", "To handle an error"],
            "answer": "To mean 'else if'"
        },
        {
            "question": "What will `'hi' * 3` output?",
            "options": ["hihihi", "hi3", "Error", "h i h i h i"],
            "answer": "hihihi"
        },
        {
            "question": "Which of these is a mutable data type?",
            "options": ["tuple", "string", "list", "int"],
            "answer": "list"
        },
        {
            "question": "What is the output of `print(type(10))`?",
            "options": ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'number'>"],
            "answer": "<class 'int'>"
        },
        {
            "question": "How do you open a file named 'data.txt' for reading?",
            "options": ["open('data.txt', 'r')", "open('data.txt', 'read')", "open('data.txt')", "open('data.txt', 'w')"],
            "answer": "open('data.txt', 'r')"
        },
        {
            "question": "What keyword is used to return a value from a function?",
            "options": ["return", "break", "exit", "yield"],
            "answer": "return"
        },
        {
            "question": "What does the `pass` statement do?",
            "options": ["Stops the program", "Is a placeholder that does nothing", "Continues to the next loop iteration", "Exits a function"],
            "answer": "Is a placeholder that does nothing"
        },
        {
            "question": "Which collection does NOT allow duplicate elements?",
            "options": ["list", "tuple", "set", "dictionary values"],
            "answer": "set"
        },
        {
            "question": "What is the correct way to create an empty dictionary?",
            "options": ["{}", "[]", "dict()", "Both {} and dict()"],
            "answer": "Both {} and dict()"
        },
        {
            "question": "What is the output of `print('Hello'.upper())`?",
            "options": ["HELLO", "hello", "Hello", "Error"],
            "answer": "HELLO"
        },
        {
            "question": "Which module is used for working with dates and times?",
            "options": ["time", "datetime", "calendar", "All of the above"],
            "answer": "All of the above"
        },
        {
            "question": "What is the purpose of the `in` keyword?",
            "options": ["To check if a value exists in a sequence", "To import modules", "To define a loop", "To create a variable"],
            "answer": "To check if a value exists in a sequence"
        },
        {
            "question": "What will `list('abc')` return?",
            "options": ["['a', 'b', 'c']", "['abc']", "[abc]", "Error"],
            "answer": "['a', 'b', 'c']"
        },
        {
            "question": "Which method is used to remove the last item from a list?",
            "options": [".remove()", ".pop()", ".delete()", ".cut()"],
            "answer": ".pop()"
        },
        {
            "question": "What is the result of `'Hello' + 'World'`?",
            "options": ["HelloWorld", "Hello World", "Hello+World", "Error"],
            "answer": "HelloWorld"
        },
        {
            "question": "What does the `break` keyword do?",
            "options": ["Breaks out of the current loop", "Stops the entire program", "Breaks a string into a list", "Skips the current iteration"],
            "answer": "Breaks out of the current loop"
        },
        {
            "question": "How do you check if two variables point to the same object?",
            "options": ["==", "is", "=", "same()"],
            "answer": "is"
        },
        {
            "question": "What is the output of `min([5, 1, 8, 2])`?",
            "options": ["5", "1", "8", "2"],
            "answer": "1"
        },
        {
            "question": "Which of these is a valid way to create a set?",
            "options": ["{1, 2, 3}", "set([1, 2, 3])", "set((1, 2, 3))", "All of the above"],
            "answer": "All of the above"
        },
        {
            "question": "What is the main difference between a list and a tuple?",
            "options": ["Lists are ordered, tuples are not", "Lists are mutable, tuples are immutable", "Tuples can hold more data types", "There is no difference"],
            "answer": "Lists are mutable, tuples are immutable"
        }
    ]
  

  

  
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
export const WE_21 = getRandomQuestions(questions, 30);    