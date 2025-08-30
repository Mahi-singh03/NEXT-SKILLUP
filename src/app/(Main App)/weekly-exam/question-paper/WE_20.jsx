const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  const allQuestions =[
        {
            "question": "What does CPU stand for?",
            "options": ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing Unit"],
            "answer": "Central Processing Unit"
        },
        {
            "question": "Which of these is a web browser?",
            "options": ["Microsoft Excel", "Google Chrome", "Adobe Photoshop", "Windows Media Player"],
            "answer": "Google Chrome"
        },
        {
            "question": "What is the main function of RAM?",
            "options": ["Permanent storage for files", "Temporary storage for running programs", "Controlling display output", "Managing internet connection"],
            "answer": "Temporary storage for running programs"
        },
        {
            "question": "Which device is used to type data into a computer?",
            "options": ["Monitor", "Printer", "Keyboard", "Mouse"],
            "answer": "Keyboard"
        },
        {
            "question": "What does 'www' stand for in a website address?",
            "options": ["World Wide Web", "Web World Wide", "Wide World Web", "World Web Wide"],
            "answer": "World Wide Web"
        },
        {
            "question": "What is the full form of PDF?",
            "options": ["Printed Document Format", "Portable Document Format", "Personal Data File", "Public Document Form"],
            "answer": "Portable Document Format"
        },
        {
            "question": "Which of these is an example of an input device?",
            "options": ["Monitor", "Speaker", "Scanner", "Printer"],
            "answer": "Scanner"
        },
        {
            "question": "What is the primary purpose of an operating system?",
            "options": ["To run spreadsheet software", "To manage the computer's hardware and software resources", "To provide internet access", "To create documents"],
            "answer": "To manage the computer's hardware and software resources"
        },
        {
            "question": "Which protocol is used for sending emails?",
            "options": ["FTP", "HTTP", "SMTP", "HTTPS"],
            "answer": "SMTP"
        },
        {
            "question": "What does URL stand for?",
            "options": ["Uniform Resource Locator", "Universal Reference Link", "Uniform Return Locator", "Universal Resource Library"],
            "answer": "Uniform Resource Locator"
        },
        {
            "question": "What is the name for a malicious software that replicates itself?",
            "options": ["Firewall", "Virus", "Spyware", "Adware"],
            "answer": "Virus"
        },
        {
            "question": "Which key is often used to delete text to the left of the cursor?",
            "options": ["Delete", "Backspace", "Enter", "Shift"],
            "answer": "Backspace"
        },
        {
            "question": "What does HTML stand for?",
            "options": ["Hyperlink Text Management Language", "High-Level Machine Language", "HyperText Markup Language", "Hardware Testing Module Library"],
            "answer": "HyperText Markup Language"
        },
        {
            "question": "Approximately how many bytes are in a megabyte?",
            "options": ["1,000", "10,000", "1,000,000", "1,000,000,000"],
            "answer": "1,000,000"
        },
        {
            "question": "What is the function of a firewall?",
            "options": ["To increase internet speed", "To block unauthorized network access", "To create backups of data", "To scan for viruses on the hard drive"],
            "answer": "To block unauthorized network access"
        },
        {
            "question": "Which of these is a cloud storage service?",
            "options": ["Google Drive", "Microsoft Word", "Adobe Acrobat", "Windows Explorer"],
            "answer": "Google Drive"
        },
        {
            "question": "What does VPN stand for?",
            "options": ["Virtual Private Network", "Verified Public Network", "Virtual Public Node", "Verified Program Network"],
            "answer": "Virtual Private Network"
        },
        {
            "question": "Which component is often called the 'brain' of the computer?",
            "options": ["RAM", "Hard Drive", "CPU", "GPU"],
            "answer": "CPU"
        },
        {
            "question": "What is the full form of BIOS?",
            "options": ["Basic Input Output System", "Binary Integrated Operating Software", "Basic Integrated Output Service", "Boot Initialization Operating System"],
            "answer": "Basic Input Output System"
        },
        {
            "question": "Which symbol is used in most email addresses?",
            "options": ["&", "#", "@", "%"],
            "answer": "@"
        },
        {
            "question": "What does HTTP stand for?",
            "options": ["HyperText Transfer Protocol", "High-Tech Text Process", "Hyperlink Text Translation Program", "Hardware Test Transmission Protocol"],
            "answer": "HyperText Transfer Protocol"
        },
        {
            "question": "What is the purpose of the 'Refresh' or 'F5' key?",
            "options": ["To restart the computer", "To reload the current webpage or document view", "To undo the last action", "To open the search function"],
            "answer": "To reload the current webpage or document view"
        },
        {
            "question": "Which of these is NOT a programming language?",
            "options": ["Python", "Java", "Cobra", "Excel"],
            "answer": "Excel"
        },
        {
            "question": "What is the common name for a USB port's rectangular connector?",
            "options": ["Type-A", "Type-B", "Type-C", "Micro-USB"],
            "answer": "Type-A"
        },
        {
            "question": "What does SSD stand for in data storage?",
            "options": ["Super Speed Disk", "Solid State Drive", "System Storage Device", "Serial Storage Data"],
            "answer": "Solid State Drive"
        },
        {
            "question": "Which Internet protocol is used to securely transfer files between a local and a remote host?",
            "options": ["FTP", "SFTP", "HTTP", "SMTP"],
            "answer": "SFTP"
        },
        {
            "question": "What is the purpose of the 'Hyper-V' feature in Windows?",
            "options": ["To manage network connections", "To create and manage virtual machines", "To optimize system performance", "To encrypt files"],
            "answer": "To create and manage virtual machines"
        },
        {
            "question": "In MS Word, which feature allows you to create a dynamic table of contents that updates automatically?",
            "options": ["Insert > Table", "References > Table of Contents", "Layout > Contents", "View > Document Map"],
            "answer": "References > Table of Contents"
        },
        {
            "question": "What does GUI stand for?",
            "options": ["Graphical User Interface", "General Utility Interface", "Global User Integration", "Graphic Unified Interlink"],
            "answer": "Graphical User Interface"
        },
        {
            "question": "Which of these is a function of an optical mouse?",
            "options": ["It uses a laser to track movement", "It connects via Bluetooth only", "It requires a special mouse pad", "It has no moving parts"],
            "answer": "It uses a laser to track movement"
        },
        {
            "question": "What is the primary purpose of a router in a home network?",
            "options": ["To provide power to devices", "To connect multiple networks and direct traffic", "To display web pages", "To store files centrally"],
            "answer": "To connect multiple networks and direct traffic"
        },
        {
            "question": "What does the 'S' in HTTPS stand for?",
            "options": ["Standard", "Secure", "System", "Service"],
            "answer": "Secure"
        },
        {
            "question": "Which of these is an example of an output device?",
            "options": ["Microphone", "Webcam", "Projector", "Barcode Reader"],
            "answer": "Projector"
        },
        {
            "question": "What is the full form of GIF?",
            "options": ["Graphic Interchange Format", "Global Image File", "Graphical Integrated Format", "General Image Framework"],
            "answer": "Graphic Interchange Format"
        },
        {
            "question": "What is the standard file extension for a Microsoft Excel workbook?",
            "options": [".docx", ".ppt", ".xlsx", ".accdb"],
            "answer": ".xlsx"
        },
        {
            "question": "What does LAN stand for?",
            "options": ["Long Area Network", "Local Area Network", "Linked Access Node", "Large Access Network"],
            "answer": "Local Area Network"
        },
        {
            "question": "Which key combination is typically used to paste copied text?",
            "options": ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
            "answer": "Ctrl + V"
        },
        {
            "question": "What is the function of a 'cache' in computing?",
            "options": ["To permanently save user passwords", "To temporarily store data for faster access", "To act as the main memory of the computer", "To cool down the CPU"],
            "answer": "To temporarily store data for faster access"
        },
        {
            "question": "What does IP stand for in 'IP Address'?",
            "options": ["Internet Protocol", "Internal Program", "Internet Provider", "Integrated Processing"],
            "answer": "Internet Protocol"
        },
        {
            "question": "Which of these is a search engine?",
            "options": ["Wikipedia", "Bing", "Facebook", "Instagram"],
            "answer": "Bing"
        },
        {
            "question": "What is the purpose of a QR code?",
            "options": ["To encrypt data", "To store information in a machine-readable format", "To act as a website's address", "To improve wireless signal strength"],
            "answer": "To store information in a machine-readable format"
        },
        {
            "question": "What does ROM stand for?",
            "options": ["Read-Only Memory", "Random Order Memory", "Read-Only Module", "Random Output Mechanism"],
            "answer": "Read-Only Memory"
        },
        {
            "question": "Which of these is a social engineering attack targeting personal information?",
            "options": ["Phishing", "Spamming", "Formatting", "Defragmenting"],
            "answer": "Phishing"
        },
        {
            "question": "What is the main difference between a 'bit' and a 'byte'?",
            "options": ["A bit is 8 times larger than a byte", "A byte is 8 times larger than a bit", "They are the same thing", "A bit represents text, a byte represents numbers"],
            "answer": "A byte is 8 times larger than a bit"
        },
        {
            "question": "What does DNS stand for and what is its primary role?",
            "options": ["Data Network Service - provides internet speed", "Domain Name System - translates domain names to IP addresses", "Digital Naming Standard - creates website names", "Direct Network Signal - boosts Wi-Fi"],
            "answer": "Domain Name System - translates domain names to IP addresses"
        },
        {
            "question": "Which of these is a volatile memory type?",
            "options": ["SSD", "Hard Disk Drive", "RAM", "ROM"],
            "answer": "RAM"
        },
        {
            "question": "What is 'Bluetooth' primarily used for?",
            "options": ["Long-distance internet connectivity", "Short-range wireless data transfer", "High-speed wired connections", "Powering devices without batteries"],
            "answer": "Short-range wireless data transfer"
        },
        {
            "question": "What does the term 'Open Source' mean for software?",
            "options": ["The software is free to use", "The source code is publicly accessible and modifiable", "The software is only available online", "The software cannot be sold"],
            "answer": "The source code is publicly accessible and modifiable"
        },
        {
            "question": "What is the primary function of a compiler?",
            "options": ["To protect against viruses", "To translate high-level code into machine code", "To manage hardware resources", "To connect to the internet"],
            "answer": "To translate high-level code into machine code"
        },
        {
            "question": "What does WYSIWYG stand for in word processing?",
            "options": ["What You See Is What You Get", "Why You See Is What You Get", "What You See Is Why You Get", "When You See Is What You Get"],
            "answer": "What You See Is What You Get"
        },
        {
            "question": "Which of these is a video conferencing software?",
            "options": ["Slack", "Zoom", "Trello", "WordPress"],
            "answer": "Zoom"
        },
        {
            "question": "What is the role of a 'kernel' in an operating system?",
            "options": ["It provides the user interface", "It is the core that manages CPU, RAM, and devices", "It runs application software", "It connects the computer to a network"],
            "answer": "It is the core that manages CPU, RAM, and devices"
        },
        {
            "question": "What does ISP stand for?",
            "options": ["Internet Service Provider", "Internal System Program", "Integrated Security Protocol", "Internet Security Package"],
            "answer": "Internet Service Provider"
        },
        {
            "question": "What is 'two-factor authentication' designed to do?",
            "options": ["Double your internet speed", "Provide two email addresses", "Add an extra layer of security to logins", "Allow logging in from two devices simultaneously"],
            "answer": "Add an extra layer of security to logins"
        },
        {
            "question": "What is the full form of SQL?",
            "options": ["Structured Query Language", "Simple Question Language", "Standard Query Logic", "System Query Link"],
            "answer": "Structured Query Language"
        },
        {
            "question": "Which protocol is used to retrieve emails from a mail server?",
            "options": ["SMTP", "FTP", "POP3", "HTTP"],
            "answer": "POP3"
        },
        {
            "question": "What is the purpose of a 'cookie' in web browsing?",
            "options": ["It stores malicious software", "It stores small pieces of data to remember user information", "It increases browser speed", "It blocks advertisements"],
            "answer": "It stores small pieces of data to remember user information"
        },
        {
            "question": "What does CAD stand for?",
            "options": ["Computer-Aided Design", "Computer Application Development", "Centralized Application Data", "Creative Audio Design"],
            "answer": "Computer-Aided Design"
        },
        {
            "question": "What is the function of the 'Touchpad' on a laptop?",
            "options": ["To provide power", "To act as a pointing device (like a mouse)", "To cool the system", "To display output"],
            "answer": "To act as a pointing device (like a mouse)"
        },
        {
            "question": "What does the term 'Plug and Play' describe?",
            "options": ["A video game", "The ability for a system to configure new hardware automatically", "A type of USB cable", "A feature to connect to multiple monitors"],
            "answer": "The ability for a system to configure new hardware automatically"
        },
        {
            "question": "What is 'Phishing'?",
            "options": ["A type of hardware failure", "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity", "A method to speed up a computer", "A programming language"],
            "answer": "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity"
        },
        {
            "question": "What does JPEG stand for?",
            "options": ["Joint Photographic Experts Group", "Jumbled Picture Encoding Graphics", "Justified Pixel Enhancement Guide", "Junior Programmers Electronic Group"],
            "answer": "Joint Photographic Experts Group"
        },
        {
            "question": "Which of these is a database management system?",
            "options": ["MySQL", "Java", "Photoshop", "PowerPoint"],
            "answer": "MySQL"
        },
        {
            "question": "What is the purpose of the 'Recycle Bin' or 'Trash'?",
            "options": ["To permanently delete files", "To temporarily store deleted files before permanent deletion", "To compress files to save space", "To burn files to a CD"],
            "answer": "To temporarily store deleted files before permanent deletion"
        },
        {
            "question": "What does VoIP stand for?",
            "options": ["Video over Internet Protocol", "Voice over Internet Protocol", "Virtual Office Internet Phone", "Very Optimized Internet Program"],
            "answer": "Voice over Internet Protocol"
        },
        {
            "question": "What is 'Defragmentation'?",
            "options": ["The process of removing viruses", "The process of reorganizing data on a disk to improve efficiency", "The process of deleting temporary files", "The process of backing up data"],
            "answer": "The process of reorganizing data on a disk to improve efficiency"
        },
        {
            "question": "What does API stand for?",
            "options": ["Application Programming Interface", "Advanced Program Interaction", "Automated Process Integration", "Applied Protocol Interface"],
            "answer": "Application Programming Interface"
        },
        {
            "question": "Which of these is a version control system?",
            "options": ["Git", "Java", "Excel", "Python"],
            "answer": "Git"
        },
        {
            "question": "What is 'Bandwidth' in networking?",
            "options": ["The physical width of a network cable", "The maximum rate of data transfer across a network path", "The security protocol of a network", "The brand name of a router"],
            "answer": "The maximum rate of data transfer across a network path"
        },
        {
            "question": "What does OCR stand for?",
            "options": ["Optical Character Recognition", "Online Content Reader", "Operational Code Regulator", "Official Computer Resource"],
            "answer": "Optical Character Recognition"
        },
        {
            "question": "What is a 'Firewall' used for?",
            "options": ["To prevent physical fire damage", "To block unauthorized access while allowing outgoing communication", "To increase processor speed", "To create wireless networks"],
            "answer": "To block unauthorized access while allowing outgoing communication"
        },
        {
            "question": "What does SaaS stand for?",
            "options": ["Security as a Service", "Software as a Service", "System as a Server", "Storage as a Solution"],
            "answer": "Software as a Service"
        },
        {
            "question": "What is the primary function of a 'Switch' in a network?",
            "options": ["To connect multiple devices on a LAN and forward data to the correct destination", "To connect to the internet", "To provide Wi-Fi access", "To block viruses"],
            "answer": "To connect multiple devices on a LAN and forward data to the correct destination"
        },
        {
            "question": "What is 'Metadata'?",
            "options": ["A type of malware", "Data that provides information about other data", "A large database", "A backup copy of data"],
            "answer": "Data that provides information about other data"
        },
        {
            "question": "What does RTF stand for in document files?",
            "options": ["Rich Text Format", "Real Time File", "Revised Text Form", "Rapid Transfer Format"],
            "answer": "Rich Text Format"
        },
        {
            "question": "What is the purpose of 'Disk Cleanup' utility?",
            "options": ["To defragment the hard drive", "To delete unnecessary files to free up disk space", "To scan for and remove viruses", "To create a system restore point"],
            "answer": "To delete unnecessary files to free up disk space"
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