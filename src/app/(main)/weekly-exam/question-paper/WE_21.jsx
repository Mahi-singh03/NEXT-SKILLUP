const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const allQuestions = [
    {
        "question": "In Excel, which function is used to calculate the internal rate of return for a series of cash flows?",
        "options": ["XIRR", "IRR", "RATE", "MIRR"],
        "answer": "IRR"
    },
    {
        "question": "Which Excel feature allows you to view data trends and patterns with miniature graphs in a single cell?",
        "options": ["Power Pivot", "Sparklines", "Slicers", "Data Bars"],
        "answer": "Sparklines"
    },
    {
        "question": "What is the purpose of the Excel function =CELL(\"filename\")?",
        "options": ["Returns the file format", "Returns the full path, workbook, and current sheet name", "Checks if a file is open", "Returns the name of the first cell in a range"],
        "answer": "Returns the full path, workbook, and current sheet name"
    },
    {
        "question": "Which keyboard shortcut opens the 'Format Cells' dialog box in Excel?",
        "options": ["Ctrl + F", "Ctrl + 1", "Alt + H + O", "F2"],
        "answer": "Ctrl + 1"
    },
    {
        "question": "What does the #SPILL! error in Excel indicate?",
        "options": ["A formula is missing an argument", "A number is divided by zero", "A dynamic array formula cannot output results due to obstructing cells", "A cell reference is not valid"],
        "answer": "A dynamic array formula cannot output results due to obstructing cells"
    },
    {
        "question": "Which function can be used to return a specific number of characters from the end of a text string?",
        "options": ["LEFT", "MID", "RIGHT", "FIND"],
        "answer": "RIGHT"
    },
    {
        "question": "What is the primary use of the GETPIVOTDATA function?",
        "options": ["To create a new PivotTable", "To extract specific data from a PivotTable report", "To refresh all PivotTables in a workbook", "To change the layout of a PivotTable"],
        "answer": "To extract specific data from a PivotTable report"
    },
    {
        "question": "Which feature is used to prevent users from editing specific cells in a worksheet?",
        "options": ["Data Validation", "Protect Sheet", "Freeze Panes", "Conditional Formatting"],
        "answer": "Protect Sheet"
    },
    {
        "question": "What will the formula =TEXT(1234.567, \"$#,##0.00\") return?",
        "options": ["$1,234.57", "1234.57", "$1234.567", "#,##0.001234"],
        "answer": "$1,234.57"
    },
    {
        "question": "Which function is NOT a member of the Excel 'Lookup & Reference' function category?",
        "options": ["XLOOKUP", "UNIQUE", "MATCH", "HSTACK"],
        "answer": "UNIQUE"
    },
    {
        "question": "What is the keyboard shortcut to create a new PivotTable on a separate sheet from selected data?",
        "options": ["Alt + N + V", "Ctrl + T", "Alt + D + P", "Ctrl + Shift + L"],
        "answer": "Alt + N + V"
    },
    {
        "question": "Which function can identify the relative position of an item in a range that matches a specified value?",
        "options": ["INDEX", "MATCH", "ADDRESS", "CHOOSE"],
        "answer": "MATCH"
    },
    {
        "question": "What does the 'What-If Analysis' tool 'Data Table' primarily do?",
        "options": ["Checks for inconsistencies in data", "Shows how changing one or two variables affects a formula result", "Creates a summary table of data", "Performs a regression analysis"],
        "answer": "Shows how changing one or two variables affects a formula result"
    },
    {
        "question": "Which error occurs when Excel doesn't recognize text in a formula?",
        "options": ["#VALUE!", "#NAME?", "#N/A", "#REF!"],
        "answer": "#NAME?"
    },
    {
        "question": "What is the purpose of the 'Evaluate Formula' tool?",
        "options": ["To audit a formula by showing the calculation steps", "To find the average of a range of formulas", "To convert formulas to values", "To check for circular references"],
        "answer": "To audit a formula by showing the calculation steps"
    },
    {
        "question": "Which function converts a text string that represents a number into a number?",
        "options": ["NUMBERVALUE", "VALUE", "TEXT", "NUM"],
        "answer": "VALUE"
    },
    {
        "question": "What is the key difference between HLOOKUP and VLOOKUP?",
        "options": ["HLOOKUP searches vertically, VLOOKUP searches horizontally", "HLOOKUP is for horizontal data, VLOOKUP is for vertical data", "HLOOKUP is newer and faster", "HLOOKUP can only return the first match"],
        "answer": "HLOOKUP is for horizontal data, VLOOKUP is for vertical data"
    },
    {
        "question": "Which feature allows you to highlight all cells that contain formulas?",
        "options": ["Go To Special > Formulas", "Conditional Formatting > Highlight Cells Rules", "Find & Select > Formulas", "Formula Auditing > Trace Precedents"],
        "answer": "Go To Special > Formulas"
    },
    {
        "question": "What does the AGGREGATE function's option 5 (ignore hidden rows) allow you to do?",
        "options": ["Perform calculations like SUM while ignoring hidden rows and error values", "Sum only visible cells from a filtered list", "Count only error values", "Average cells ignoring text strings"],
        "answer": "Perform calculations like SUM while ignoring hidden rows and error values"
    },
    {
        "question": "Which function returns a reference to a range that is a specified number of rows and columns from a cell?",
        "options": ["OFFSET", "INDEX", "INDIRECT", "ADDRESS"],
        "answer": "OFFSET"
    },
    {
        "question": "What is the correct syntax for a 3D reference that sums cell B5 across Sheet1, Sheet2, and Sheet3?",
        "options": ["=SUM(Sheet1:Sheet3!B5)", "=SUM(Sheet1!B5:Sheet3!B5)", "=SUM(Sheet1-Sheet3!B5)", "=SUM(B5:Sheet1:Sheet3)"],
        "answer": "=SUM(Sheet1:Sheet3!B5)"
    },
    {
        "question": "Which function is used to calculate the number of days between two dates based on a 360-day year?",
        "options": ["DAYS360", "DATEDIF", "NETWORKDAYS", "YEARFRAC"],
        "answer": "DAYS360"
    },
    {
        "question": "What does the 'Array' argument in the new dynamic array functions (like SORT, FILTER) enable?",
        "options": ["It allows the function to return multiple results that spill into adjacent cells", "It forces the function to process data slower", "It is used only for legacy compatibility", "It converts the output to a static range"],
        "answer": "It allows the function to return multiple results that spill into adjacent cells"
    },
    {
        "question": "Which keyboard shortcut opens the 'Insert Function' dialog box?",
        "options": ["Shift + F3", "Ctrl + A", "Alt + =", "F3"],
        "answer": "Shift + F3"
    },
    {
        "question": "What is the primary purpose of the CONCAT function compared to CONCATENATE?",
        "options": ["CONCAT is newer and can handle ranges, not just individual cells", "CONCAT is slower but more accurate", "CONCAT can only join two strings", "There is no difference, they are identical"],
        "answer": "CONCAT is newer and can handle ranges, not just individual cells"
    },
    {
        "question": "Which function would you use to find the second smallest number in a range that meets a specific condition?",
        "options": ["SMALLIF", "MINIFS", "There is no direct function; requires an array formula with SMALL and IF", "SECONDMIN"],
        "answer": "There is no direct function; requires an array formula with SMALL and IF"
    },
    {
        "question": "What does the 'Volatile' characteristic of a function mean?",
        "options": ["It recalculates every time any change is made in the workbook", "It is unstable and may cause errors", "It requires special permission to run", "It can only be used in protected sheets"],
        "answer": "It recalculates every time any change is made in the workbook"
    },
    {
        "question": "Which function is Volatile?",
        "options": ["SUM", "NOW", "VLOOKUP", "IF"],
        "answer": "NOW"
    },
    {
        "question": "What is the keyboard shortcut to toggle absolute and relative references in a formula?",
        "options": ["F2", "F4", "F9", "Ctrl + `"],
        "answer": "F4"
    },
    {
        "question": "Which function counts the number of cells in a range that are not empty?",
        "options": ["COUNT", "COUNTA", "COUNTBLANK", "SUM"],
        "answer": "COUNTA"
    },
    {
        "question": "What does the 'Solver' add-in in Excel do?",
        "options": ["Finds optimal solutions for problems with multiple constraints", "Solves mathematical equations step-by-step", "Corrects formula errors automatically", "Imports data from external databases"],
        "answer": "Finds optimal solutions for problems with multiple constraints"
    },
    {
        "question": "Which function returns the row number of a reference?",
        "options": ["COLUMN", "ROWS", "ROW", "CELL"],
        "answer": "ROW"
    },
    {
        "question": "What is the purpose of the 'Watch Window'?",
        "options": ["To monitor the values of specific cells in real-time, even when they are not in view", "To track changes made by other users in a shared workbook", "To watch a tutorial within Excel", "To set a timer for calculations"],
        "answer": "To monitor the values of specific cells in real-time, even when they are not in view"
    },
    {
        "question": "Which function can be used to create a hyperlink to a specific cell in another workbook?",
        "options": ["LINK", "HYPERLINK", "REFERENCE", "GOTO"],
        "answer": "HYPERLINK"
    },
    {
        "question": "What does the formula =SUMPRODUCT((A1:A10=\"Red\")*(B1:B10)) do?",
        "options": ["Sums the values in B1:B10 where the corresponding cell in A1:A10 is \"Red\"", "Multiplies the two arrays and then sums the products", "Counts how many times \"Red\" appears in A1:A10", "Returns an error if text is found"],
        "answer": "Sums the values in B1:B10 where the corresponding cell in A1:A10 is \"Red\""
    },
    {
        "question": "Which feature is used to combine text from multiple cells into one cell, separated by a delimiter?",
        "options": ["Merge & Center", "Text to Columns", "Flash Fill", "CONCAT or TEXTJOIN"],
        "answer": "CONCAT or TEXTJOIN"
    },
    {
        "question": "What is the key advantage of using XLOOKUP over VLOOKUP?",
        "options": ["XLOOKUP can search in any direction (left, right, up, down) and has a simpler syntax", "XLOOKUP is faster for very small datasets", "XLOOKUP is compatible with older versions of Excel", "XLOOKUP can only return exact matches"],
        "answer": "XLOOKUP can search in any direction (left, right, up, down) and has a simpler syntax"
    },
    {
        "question": "Which function rounds a number down, toward zero, to the nearest integer?",
        "options": ["ROUND", "INT", "TRUNC", "FLOOR"],
        "answer": "TRUNC"
    },
    {
        "question": "What does the 'Circular Reference' warning indicate?",
        "options": ["A formula refers to its own cell, either directly or indirectly", "A formula contains a syntax error", "A cell reference points to an empty cell", "A function is missing a required argument"],
        "answer": "A formula refers to its own cell, either directly or indirectly"
    },
    {
        "question": "Which function returns the number of characters in a text string?",
        "options": ["LEN", "COUNT", "SUM", "MID"],
        "answer": "LEN"
    },
    {
        "question": "What is the purpose of the 'Form Controls' (like buttons, checkboxes) in the Developer tab?",
        "options": ["To create interactive elements that can trigger macros or formulas", "To format cells with special borders", "To control the zoom level of the worksheet", "To validate data entry in a cell"],
        "answer": "To create interactive elements that can trigger macros or formulas"
    },
    {
        "question": "Which function converts a value to text in a specific number format?",
        "options": ["VALUE", "TEXT", "NUMBERVALUE", "FORMAT"],
        "answer": "TEXT"
    },
    {
        "question": "What is the difference between Paste Special 'Values' and Paste Special 'Values and Number Formats'?",
        "options": ["'Values' pastes only the results, 'Values and Number Formats' also copies the number formatting", "There is no difference", "'Values and Number Formats' is slower", "'Values' also copies conditional formatting rules"],
        "answer": "'Values' pastes only the results, 'Values and Number Formats' also copies the number formatting"
    },
    {
        "question": "Which function can extract a substring from the middle of a text string, given a starting position and length?",
        "options": ["LEFT", "MID", "RIGHT", "SEARCH"],
        "answer": "MID"
    },
    {
        "question": "What does the 'Camera' tool do?",
        "options": ["Takes a screenshot of the entire screen", "Creates a live, linked picture of a range of cells that can be placed anywhere", "Adds a photographic image to a worksheet", "Is used for scanning documents into Excel"],
        "answer": "Creates a live, linked picture of a range of cells that can be placed anywhere"
    },
    {
        "question": "Which function is used to perform a logical test and return one value if TRUE and another if FALSE?",
        "options": ["AND", "OR", "IF", "NOT"],
        "answer": "IF"
    },
    {
        "question": "What is the purpose of the 'Data Model' in Power Pivot?",
        "options": ["To create relationships between different tables for advanced analysis without VLOOKUP", "To model 3D shapes in Excel", "To validate data entry", "To format PivotTables automatically"],
        "answer": "To create relationships between different tables for advanced analysis without VLOOKUP"
    },
    {
        "question": "Which function returns the current date and time?",
        "options": ["TODAY()", "NOW()", "DATE()", "TIME()"],
        "answer": "NOW()"
    },
    {
        "question": "What does the 'Group' feature in the Data tab allow you to do?",
        "options": ["Group selected worksheets together", "Group rows or columns to collapse and expand detail levels", "Group cells with similar formatting", "Group data by color"],
        "answer": "Group rows or columns to collapse and expand detail levels"
    },
    {
        "question": "Which function calculates the net working days between two dates, excluding weekends and holidays?",
        "options": ["WORKDAY", "NETWORKDAYS", "DATEDIF", "DAY360"],
        "answer": "NETWORKDAYS"
    },
    {
        "question": "What is the keyboard shortcut to apply the General number format to selected cells?",
        "options": ["Ctrl + Shift + ~", "Ctrl + Shift + !", "Ctrl + Shift + $", "Ctrl + Shift + %"],
        "answer": "Ctrl + Shift + ~"
    },
    {
        "question": "Which function can be used to create a drop-down list in a cell?",
        "options": ["Data Validation > List", "Conditional Formatting", "Form Controls > Combo Box", "The DROPDOWN function"],
        "answer": "Data Validation > List"
    },
    {
        "question": "What does the 'Slicer' tool do in the context of a PivotTable?",
        "options": ["Cuts the PivotTable into smaller pieces", "Provides buttons for easy filtering of PivotTable data", "Slices data into charts", "Formats the PivotTable with colors"],
        "answer": "Provides buttons for easy filtering of PivotTable data"
    },
    {
        "question": "Which function returns a random number between 0 and 1?",
        "options": ["RANDBETWEEN", "RAND", "RANDOM", "RND"],
        "answer": "RAND"
    },
    {
        "question": "What is the purpose of the 'Text to Columns' feature?",
        "options": ["To split text from one cell into multiple cells based on a delimiter", "To combine multiple columns into one", "To change the font size of text", "To convert numbers stored as text into real numbers"],
        "answer": "To split text from one cell into multiple cells based on a delimiter"
    },
    {
        "question": "Which function finds the position of a specific character or text string within another text string?",
        "options": ["FIND", "SEARCH", "Both FIND and SEARCH", "LOCATE"],
        "answer": "Both FIND and SEARCH"
    },
    {
        "question": "What is a key difference between FIND and SEARCH?",
        "options": ["SEARCH is case-insensitive and allows wildcards, FIND is case-sensitive", "FIND is newer and faster", "SEARCH can only look for numbers", "FIND can search across multiple sheets"],
        "answer": "SEARCH is case-insensitive and allows wildcards, FIND is case-sensitive"
    },
    {
        "question": "Which function returns the number of columns in a reference?",
        "options": ["COLUMN", "COLUMNS", "COUNTCOL", "WIDTH"],
        "answer": "COLUMNS"
    },
    {
        "question": "What does the 'Trace Dependents' tool show?",
        "options": ["Cells that contain formulas that refer to the active cell", "Cells that the active cell's formula refers to", "All cells with errors", "The calculation history of a cell"],
        "answer": "Cells that contain formulas that refer to the active cell"
    },
    {
        "question": "Which function is used to calculate the future value of an investment based on periodic, constant payments?",
        "options": ["PV", "NPV", "FV", "PMT"],
        "answer": "FV"
    },
    {
        "question": "What is the purpose of the 'Custom Views' feature?",
        "options": ["To save specific display and print settings for quick application later", "To create custom formulas", "To design user forms", "To apply a custom theme to the workbook"],
        "answer": "To save specific display and print settings for quick application later"
    },
    {
        "question": "Which function can be used to create a frequency distribution for a range of data?",
        "options": ["FREQUENCY", "COUNTIFS", "HISTOGRAM", "DISTRIBUTION"],
        "answer": "FREQUENCY"
    },
    {
        "question": "What does the 'Power Query' editor primarily allow you to do?",
        "options": ["Connect to, transform, and load data from various sources into Excel", "Write powerful SQL queries directly in cells", "Query the power usage of your computer", "Create powerful charts and graphs"],
        "answer": "Connect to, transform, and load data from various sources into Excel"
    },
    {
        "question": "Which function returns a value from a list of values based on a given index number?",
        "options": ["INDEX", "MATCH", "CHOOSE", "SWITCH"],
        "answer": "CHOOSE"
    },
    {
        "question": "What is the keyboard shortcut to insert a new worksheet?",
        "options": ["Shift + F11", "Alt + I + W", "Ctrl + N", "F11"],
        "answer": "Shift + F11"
    },
    {
        "question": "Which function calculates the straight-line depreciation of an asset for one period?",
        "options": ["SLN", "DB", "DDB", "VDB"],
        "answer": "SLN"
    },
    {
        "question": "What does the 'Scenario Manager' in What-If Analysis do?",
        "options": ["Allows you to create and save different sets of input values (scenarios) to see different outcomes", "Manages different views of a worksheet", "Creates scenarios for project management", "Analyzes the risk of different business scenarios"],
        "answer": "Allows you to create and save different sets of input values (scenarios) to see different outcomes"
    },
    {
        "question": "Which function can be used to remove all non-printable characters from a text string?",
        "options": ["TRIM", "CLEAN", "SUBSTITUTE", "REMOVE"],
        "answer": "CLEAN"
    },
    {
        "question": "What is the purpose of the 'Quick Analysis' tool that appears when you select a range of data?",
        "options": ["To quickly access formatting, charts, totals, tables, and sparklines for the selected data", "To analyze the data for errors", "To quickly sort and filter the data", "To start a Power Pivot model"],
        "answer": "To quickly access formatting, charts, totals, tables, and sparklines for the selected data"
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
  export const WE_21 = getRandomQuestions(questions, 30);    