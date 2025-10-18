import { useState } from 'react';

const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const allQuestions = [
    {
        "question": "Which function is used to perform a lookup with multiple criteria?",
        "options": ["VLOOKUP", "INDEX-MATCH", "XLOOKUP", "HLOOKUP"],
        "answer": "INDEX-MATCH"
    },
    {
        "question": "What does the OFFSET function do?",
        "options": ["Finds the maximum value", "Returns a reference to a range that is offset from a starting point", "Tests a condition", "Counts cells"],
        "answer": "Returns a reference to a range that is offset from a starting point"
    },
    {
        "question": "Which function is used to create an array formula that performs multiple calculations?",
        "options": ["SUMPRODUCT", "SUMIFS", "COUNTIFS", "AVERAGEIFS"],
        "answer": "SUMPRODUCT"
    },
    {
        "question": "What does the INDIRECT function do?",
        "options": ["Finds the maximum value", "Returns the value of a cell specified by a text string", "Tests a condition", "Counts cells"],
        "answer": "Returns the value of a cell specified by a text string"
    },
    {
        "question": "Which function is used to find the nth largest value in a range?",
        "options": ["LARGE", "MAX", "RANK", "PERCENTILE"],
        "answer": "LARGE"
    },
    {
        "question": "What does the SMALL function do?",
        "options": ["Finds the minimum value", "Returns the nth smallest value in a range", "Tests a condition", "Counts cells"],
        "answer": "Returns the nth smallest value in a range"
    },
    {
        "question": "Which function is used to find the percentile of a value in a range?",
        "options": ["PERCENTILE", "RANK", "QUARTILE", "PERCENTRANK"],
        "answer": "PERCENTILE"
    },
    {
        "question": "What does the QUARTILE function do?",
        "options": ["Finds the maximum value", "Returns the quartile of a data set", "Tests a condition", "Counts cells"],
        "answer": "Returns the quartile of a data set"
    },
    {
        "question": "Which function is used to find the standard deviation of a population?",
        "options": ["STDEV", "STDEVP", "VAR", "VARP"],
        "answer": "STDEVP"
    },
    {
        "question": "What does the CORREL function do?",
        "options": ["Finds the maximum value", "Returns the correlation coefficient between two data sets", "Tests a condition", "Counts cells"],
        "answer": "Returns the correlation coefficient between two data sets"
    },
    {
        "question": "Which function is used to find the slope of a linear regression line?",
        "options": ["SLOPE", "INTERCEPT", "TREND", "FORECAST"],
        "answer": "SLOPE"
    },
    {
        "question": "What does the INTERCEPT function do?",
        "options": ["Finds the maximum value", "Returns the y-intercept of a linear regression line", "Tests a condition", "Counts cells"],
        "answer": "Returns the y-intercept of a linear regression line"
    },
    {
        "question": "Which function is used to find the trend of a data set?",
        "options": ["TREND", "SLOPE", "INTERCEPT", "FORECAST"],
        "answer": "TREND"
    },
    {
        "question": "What does the FORECAST function do?",
        "options": ["Finds the maximum value", "Predicts a future value based on existing values", "Tests a condition", "Counts cells"],
        "answer": "Predicts a future value based on existing values"
    },
    {
        "question": "Which function is used to find the frequency distribution of data?",
        "options": ["FREQUENCY", "HISTOGRAM", "DISTRIBUTION", "COUNTIFS"],
        "answer": "FREQUENCY"
    },
    {
        "question": "What does the MODE function do?",
        "options": ["Finds the maximum value", "Returns the most frequently occurring value in a range", "Tests a condition", "Counts cells"],
        "answer": "Returns the most frequently occurring value in a range"
    },
    {
        "question": "Which function is used to find the median of a range?",
        "options": ["MEDIAN", "MODE", "AVERAGE", "MEAN"],
        "answer": "MEDIAN"
    },
    {
        "question": "What does the GEOMEAN function do?",
        "options": ["Finds the maximum value", "Returns the geometric mean of a range", "Tests a condition", "Counts cells"],
        "answer": "Returns the geometric mean of a range"
    },
    {
        "question": "Which function is used to find the harmonic mean of a range?",
        "options": ["HARMEAN", "GEOMEAN", "AVERAGE", "MEAN"],
        "answer": "HARMEAN"
    },
    {
        "question": "What does the TRIMMEAN function do?",
        "options": ["Finds the maximum value", "Returns the mean of a range excluding outliers", "Tests a condition", "Counts cells"],
        "answer": "Returns the mean of a range excluding outliers"
    },
    {
        "question": "Which function is used to find the confidence interval for a population mean?",
        "options": ["CONFIDENCE", "INTERVAL", "RANGE", "BOUNDS"],
        "answer": "CONFIDENCE"
    },
    {
        "question": "What does the TTEST function do?",
        "options": ["Finds the maximum value", "Returns the probability associated with a t-test", "Tests a condition", "Counts cells"],
        "answer": "Returns the probability associated with a t-test"
    },
    {
        "question": "Which function is used to find the chi-square test?",
        "options": ["CHITEST", "CHISQ.TEST", "CHISQUARE", "CHI2"],
        "answer": "CHITEST"
    },
    {
        "question": "What does the FTEST function do?",
        "options": ["Finds the maximum value", "Returns the probability associated with an F-test", "Tests a condition", "Counts cells"],
        "answer": "Returns the probability associated with an F-test"
    },
    {
        "question": "Which function is used to find the covariance between two data sets?",
        "options": ["COVAR", "COVARIANCE", "CORREL", "COEFFICIENT"],
        "answer": "COVAR"
    },
    {
        "question": "What does the PEARSON function do?",
        "options": ["Finds the maximum value", "Returns the Pearson correlation coefficient", "Tests a condition", "Counts cells"],
        "answer": "Returns the Pearson correlation coefficient"
    },
    {
        "question": "Which function is used to find the skewness of a distribution?",
        "options": ["SKEW", "SKEWNESS", "ASYMMETRY", "DISTRIBUTION"],
        "answer": "SKEW"
    },
    {
        "question": "What does the KURT function do?",
        "options": ["Finds the maximum value", "Returns the kurtosis of a distribution", "Tests a condition", "Counts cells"],
        "answer": "Returns the kurtosis of a distribution"
    },
    {
        "question": "Which function is used to find the normal distribution?",
        "options": ["NORMDIST", "NORMAL", "DISTRIBUTION", "GAUSSIAN"],
        "answer": "NORMDIST"
    },
    {
        "question": "What does the NORMINV function do?",
        "options": ["Finds the maximum value", "Returns the inverse of the normal cumulative distribution", "Tests a condition", "Counts cells"],
        "answer": "Returns the inverse of the normal cumulative distribution"
    },
    {
        "question": "Which function is used to find the binomial distribution?",
        "options": ["BINOMDIST", "BINOMIAL", "DISTRIBUTION", "PROBABILITY"],
        "answer": "BINOMDIST"
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
export const ExcelHard = getRandomQuestions(allQuestions, 30);