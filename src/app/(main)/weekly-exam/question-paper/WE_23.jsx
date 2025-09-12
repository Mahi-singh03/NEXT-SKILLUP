const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const allQuestions = [
    {
        "question": "Which of the following is the correct way to print 'Hello, World!' in Python?",
        "options": ["print('Hello, World!')", "echo 'Hello, World!'", "console.log('Hello, World!')", "System.out.println('Hello, World!')"],
        "answer": "print('Hello, World!')"
    },
    {
        "question": "What is the output of: print(2 + 3 * 2)",
        "options": ["10", "8", "12", "7"],
        "answer": "8"
    },
    {
        "question": "Which data type is used to store text in Python?",
        "options": ["str", "int", "txt", "string"],
        "answer": "str"
    },
    {
        "question": "How do you create a list in Python?",
        "options": ["list = [1, 2, 3]", "list = (1, 2, 3)", "list = {1, 2, 3}", "list = <1, 2, 3>"],
        "answer": "list = [1, 2, 3]"
    },
    {
        "question": "Which keyword is used to define a function in Python?",
        "options": ["def", "function", "define", "func"],
        "answer": "def"
    },
    {
        "question": "What is the result of: print(len('Python'))",
        "options": ["5", "6", "7", "P"],
        "answer": "6"
    },
    {
        "question": "Which operator is used for exponentiation in Python?",
        "options": ["^", "**", "*", "//"],
        "answer": "**"
    },
    {
        "question": "How do you start a comment in Python?",
        "options": ["//", "#", "/*", "--"],
        "answer": "#"
    },
    {
        "question": "What is the output of: print(10 // 3)",
        "options": ["3.333", "3", "4", "3.0"],
        "answer": "3"
    },
    {
        "question": "Which method is used to add an item to the end of a list?",
        "options": [".add()", ".append()", ".insert()", ".push()"],
        "answer": ".append()"
    },
    {
        "question": "What is the data type of: 3.14",
        "options": ["int", "float", "double", "decimal"],
        "answer": "float"
    },
    {
        "question": "How do you get user input in Python?",
        "options": ["input()", "get_input()", "read()", "scan()"],
        "answer": "input()"
    },
    {
        "question": "What is the output of: print('Hello' + 'World')",
        "options": ["Hello World", "HelloWorld", "Hello+World", "Error"],
        "answer": "HelloWorld"
    },
    {
        "question": "Which loop is used to iterate over a sequence?",
        "options": ["for", "while", "do-while", "loop"],
        "answer": "for"
    },
    {
        "question": "What is the result of: print(2 ** 3)",
        "options": ["6", "8", "9", "5"],
        "answer": "8"
    },
    {
        "question": "How do you check if two variables are equal in value?",
        "options": ["=", "==", "===", "!="],
        "answer": "=="
    },
    {
        "question": "Which collection is unordered and unindexed?",
        "options": ["list", "tuple", "set", "dictionary"],
        "answer": "set"
    },
    {
        "question": "What is the output of: print(type(5))",
        "options": ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'number'>"],
        "answer": "<class 'int'>"
    },
    {
        "question": "How do you create a tuple?",
        "options": ["t = (1, 2, 3)", "t = [1, 2, 3]", "t = {1, 2, 3}", "t = <1, 2, 3>"],
        "answer": "t = (1, 2, 3)"
    },
    {
        "question": "Which keyword is used to exit a loop prematurely?",
        "options": ["stop", "exit", "break", "return"],
        "answer": "break"
    },
    {
        "question": "What is the result of: print('python'.upper())",
        "options": ["PYTHON", "Python", "python", "Error"],
        "answer": "PYTHON"
    },
    {
        "question": "How do you access the first element of a list named 'my_list'?",
        "options": ["my_list[0]", "my_list[1]", "my_list.first", "my_list(0)"],
        "answer": "my_list[0]"
    },
    {
        "question": "Which operator is used for integer division?",
        "options": ["/", "//", "%", "**"],
        "answer": "//"
    },
    {
        "question": "What is the output of: print(bool(0))",
        "options": ["True", "False", "0", "Error"],
        "answer": "False"
    },
    {
        "question": "How do you create an empty dictionary?",
        "options": ["dict = {}", "dict = []", "dict = ()", "dict = set()"],
        "answer": "dict = {}"
    },
    {
        "question": "What is the result of: print(10 % 3)",
        "options": ["3", "1", "0", "3.333"],
        "answer": "1"
    },
    {
        "question": "Which function converts a string to an integer?",
        "options": ["int()", "str()", "float()", "number()"],
        "answer": "int()"
    },
    {
        "question": "What is the output of: print(3 * 'a')",
        "options": ["aaa", "3a", "a3", "Error"],
        "answer": "aaa"
    },
    {
        "question": "How do you check if a key exists in a dictionary?",
        "options": [".exists()", "in", ".has_key()", ".contains()"],
        "answer": "in"
    },
    {
        "question": "What is the result of: print(not True)",
        "options": ["True", "False", "None", "Error"],
        "answer": "False"
    },
    {
        "question": "Which method returns the number of items in a list?",
        "options": [".count()", ".size()", ".length()", "len()"],
        "answer": "len()"
    },
    {
        "question": "What is the output of: print(2 == '2')",
        "options": ["True", "False", "2", "Error"],
        "answer": "False"
    },
    {
        "question": "How do you create a set?",
        "options": ["s = {1, 2, 3}", "s = [1, 2, 3]", "s = (1, 2, 3)", "s = set(1, 2, 3)"],
        "answer": "s = {1, 2, 3}"
    },
    {
        "question": "What is the result of: print(min([5, 2, 8, 1]))",
        "options": ["5", "2", "8", "1"],
        "answer": "1"
    },
    {
        "question": "Which keyword is used to define a class?",
        "options": ["class", "def", "object", "struct"],
        "answer": "class"
    },
    {
        "question": "What is the output of: print('Hello'.replace('l', 'x'))",
        "options": ["Hexxo", "Hexlo", "Hexxo", "Hello"],
        "answer": "Hexxo"
    },
    {
        "question": "How do you get the last element of a list?",
        "options": ["list[-1]", "list.last", "list[last]", "list.end()"],
        "answer": "list[-1]"
    },
    {
        "question": "What is the result of: print(True and False)",
        "options": ["True", "False", "None", "Error"],
        "answer": "False"
    },
    {
        "question": "Which function returns the absolute value?",
        "options": ["abs()", "absolute()", "mod()", "value()"],
        "answer": "abs()"
    },
    {
        "question": "What is the output of: print([1, 2] + [3, 4])",
        "options": ["[1, 2, 3, 4]", "[4, 6]", "[1, 2][3, 4]", "Error"],
        "answer": "[1, 2, 3, 4]"
    },
    {
        "question": "How do you round a number to the nearest integer?",
        "options": ["round()", "ceil()", "floor()", "int()"],
        "answer": "round()"
    },
    {
        "question": "What is the result of: print('Python'[1:4])",
        "options": ["yth", "Pyt", "thon", "Python"],
        "answer": "yth"
    },
    {
        "question": "Which keyword handles exceptions?",
        "options": ["try", "catch", "exception", "error"],
        "answer": "try"
    },
    {
        "question": "What is the output of: print(max(3, 7, 2))",
        "options": ["3", "7", "2", "12"],
        "answer": "7"
    },
    {
        "question": "How do you remove an item from a list by value?",
        "options": [".remove()", ".pop()", ".delete()", ".discard()"],
        "answer": ".remove()"
    },
    {
        "question": "What is the result of: print(10 > 9)",
        "options": ["True", "False", "10", "9"],
        "answer": "True"
    },
    {
        "question": "Which module is used for mathematical operations?",
        "options": ["math", "calc", "numpy", "numbers"],
        "answer": "math"
    },
    {
        "question": "What is the output of: print('a' in 'apple')",
        "options": ["True", "False", "a", "Error"],
        "answer": "True"
    },
    {
        "question": "How do you create a copy of a list?",
        "options": [".copy()", ".clone()", ".duplicate()", "copy()"],
        "answer": ".copy()"
    },
    {
        "question": "What is the result of: print(bool(''))",
        "options": ["True", "False", "None", "Error"],
        "answer": "False"
    },
    {
        "question": "Which method splits a string into a list?",
        "options": [".split()", ".divide()", ".break()", ".partition()"],
        "answer": ".split()"
    },
    {
        "question": "What is the output of: print(4 + 4 / 2)",
        "options": ["4", "6", "8", "4.0"],
        "answer": "6.0"
    },
    {
        "question": "How do you get the data type of a variable?",
        "options": ["type()", "dtype()", "typeof()", "gettype()"],
        "answer": "type()"
    },
    {
        "question": "What is the result of: print(2 * 3 ** 2)",
        "options": ["36", "18", "12", "64"],
        "answer": "18"
    },
    {
        "question": "Which collection is ordered and unchangeable?",
        "options": ["list", "tuple", "set", "dictionary"],
        "answer": "tuple"
    },
    {
        "question": "What is the output of: print('Python'.find('t'))",
        "options": ["2", "3", "1", "t"],
        "answer": "2"
    },
    {
        "question": "How do you reverse a list?",
        "options": [".reverse()", ".flip()", ".backwards()", ".invert()"],
        "answer": ".reverse()"
    },
    {
        "question": "What is the result of: print(15 // 4)",
        "options": ["3.75", "3", "4", "3.0"],
        "answer": "3"
    },
    {
        "question": "Which keyword is used to import a module?",
        "options": ["import", "include", "require", "use"],
        "answer": "import"
    },
    {
        "question": "What is the output of: print('hello'.capitalize())",
        "options": ["Hello", "HELLO", "hello", "hELLO"],
        "answer": "Hello"
    },
    {
        "question": "How do you sort a list permanently?",
        "options": [".sort()", "sorted()", ".order()", ".arrange()"],
        "answer": ".sort()"
    },
    {
        "question": "What is the result of: print(7 % 2)",
        "options": ["3.5", "1", "0", "3"],
        "answer": "1"
    },
    {
        "question": "Which function returns a sequence of numbers?",
        "options": ["range()", "sequence()", "numbers()", "list()"],
        "answer": "range()"
    },
    {
        "question": "What is the output of: print('Python'[0])",
        "options": ["P", "0", "Python", "Error"],
        "answer": "P"
    },
    {
        "question": "How do you check if a list is empty?",
        "options": ["if len(list) == 0", "if list == []", "if not list", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "What is the result of: print(3 < 5 < 7)",
        "options": ["True", "False", "Error", "None"],
        "answer": "True"
    },
    {
        "question": "Which method joins list elements into a string?",
        "options": [".join()", ".combine()", ".concat()", ".merge()"],
        "answer": ".join()"
    },
    {
        "question": "What is the output of: print(10 / 2)",
        "options": ["5.0", "5", "2", "10"],
        "answer": "5.0"
    },
    {
        "question": "How do you create a string with both single and double quotes?",
        "options": ["Use triple quotes", "Escape with \\", "Use quotes() function", "Both A and B"],
        "answer": "Both A and B"
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
export const WE_23 = getRandomQuestions(questions, 30);    