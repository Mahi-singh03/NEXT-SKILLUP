const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

const allQuestions = [
    {
        "question": "What is the full form of 'BIOS' in computer terminology?",
        "options": ["Basic Input Output System", "Binary Integrated Operating Software", "Basic Integrated Output Service", "Boot Initialization Operating System"],
        "answer": "Basic Input Output System"
    },
    {
        "question": "In MS Word, which feature allows you to see the final layout of a document before printing?",
        "options": ["Draft View", "Outline View", "Print Preview", "Web Layout"],
        "answer": "Print Preview"
    },
    {
        "question": "Which protocol is primarily used for securely transferring files over a network?",
        "options": ["HTTP", "FTP", "SFTP", "SMTP"],
        "answer": "SFTP"
    },
    {
        "question": "What does 'SQL' stand for in the context of databases?",
        "options": ["Structured Query Language", "Simple Query Logic", "System Query Link", "Sequential Question Language"],
        "answer": "Structured Query Language"
    },
    {
        "question": "In MS Excel, which function returns the number of characters in a text string?",
        "options": ["LEN", "COUNT", "SUM", "MID"],
        "answer": "LEN"
    },
    {
        "question": "Which of these is a volatile memory type?",
        "options": ["ROM", "RAM", "HDD", "SSD"],
        "answer": "RAM"
    },
    {
        "question": "What is the primary purpose of a 'Firewall' in network security?",
        "options": ["To increase internet speed", "To block unauthorized access", "To store backup data", "To manage email traffic"],
        "answer": "To block unauthorized access"
    },
    {
        "question": "In MS PowerPoint, which view is best for organizing the structure of a presentation?",
        "options": ["Slide Sorter", "Normal View", "Outline View", "Notes Page"],
        "answer": "Outline View"
    },
    {
        "question": "What does 'URL' stand for?",
        "options": ["Uniform Resource Locator", "Universal Reference Link", "Unified Resource Library", "Uniform Retrieval Logic"],
        "answer": "Uniform Resource Locator"
    },
    {
        "question": "Which key combination is used to permanently delete a file in Windows, bypassing the Recycle Bin?",
        "options": ["Delete", "Ctrl + D", "Shift + Delete", "Alt + Delete"],
        "answer": "Shift + Delete"
    },
    {
        "question": "What is the function of the 'CPU' in a computer?",
        "options": ["Stores data permanently", "Processes instructions and manages operations", "Displays graphics on the screen", "Provides power to the system"],
        "answer": "Processes instructions and manages operations"
    },
    {
        "question": "In MS Access, what is a collection of related data called?",
        "options": ["Spreadsheet", "Document", "Database", "Presentation"],
        "answer": "Database"
    },
    {
        "question": "What does 'HTML' stand for?",
        "options": ["Hyperlink Text Management Language", "High-Level Machine Language", "HyperText Markup Language", "Hardware Testing Module Library"],
        "answer": "HyperText Markup Language"
    },
    {
        "question": "Which of these is an example of an input device?",
        "options": ["Monitor", "Printer", "Speaker", "Scanner"],
        "answer": "Scanner"
    },
    {
        "question": "In MS Excel, what is the correct syntax for the IF function?",
        "options": ["=IF(condition, value_if_true)", "=IF(condition, value_if_true, value_if_false)", "=IF(value_if_true, value_if_false, condition)", "=IF(logical_test, then_value, else_value)"],
        "answer": "=IF(condition, value_if_true, value_if_false)"
    },
    {
        "question": "What is the full form of 'PDF'?",
        "options": ["Printable Document Format", "Portable Document Format", "Personal Data File", "Public Document Form"],
        "answer": "Portable Document Format"
    },
    {
        "question": "Which component is known as the 'brain' of the computer?",
        "options": ["RAM", "GPU", "CPU", "Motherboard"],
        "answer": "CPU"
    },
    {
        "question": "What is the purpose of the 'Ctrl + Z' shortcut in most applications?",
        "options": ["Redo the last action", "Cut selected text", "Undo the last action", "Paste copied text"],
        "answer": "Undo the last action"
    },
    {
        "question": "Which of these is a cloud storage service?",
        "options": ["Google Drive", "Microsoft Word", "Adobe Photoshop", "Windows Explorer"],
        "answer": "Google Drive"
    },
    {
        "question": "What does 'LAN' stand for?",
        "options": ["Long Area Network", "Local Access Node", "Local Area Network", "Large Area Network"],
        "answer": "Local Area Network"
    },
    {
        "question": "In MS Word, what is the default file extension for a document?",
        "options": [".txt", ".docx", ".pdf", ".wrd"],
        "answer": ".docx"
    },
    {
        "question": "Which programming language is primarily used for adding interactivity to web pages?",
        "options": ["HTML", "CSS", "Python", "JavaScript"],
        "answer": "JavaScript"
    },
    {
        "question": "What is the main function of an 'Operating System'?",
        "options": ["To create documents", "To manage hardware and software resources", "To browse the internet", "To protect against viruses"],
        "answer": "To manage hardware and software resources"
    },
    {
        "question": "Which of these is a relational database management system?",
        "options": ["Microsoft Excel", "MySQL", "Notepad", "PowerPoint"],
        "answer": "MySQL"
    },
    {
        "question": "What does 'HTTP' stand for?",
        "options": ["HyperText Transfer Protocol", "High Traffic Transmission Path", "Hyperlink Text Transmission Process", "Hardware Test Transfer Protocol"],
        "answer": "HyperText Transfer Protocol"
    },
    {
        "question": "In MS Excel, which chart is best for showing trends over time?",
        "options": ["Pie Chart", "Bar Chart", "Line Chart", "Doughnut Chart"],
        "answer": "Line Chart"
    },
    {
        "question": "What is the full form of 'VPN'?",
        "options": ["Virtual Private Network", "Verified Public Node", "Visual Processing Network", "Virtual Protocol Number"],
        "answer": "Virtual Private Network"
    },
    {
        "question": "Which device converts digital signals to analog signals and vice versa for communication over telephone lines?",
        "options": ["Router", "Switch", "Modem", "Hub"],
        "answer": "Modem"
    },
    {
        "question": "In MS PowerPoint, what is a single page of a presentation called?",
        "options": ["Sheet", "Slide", "Page", "Canvas"],
        "answer": "Slide"
    },
    {
        "question": "What does 'CPU' stand for?",
        "options": ["Central Processing Unit", "Computer Personal Unit", "Central Protocol Utility", "Core Processing Unity"],
        "answer": "Central Processing Unit"
    },
    {
        "question": "Which of these is a function of the 'ALU'?",
        "options": ["Store data", "Manage power supply", "Perform arithmetic and logic operations", "Control input devices"],
        "answer": "Perform arithmetic and logic operations"
    },
    {
        "question": "What is the primary purpose of 'CSS' in web development?",
        "options": ["To define the structure of a web page", "To add interactivity", "To style and layout web pages", "To manage databases"],
        "answer": "To style and layout web pages"
    },
    {
        "question": "Which key is used to open the 'Start' menu in Windows?",
        "options": ["Alt Key", "Ctrl Key", "Windows Key", "Shift Key"],
        "answer": "Windows Key"
    },
    {
        "question": "What does 'ROM' stand for?",
        "options": ["Read-Only Memory", "Random Operation Module", "Read-Only Module", "Random Output Memory"],
        "answer": "Read-Only Memory"
    },
    {
        "question": "In MS Word, which feature checks the spelling and grammar of a document?",
        "options": ["Thesaurus", "Word Count", "Spell Check", "Track Changes"],
        "answer": "Spell Check"
    },
    {
        "question": "Which of these is an example of a non-volatile memory?",
        "options": ["Cache", "RAM", "ROM", "Register"],
        "answer": "ROM"
    },
    {
        "question": "What is the full form of 'ISP'?",
        "options": ["Internet Service Provider", "Internal System Protocol", "Internet Security Program", "Integrated Software Package"],
        "answer": "Internet Service Provider"
    },
    {
        "question": "Which function in Excel is used to find the largest number in a range?",
        "options": ["MAX", "MIN", "SUM", "AVERAGE"],
        "answer": "MAX"
    },
    {
        "question": "What is the purpose of the 'Recycle Bin' in Windows?",
        "options": ["To store system files", "To temporarily hold deleted files", "To improve computer speed", "To organize programs"],
        "answer": "To temporarily hold deleted files"
    },
    {
        "question": "Which protocol is used for sending emails?",
        "options": ["FTP", "HTTP", "SMTP", "POP3"],
        "answer": "SMTP"
    },
    {
        "question": "In MS Access, what is an object used to display and enter data?",
        "options": ["Query", "Form", "Report", "Macro"],
        "answer": "Form"
    },
    {
        "question": "What does 'GUI' stand for?",
        "options": ["Graphical User Interface", "General Utility Interface", "Graphical Unified Integration", "Global User Interaction"],
        "answer": "Graphical User Interface"
    },
    {
        "question": "Which of these is a programming language?",
        "options": ["Microsoft Windows", "Adobe Photoshop", "Java", "Microsoft Excel"],
        "answer": "Java"
    },
    {
        "question": "What is the function of the 'Motherboard'?",
        "options": ["Stores data", "Powers the computer", "Connects all hardware components", "Displays video"],
        "answer": "Connects all hardware components"
    },
    {
        "question": "In MS Excel, what does the 'COUNTIF' function do?",
        "options": ["Adds numbers that meet a condition", "Counts cells that meet a condition", "Finds the average of a range", "Returns the current date"],
        "answer": "Counts cells that meet a condition"
    },
    {
        "question": "What does 'Wi-Fi' stand for?",
        "options": ["Wireless Fidelity", "Wired Fiber", "Wireless Frequency", "Wide Fidelity"],
        "answer": "Wireless Fidelity"
    },
    {
        "question": "Which key is used to refresh a webpage in most browsers?",
        "options": ["F1", "F5", "F9", "F12"],
        "answer": "F5"
    },
    {
        "question": "What is the full form of 'CD' in computer storage?",
        "options": ["Compact Disk", "Computer Disk", "Central Drive", "Cached Data"],
        "answer": "Compact Disk"
    },
    {
        "question": "In MS Word, what is the purpose of 'Mail Merge'?",
        "options": ["To send emails", "To create multiple documents from a template and a data source", "To merge two documents into one", "To check for malware in attachments"],
        "answer": "To create multiple documents from a template and a data source"
    },
    {
        "question": "Which of these is a type of malicious software?",
        "options": ["Firewall", "Antivirus", "Malware", "Encryption"],
        "answer": "Malware"
    },
    {
        "question": "What does 'OS' stand for in computing?",
        "options": ["Operating System", "Output Service", "Open Software", "Online Security"],
        "answer": "Operating System"
    },
    {
        "question": "Which function in Excel is used to join text from multiple cells?",
        "options": ["JOIN", "CONCATENATE", "MERGE", "COMBINE"],
        "answer": "CONCATENATE"
    },
    {
        "question": "What is the purpose of a 'Router' in a network?",
        "options": ["To connect devices within a LAN", "To forward data packets between computer networks", "To amplify wireless signals", "To store website data"],
        "answer": "To forward data packets between computer networks"
    },
    {
        "question": "In MS PowerPoint, which animation effect determines how a slide enters the screen?",
        "options": ["Emphasis", "Exit", "Motion Paths", "Entrance"],
        "answer": "Entrance"
    },
    {
        "question": "What does 'RAM' stand for?",
        "options": ["Random Access Memory", "Read-Only Memory", "Remote Access Module", "Random Algorithmic Memory"],
        "answer": "Random Access Memory"
    },
    {
        "question": "Which of these is a video conferencing software?",
        "options": ["Microsoft Teams", "Microsoft Excel", "Adobe Reader", "Notepad"],
        "answer": "Microsoft Teams"
    },
    {
        "question": "What is the primary function of a 'Compiler'?",
        "options": ["To execute program code", "To translate high-level language to machine code", "To manage memory", "To connect to the internet"],
        "answer": "To translate high-level language to machine code"
    },
    {
        "question": "In MS Word, which view removes all margins and page breaks?",
        "options": ["Print Layout", "Read Mode", "Web Layout", "Draft"],
        "answer": "Draft"
    },
    {
        "question": "What does 'DNS' stand for?",
        "options": ["Domain Name System", "Dynamic Network Service", "Data Naming Server", "Digital Naming Standard"],
        "answer": "Domain Name System"
    },
    {
        "question": "Which key combination is used to select all text in a document?",
        "options": ["Ctrl + A", "Ctrl + C", "Ctrl + V", "Ctrl + X"],
        "answer": "Ctrl + A"
    },
    {
        "question": "What is the full form of 'USB'?",
        "options": ["Universal Serial Bus", "Unified System Bus", "Universal System Buffer", "United Service Band"],
        "answer": "Universal Serial Bus"
    },
    {
        "question": "In MS Excel, which function returns the current date and time?",
        "options": ["TODAY()", "NOW()", "DATE()", "TIME()"],
        "answer": "NOW()"
    },
    {
        "question": "Which of these is a web browser?",
        "options": ["Google Chrome", "Microsoft Word", "Adobe Acrobat", "Windows Media Player"],
        "answer": "Google Chrome"
    },
    {
        "question": "What is the purpose of 'Defragmentation'?",
        "options": ["To delete temporary files", "To organize data on a disk for faster access", "To protect against viruses", "To create a system restore point"],
        "answer": "To organize data on a disk for faster access"
    },
    {
        "question": "In MS Access, which object is used to retrieve specific data from tables?",
        "options": ["Form", "Query", "Report", "Module"],
        "answer": "Query"
    },
    {
        "question": "What does 'IP' address stand for?",
        "options": ["Internet Protocol", "Internal Path", "Internet Provider", "Integrated Program"],
        "answer": "Internet Protocol"
    },
    {
        "question": "Which function in Excel is used to find the square root of a number?",
        "options": ["POWER", "SQRT", "ROOT", "LOG"],
        "answer": "SQRT"
    },
    {
        "question": "What is the primary function of an 'SSD' compared to an 'HDD'?",
        "options": ["To provide more storage capacity", "To offer faster data access speeds", "To be more cost-effective per gigabyte", "To be more durable for external use"],
        "answer": "To offer faster data access speeds"
    },
    {
        "question": "In MS PowerPoint, what is the shortcut key to start a slideshow from the beginning?",
        "options": ["F1", "F5", "F7", "F9"],
        "answer": "F5"
    },
    {
        "question": "What does 'PDF' stand for?",
        "options": ["Printable Document Format", "Portable Document Format", "Personal Data File", "Public Document Form"],
        "answer": "Portable Document Format"
    },
    {
        "question": "Which of these is a function of the 'Control Unit' of the CPU?",
        "options": ["Perform calculations", "Store data", "Direct the operation of the processor", "Manage power supply"],
        "answer": "Direct the operation of the processor"
    },
    {
        "question": "In MS Word, what is the purpose of the 'Thesaurus'?",
        "options": ["To check grammar", "To find synonyms and antonyms", "To count words", "To change font styles"],
        "answer": "To find synonyms and antonyms"
    },
    {
        "question": "What is the full form of 'HTTP'?",
        "options": ["HyperText Transfer Protocol", "High Traffic Transmission Path", "Hyperlink Text Transmission Process", "Hardware Test Transfer Protocol"],
        "answer": "HyperText Transfer Protocol"
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
  export const WE_20 = getRandomQuestions(questions, 30);    