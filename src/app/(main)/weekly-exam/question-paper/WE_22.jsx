const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

const allQuestions = [
    {
        "question": "In Tally Prime, which shortcut key is used to toggle between the Calculator and the current screen?",
        "options": ["Ctrl + N", "Ctrl + M", "Ctrl + L", "F12"],
        "answer": "Ctrl + N"
    },
    {
        "question": "Which of these is NOT a predefined Stock Category in Tally?",
        "options": ["Raw Material", "Finished Goods", "Work-in-Progress", "Packaging Material"],
        "answer": "Packaging Material"
    },
    {
        "question": "What is the primary purpose of the 'Cost Centre Class' feature?",
        "options": ["To allocate budgets to cost centres", "To automatically assign cost centres to specific types of vouchers", "To create hierarchical cost centres", "To generate cost centre-wise profit & loss reports"],
        "answer": "To automatically assign cost centres to specific types of vouchers"
    },
    {
        "question": "Which voucher type is specifically used to record a bad debt written off?",
        "options": ["Journal Voucher", "Receipt Voucher", "Memo Voucher", "Credit Note"],
        "answer": "Journal Voucher"
    },
    {
        "question": "How do you activate the 'Zero-valued entries' option to display all ledger accounts in reports, even with no activity?",
        "options": ["F11: Accounting Features", "F12: Configuration", "It is always active by default", "Alt+F12: Tally Audit features"],
        "answer": "F12: Configuration"
    },
    {
        "question": "Which Tally report provides the most detailed view of transactions that make up a ledger's balance?",
        "options": ["Balance Sheet", "Day Book", "Ledger Vouchers", "Account Books"],
        "answer": "Ledger Vouchers"
    },
    {
        "question": "What does the 'Use Rev Journal for Voucher Type' option enable?",
        "options": ["Allows reversing journal entries for a specific voucher type", "Enables revised invoices for sales vouchers", "Allows journal entries to be reversed automatically on a specified date", "It is used for revenue recognition"],
        "answer": "Allows reversing journal entries for a specific voucher type"
    },
    {
        "question": "Which of these is a mandatory field to activate the GST tax reporting features in Tally?",
        "options": ["State where the company is registered", "HSN/SAC code for every item", "GSTIN/UIN of the company", "Date of GST registration"],
        "answer": "GSTIN/UIN of the company"
    },
    {
        "question": "The 'Bank Reconciliation' statement is used to reconcile the company's cash book balance with the:",
        "options": ["Balance as per the company's Profit & Loss A/c", "Balance as per the company's Balance Sheet", "Balance as per the bank's passbook/statement", "Balance as per the company's journal"],
        "answer": "Balance as per the bank's passbook/statement"
    },
    {
        "question": "Which Tally feature allows you to create a voucher once and then use it as a template for recurring transactions?",
        "options": ["Voucher Class", "Cost Centre Class", "Voucher Type", "Optional Voucher"],
        "answer": "Voucher Type"
    },
    {
        "question": "To record a fixed asset purchase along with additional expenses like freight and installation, which voucher is most appropriate?",
        "options": ["Payment Voucher", "Journal Voucher", "Purchase Voucher", "Contra Voucher"],
        "answer": "Journal Voucher"
    },
    {
        "question": "What is the correct path to create a new company in Tally Prime?",
        "options": ["Gateway of Tally > Create Company", "From the Company Info menu > Create Company", "Pressing Ctrl+N from the desktop", "It is created automatically upon installation"],
        "answer": "From the Company Info menu > Create Company"
    },
    {
        "question": "Which key is used to select multiple ledgers or vouchers for a combined report or action?",
        "options": ["Shift key", "Spacebar", "Ctrl key", "Alt key"],
        "answer": "Spacebar"
    },
    {
        "question": "The 'Bill-wise Details' feature is essential for tracking:",
        "options": ["Employee salaries", "Outstanding payments from customers and to suppliers", "Inventory stock levels", "Cost centre allocations"],
        "answer": "Outstanding payments from customers and to suppliers"
    },
    {
        "question": "Which voucher type is used to record money transferred from a cash account to a bank account?",
        "options": ["Payment Voucher", "Receipt Voucher", "Contra Voucher", "Journal Voucher"],
        "answer": "Contra Voucher"
    },
    {
        "question": "What is the primary function of the 'Memorandum Voucher'?",
        "options": ["To record a provisional or non-accounting transaction", "To record a mandatory statutory transaction", "To correct an error in a past voucher", "To record a payment to a vendor"],
        "answer": "To record a provisional or non-accounting transaction"
    },
    {
        "question": "In which report can you quickly see a summary of all vouchers entered on a specific day?",
        "options": ["Balance Sheet", "Trial Balance", "Day Book", "Cash Flow Statement"],
        "answer": "Day Book"
    },
    {
        "question": "Which F11 feature must be enabled to track outstanding receivables and payables?",
        "options": ["Maintain balances bill-by-bill", "Enable Cost Centres", "Integrate accounts and inventory", "Use Debit/Credit Notes"],
        "answer": "Maintain balances bill-by-bill"
    },
    {
        "question": "To change the financial year of an existing company, you must:",
        "options": ["Alter the date in F12: Configuration", "Use the 'Change Period' option from the Gateway of Tally", "Create a new company and start fresh", "It cannot be changed once set"],
        "answer": "Create a new company and start fresh"
    },
    {
        "question": "Which Tally feature allows you to generate e-way bills directly?",
        "options": ["Tally eFile", "Tally TaxPro", "Tally Integration with GST Portal", "e-Invoicing"],
        "answer": "Tally Integration with GST Portal"
    },
    {
        "question": "What does the 'Post-dated' checkbox in a voucher do?",
        "options": ["Prevents the voucher from affecting reports until the future date arrives", "Backdates the voucher to a previous period", "Marks the voucher for audit", "Sends a reminder on the future date"],
        "answer": "Prevents the voucher from affecting reports until the future date arrives"
    },
    {
        "question": "The 'Scenario' feature in Tally is used for:",
        "options": ["Managing user security roles", "Creating and comparing different financial projections", "Setting up different geographical locations", "Defining audit scenarios"],
        "answer": "Creating and comparing different financial projections"
    },
    {
        "question": "Which ledger is automatically created by Tally when you enable inventory features?",
        "options": ["Sales Account", "Purchase Account", "Stock-in-Hand", "Profit & Loss Account"],
        "answer": "Stock-in-Hand"
    },
    {
        "question": "To record a full and final settlement payment received from a customer that is less than the billed amount, you would use:",
        "options": ["Receipt Voucher with 'On Account' allocation", "Payment Voucher", "Receipt Voucher with 'Advance' allocation", "Receipt Voucher with 'Bill-wise' allocation, marking the bill as settled with a discount"],
        "answer": "Receipt Voucher with 'Bill-wise' allocation, marking the bill as settled with a discount"
    },
    {
        "question": "Which key provides 'Quick Help' or 'What This Is?' context-sensitive information in Tally Prime?",
        "options": ["F1", "Alt+H", "Ctrl+H", "F2"],
        "answer": "Alt+H"
    },
    {
        "question": "The 'Tally Audit' feature allows you to:",
        "options": ["File tax audits directly", "Track changes made to vouchers after they are finalized", "Audit the Tally software code", "Check for data corruption"],
        "answer": "Track changes made to vouchers after they are finalized"
    },
    {
        "question": "Which of these is a mandatory field when creating a ledger under the 'Sundry Debtors' group?",
        "options": ["Opening Balance", "Mailing Details", "Inventory Values", "Tax Registration Details"],
        "answer": "Opening Balance"
    },
    {
        "question": "What is the purpose of the 'Reversing Journal' voucher type?",
        "options": ["To permanently delete an incorrect journal", "To create a journal entry that is automatically reversed on the first day of the next accounting period", "To reverse the polarity of all debits and credits", "To journalize bank reversals"],
        "answer": "To create a journal entry that is automatically reversed on the first day of the next accounting period"
    },
    {
        "question": "In GST, which report in Tally shows the summary of inward supplies (purchases) liable for reverse charge?",
        "options": ["GSTR-1", "GSTR-3B", "GSTR-2A", "GSTR-4"],
        "answer": "GSTR-2A"
    },
    {
        "question": "Which option in F11 (Accounting Features) is required to use the 'Cost Categories' and 'Cost Centres'?",
        "options": ["Maintain balances bill-by-bill", "Enable Cost Centres", "Use Payroll", "Enable GST"],
        "answer": "Enable Cost Centres"
    },
    {
        "question": "To take a printout of a voucher in Tally, you would press:",
        "options": ["Ctrl+P", "Alt+P", "Shift+P", "P"],
        "answer": "Alt+P"
    },
    {
        "question": "The 'Optional Voucher' feature is used to:",
        "options": ["Make voucher entry non-mandatory", "Mark a voucher as provisional", "Provide additional fields for information not in the standard voucher", "Skip voucher numbering"],
        "answer": "Provide additional fields for information not in the standard voucher"
    },
    {
        "question": "Which ledger is typically grouped under 'Indirect Expenses'?",
        "options": ["Purchase Account", "Telephone Expenses", "Sales Account", "Loans Received"],
        "answer": "Telephone Expenses"
    },
    {
        "question": "What does the 'Nett Bank' option in a Payment Voucher do?",
        "options": ["Records only net payments after TDS", "Connects to internet banking", "Calculates bank charges automatically", "Records a payment where bank charges are borne by the company, reducing the amount credited to the party"],
        "answer": "Records a payment where bank charges are borne by the company, reducing the amount credited to the party"
    },
    {
        "question": "Which report is crucial for verifying that the total of all debit balances equals the total of all credit balances?",
        "options": ["Balance Sheet", "Profit & Loss Statement", "Trial Balance", "Cash Flow Statement"],
        "answer": "Trial Balance"
    },
    {
        "question": "To change the default 'Date' and 'Voucher Number' of a voucher before saving, you use:",
        "options": ["F2 key", "F3 key", "F4 key", "Ctrl+A"],
        "answer": "F2 key"
    },
    {
        "question": "The 'Stock Journal' voucher is used for:",
        "options": ["Recording purchase of stock", "Recording sale of stock", "Transferring stock between godowns or locations", "Writing off damaged stock"],
        "answer": "Transferring stock between godowns or locations"
    },
    {
        "question": "Which Tally Prime feature allows you to view two reports on the screen simultaneously?",
        "options": ["Multi-Tasking", "Split Screen", "Multi-View", "Report Compare"],
        "answer": "Multi-View"
    },
    {
        "question": "When creating a sales voucher for a customer outside India, you should set the 'Consignee/ Buyer' country to 'Other' to ensure:",
        "options": ["No GST is calculated on the invoice", "Higher GST is applied", "IGST is applied instead of CGST+SGST", "The invoice is printed in a different language"],
        "answer": "No GST is calculated on the invoice"
    },
    {
        "question": "Which key is used to shut down Tally Prime?",
        "options": ["Alt+Ctrl+Q", "Ctrl+Q", "Esc key until exit", "There is no specific key, use the Quit button"],
        "answer": "Alt+Ctrl+Q"
    },
    {
        "question": "The 'Physical Stock' voucher is used to:",
        "options": ["Record stock received from a supplier", "Record stock dispatched to a customer", "Adjust the book stock to match the actual physical count", "Create a new stock item"],
        "answer": "Adjust the book stock to match the actual physical count"
    },
    {
        "question": "Which of these is a predefined Tally group?",
        "options": ["Google", "Facebook", "Capital Account", "Office Supplies"],
        "answer": "Capital Account"
    },
    {
        "question": "To record a transaction where you pay a salary to an employee and deduct TDS, you would use a:",
        "options": ["Payment Voucher", "Journal Voucher", "Payroll Voucher", "Receipt Voucher"],
        "answer": "Payment Voucher"
    },
    {
        "question": "What is the main purpose of the 'Budget' feature in Tally?",
        "options": ["To plan and control income and expenditure by comparing actuals against estimates", "To calculate employee bonuses", "To set aside money for tax payments", "To create project proposals"],
        "answer": "To plan and control income and expenditure by comparing actuals against estimates"
    },
    {
        "question": "Which voucher type would you use to record a dishonored cheque received from a customer?",
        "options": ["Journal Voucher", "Reversing Journal Voucher", "Contra Voucher", "Memo Voucher"],
        "answer": "Journal Voucher"
    },
    {
        "question": "The 'Price List' feature in Tally is used to:",
        "options": ["Set maximum retail prices (MRP) for items", "Define different selling prices for the same item based on criteria like stock category", "List the prices of competitors", "Calculate the average price of purchased items"],
        "answer": "Define different selling prices for the same item based on criteria like stock category"
    },
    {
        "question": "Which gateway of Tally option allows you to correct a wrongly finalized voucher?",
        "options": ["Alter", "Change Voucher", "Unfinalize", "You cannot change a finalized voucher"],
        "answer": "You cannot change a finalized voucher"
    },
    {
        "question": "To see the movement of cash and cash equivalents in and out of the business, you would generate a:",
        "options": ["Profit & Loss Statement", "Balance Sheet", "Trial Balance", "Cash Flow Statement"],
        "answer": "Cash Flow Statement"
    },
    {
        "question": "The 'Order Processing' feature in Tally helps in tracking:",
        "options": ["Customer purchase orders and sales orders", "Court orders", "Order of ledger accounts", "The sequence of voucher entry"],
        "answer": "Customer purchase orders and sales orders"
    },
    {
        "question": "Which key is used to duplicate a voucher or master entry?",
        "options": ["Ctrl+C", "Alt+C", "Ctrl+D", "Alt+D"],
        "answer": "Alt+D"
    },
    {
        "question": "When 'Integrate accounts and inventory' is enabled (F11), recording a sales voucher automatically debits:",
        "options": ["The customer's account and credits the sales account", "The sales account and credits the customer's account", "The bank account and credits the sales account", "The stock account and credits the sales account"],
        "answer": "The customer's account and credits the sales account"
    },
    {
        "question": "Which Tally report provides a breakdown of sales or purchases by item?",
        "options": ["Sales Register", "Outstanding Statement", "Stock Summary", "Godown Summary"],
        "answer": "Sales Register"
    },
    {
        "question": "To record an opening stock value for a new company, you would create a:",
        "options": ["Purchase Voucher dated the first day of the financial year", "Journal Voucher dated the first day of the financial year", "Stock Journal Voucher", "Physical Stock Voucher"],
        "answer": "Journal Voucher dated the first day of the financial year"
    },
    {
        "question": "The 'Tally.NET' feature is primarily used for:",
        "options": ["Accessing Tally on the internet", "Remote access and data synchronization between multiple offices", "Filing taxes online", "Checking for software updates"],
        "answer": "Remote access and data synchronization between multiple offices"
    },
    {
        "question": "Which of these is a stock item tracking method in Tally?",
        "options": ["FIFO (First-In-First-Out)", "LIFO (Last-In-First-Out)", "Average Cost", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "To quickly see the outstanding amount from a specific customer, you can:",
        "options": ["Check the Balance Sheet", "Check the Ledger for that customer and see the closing balance", "Run an Outstanding Statement filtered for that customer", "Both B and C"],
        "answer": "Both B and C"
    },
    {
        "question": "Which key is used to accept a form or data entry screen in Tally?",
        "options": ["Enter", "Ctrl+A", "Tab", "Esc"],
        "answer": "Enter"
    },
    {
        "question": "The 'Payroll' feature in Tally requires which F11 feature to be enabled?",
        "options": ["Enable Payroll", "Maintain Payroll", "Use Payroll", "Integrate Payroll"],
        "answer": "Use Payroll"
    },
    {
        "question": "Which voucher type is used to record the return of damaged goods by a customer?",
        "options": ["Sales Voucher", "Credit Note", "Debit Note", "Rejection Out Voucher"],
        "answer": "Credit Note"
    },
    {
        "question": "The 'Security Control' feature in Tally allows you to:",
        "options": ["Set passwords and restrict user access to specific features and companies", "Install anti-virus software", "Control firewall settings", "Password-protect individual vouchers"],
        "answer": "Set passwords and restrict user access to specific features and companies"
    },
    {
        "question": "Which report shows the value of all assets, liabilities, and capital at a specific point in time?",
        "options": ["Profit & Loss Account", "Trial Balance", "Balance Sheet", "Cash Flow Statement"],
        "answer": "Balance Sheet"
    },
    {
        "question": "To change the default printer for vouchers and reports in Tally, you use:",
        "options": ["F12: Configuration settings", "Windows Control Panel", "The Print dialog box (Alt+P)", "Tally cannot change the default printer"],
        "answer": "F12: Configuration settings"
    },
    {
        "question": "The 'Scenario' management feature is accessed from which level in Tally?",
        "options": ["From the voucher entry screen", "From the Gateway of Tally", "From the Company Creation screen", "It is an F11 feature"],
        "answer": "From the Gateway of Tally"
    },
    {
        "question": "Which of these is a type of 'Bill-wise' reference?",
        "options": ["On Account", "Advance", "New Ref", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "The shortcut key to create a master record (like a ledger or stock item) from within a voucher is:",
        "options": ["Alt+C", "Ctrl+C", "Alt+M", "F12"],
        "answer": "Alt+C"
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
  export const WE_22 = getRandomQuestions(questions, 30);    