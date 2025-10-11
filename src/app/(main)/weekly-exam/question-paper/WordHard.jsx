const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const allQuestions = [
    {
        "question": "Which feature allows you to see all the formatting applied to a specific piece of text?",
        "options": ["Format Inspector", "Reveal Formatting", "Style Inspector", "Format Analyzer"],
        "answer": "Reveal Formatting"
    },
    {
        "question": "What is the primary purpose of creating a 'Style' in Word?",
        "options": ["To change the page color", "To save and apply a set of formatting choices consistently", "To insert a pre-formatted table", "To automate spell checking"],
        "answer": "To save and apply a set of formatting choices consistently"
    },
    {
        "question": "Which tab contains the option to link text boxes so that text flows from one to another?",
        "options": ["Home", "Insert", "Shape Format", "Layout"],
        "answer": "Shape Format"
    },
    {
        "question": "What is the keyboard shortcut to insert a manual line break (without starting a new paragraph)?",
        "options": ["Ctrl + Enter", "Shift + Enter", "Alt + Enter", "Tab + Enter"],
        "answer": "Shift + Enter"
    },
    {
        "question": "Which view is best suited for organizing and restructuring a long document with multiple headings?",
        "options": ["Draft View", "Print Layout", "Outline View", "Web Layout"],
        "answer": "Outline View"
    },
    {
        "question": "What does the 'Update Field' command do?",
        "options": ["Refreshes linked data like dates, cross-references, and tables of contents", "Downloads the latest Word update", "Updates the Windows OS", "Saves the document automatically"],
        "answer": "Refreshes linked data like dates, cross-references, and tables of contents"
    },
    {
        "question": "Which feature would you use to prevent a table from splitting across two pages?",
        "options": ["Page Break Before", "Keep with Next", "Keep Lines Together", "Repeat Header Rows"],
        "answer": "Keep Lines Together"
    },
    {
        "question": "Where can you control whether a hyphenated word breaks at a specific point?",
        "options": ["Insert > Special Character > Hyphen", "Layout > Hyphenation > Manual", "By pressing Ctrl + Hyphen", "Both B and C"],
        "answer": "Both B and C"
    },
    {
        "question": "What is the function of a 'Nonbreaking Space' (Ctrl+Shift+Spacebar)?",
        "options": ["Prevents two words from being separated by a line break", "Creates a larger than normal space", "Inserts a tab character", "Deletes a space"],
        "answer": "Prevents two words from being separated by a line break"
    },
    {
        "question": "Which tab allows you to create a custom building block, like a reusable header or disclaimer?",
        "options": ["Home", "Insert", "Design", "File"],
        "answer": "Insert"
    },
    {
        "question": "What is the purpose of the 'Document Inspector' (File > Info > Check for Issues)?",
        "options": ["To check spelling and grammar", "To find and remove hidden metadata and personal information", "To inspect the document's visual design", "To count the number of revisions"],
        "answer": "To find and remove hidden metadata and personal information"
    },
    {
        "question": "Which key do you press to update a calculated field in a table?",
        "options": ["F5", "F9", "F11", "F12"],
        "answer": "F9"
    },
    {
        "question": "What is the difference between 'Paste' and 'Paste Special'?",
        "options": ["Paste Special is faster", "Paste Special allows you to choose the format of the pasted content (e.g., unformatted text)", "Paste Special only works for images", "There is no difference"],
        "answer": "Paste Special allows you to choose the format of the pasted content (e.g., unformatted text)"
    },
    {
        "question": "Which option in the Paragraph dialog box ensures a heading and the next paragraph always stay on the same page?",
        "options": ["Widow/Orphan control", "Keep with next", "Keep lines together", "Page break before"],
        "answer": "Keep with next"
    },
    {
        "question": "How do you create a multi-level list (e.g., 1., 1.1, 1.1.1)?",
        "options": ["By using the Numbering button multiple times", "By defining a new list style under Home > Multilevel List", "Word cannot create multi-level lists", "By using the Tab key after starting a numbered list"],
        "answer": "By defining a new list style under Home > Multilevel List"
    },
    {
        "question": "What does 'Widow/Orphan control' in the Paragraph settings do?",
        "options": ["Prevents single lines of a paragraph from being left alone at the top or bottom of a page", "Controls the spacing between characters", "Manages the document's security settings", "Finds and replaces single instances of words"],
        "answer": "Prevents single lines of a paragraph from being left alone at the top or bottom of a page"
    },
    {
        "question": "Which feature allows you to see two different parts of the same document at the same time?",
        "options": ["New Window & Arrange All", "Split View", "Outline View", "Both A and B"],
        "answer": "Both A and B"
    },
    {
        "question": "What is a 'Cross-reference' used for?",
        "options": ["Citing external sources", "Creating a link to a heading, bookmark, or figure number within the document", "Linking to a website", "Comparing two documents"],
        "answer": "Creating a link to a heading, bookmark, or figure number within the document"
    },
    {
        "question": "Where would you go to change the default font for all new documents?",
        "options": ["Home > Font > Set as Default", "Design > Themes > Fonts > Customize Fonts", "File > Options > Save > Default Font", "File > Options > General > Default Theme"],
        "answer": "Home > Font > Set as Default"
    },
    {
        "question": "What is the purpose of adding a 'Caption' to a figure?",
        "options": ["To add artistic text effects", "To automatically add a numbered label and description that can be referenced", "To change the image size", "To add a copyright notice"],
        "answer": "To automatically add a numbered label and description that can be referenced"
    },
    {
        "question": "Which tab contains the option to create an 'AutoText' entry?",
        "options": ["Home", "Insert", "Review", "It's accessed via the Quick Access Toolbar menu"],
        "answer": "Insert"
    },
    {
        "question": "What is the function of a 'Bookmark'?",
        "options": ["To save a webpage in Word", "To mark a specific location in a document for quick navigation or reference", "To mark where you stopped reading", "To highlight important text in yellow"],
        "answer": "To mark a specific location in a document for quick navigation or reference"
    },
    {
        "question": "How can you prevent a specific paragraph from being spell-checked?",
        "options": ["By locking the document", "By setting the paragraph's language to 'Do not check spelling or grammar'", "By adding it to the dictionary", "This is not possible in Word"],
        "answer": "By setting the paragraph's language to 'Do not check spelling or grammar'"
    },
    {
        "question": "What does the 'Compare' feature (Review tab) do?",
        "options": ["Compares the prices of different Microsoft products", "Combines revisions from multiple authors into a single document", "Highlights grammatical differences between two texts", "Shows the difference between two versions of a document"],
        "answer": "Shows the difference between two versions of a document"
    },
    {
        "question": "Which key combination selects text from the cursor to the end of the document?",
        "options": ["Ctrl + Shift + Down Arrow", "Ctrl + Shift + End", "Ctrl + A", "Shift + Page Down"],
        "answer": "Ctrl + Shift + End"
    },
    {
        "question": "What is the purpose of a 'Content Control' like a date picker or drop-down list?",
        "options": ["To make the document look more professional", "To restrict and structure the information users can enter in a template", "To control the page content layout", "To add interactive web elements"],
        "answer": "To restrict and structure the information users can enter in a template"
    },
    {
        "question": "Which feature allows you to generate a list of figures or tables for your document?",
        "options": ["Insert Table of Figures", "Insert Index", "Insert Captions", "Insert Table of Authorities"],
        "answer": "Insert Table of Figures"
    },
    {
        "question": "What is the 'Organizer' used for in the Styles pane?",
        "options": ["Organizing your files on the computer", "Copying, deleting, and renaming styles between documents and templates", "Organizing the order of pages", "Managing the Quick Access Toolbar"],
        "answer": "Copying, deleting, and renaming styles between documents and templates"
    },
    {
        "question": "How do you create a 'Custom Building Block' for a reusable piece of content?",
        "options": ["Select the content, then go to Insert > Text Box > Save Selection to Text Box Gallery", "Select the content, then go to File > Save As > Word Template", "Select the content, then go to Insert > Quick Parts > Save Selection to Quick Part Gallery", "Drag the content to the Quick Access Toolbar"],
        "answer": "Select the content, then go to Insert > Quick Parts > Save Selection to Quick Part Gallery"
    },
    {
        "question": "What does the '§' symbol represent in the 'Show/Hide ¶' view?",
        "options": ["A section break", "A tab character", "A paragraph mark", "A page break"],
        "answer": "A paragraph mark"
    },
    {
        "question": "Which option allows you to start page numbering on the second page as '1'?",
        "options": ["Different First Page", "Different Odd & Even Pages", "Link to Previous", "Format Page Numbers > Start at: 0"],
        "answer": "Different First Page"
    },
    {
        "question": "What is the main advantage of using a 'Table of Figures'?",
        "options": ["It automatically creates images for your document.", "It generates a list of all figures with their page numbers, which update automatically.", "It improves the image quality.", "It counts the number of figures used."],
        "answer": "It generates a list of all figures with their page numbers, which update automatically."
    },
    {
        "question": "How can you apply the same formatting as the surrounding text to pasted content?",
        "options": ["Use Paste Special > Formatted Text (RTF)", "Use the 'Merge Formatting' paste option", "Use the 'Keep Text Only' paste option", "Use the 'Apply Source Formatting' option"],
        "answer": "Use the 'Merge Formatting' paste option"
    },
    {
        "question": "What is the function of the 'Select Browse Object' button (the round dot at the bottom of the vertical scrollbar)?",
        "options": ["To change the mouse pointer", "To browse by specific elements like comments, headings, or graphics", "To open the Navigation Pane", "To zoom in and out"],
        "answer": "To browse by specific elements like comments, headings, or graphics"
    },
    {
        "question": "Which feature would you use to create a unique layout for a specific part of your document, such as a landscape-oriented page in a portrait document?",
        "options": ["Page Breaks", "Text Wrapping", "Section Breaks", "Columns"],
        "answer": "Section Breaks"
    },
    {
        "question": "What does the 'Restrict Editing' feature allow you to do?",
        "options": ["Prevent users from opening the file", "Limit the types of changes others can make to the document", "Password-protect the file from being viewed", "Lock the document's formatting"],
        "answer": "Limit the types of changes others can make to the document"
    },
    {
        "question": "Which key combination moves the cursor to the beginning of the previous word?",
        "options": ["Ctrl + Left Arrow", "Ctrl + Right Arrow", "Alt + Left Arrow", "Home"],
        "answer": "Ctrl + Left Arrow"
    },
    {
        "question": "What is the purpose of a 'Macro' in Word?",
        "options": ["A type of virus", "A pre-designed template", "A recorded series of commands to automate a repetitive task", "A large image file"],
        "answer": "A recorded series of commands to automate a repetitive task"
    },
    {
        "question": "Where is the 'Manage Sources' feature for citations and bibliographies located?",
        "options": ["Review Tab", "References Tab", "Insert Tab", "File Tab"],
        "answer": "References Tab"
    },
    {
        "question": "What is the difference between a 'Next Page' section break and a 'Continuous' section break?",
        "options": ["Next Page starts the new section on the next page; Continuous starts it on the same page.", "There is no difference.", "Continuous is for web pages, Next Page is for print.", "Next Page is for text, Continuous is for images."],
        "answer": "Next Page starts the new section on the next page; Continuous starts it on the same page."
    },
    {
        "question": "Which feature allows you to see the hierarchical structure of your document and easily promote/demote headings?",
        "options": ["Navigation Pane", "Styles Pane", "Outline View", "Both A and C"],
        "answer": "Both A and C"
    },
    {
        "question": "What is the shortcut to create a new, default 'Quick Table' from the Insert Tab?",
        "options": ["Ctrl + T", "Ctrl + Q", "Alt + T", "There is no direct shortcut, it must be clicked."],
        "answer": "There is no direct shortcut, it must be clicked."
    },
    {
        "question": "How do you create a 'Hanging Indent' where the first line is to the left of the rest of the paragraph?",
        "options": ["Drag the bottom triangle on the ruler", "Drag the top triangle on the ruler", "Drag the square box on the ruler", "Use the 'Before Text' indent in the Paragraph dialog"],
        "answer": "Drag the top triangle on the ruler"
    },
    {
        "question": "What does the 'Embed Fonts' option in the Save settings do?",
        "options": ["Makes the text uneditable", "Ensures the fonts used in the document are available on other computers when opened", "Compresses the file size", "Converts all text to images"],
        "answer": "Ensures the fonts used in the document are available on other computers when opened"
    },
    {
        "question": "Which key combination is used to extend a selection one character to the right?",
        "options": ["Shift + Right Arrow", "Ctrl + Right Arrow", "Alt + Right Arrow", "Tab"],
        "answer": "Shift + Right Arrow"
    },
    {
        "question": "What is the purpose of the 'Add a Watermark' feature?",
        "options": ["To add a background image to a page", "To add a background text like 'CONFIDENTIAL' or 'DRAFT' behind the main text", "To add a transparent image overlay", "To add a copyright symbol to every page"],
        "answer": "To add a background text like 'CONFIDENTIAL' or 'DRAFT' behind the main text"
    },
    {
        "question": "In the Table Properties, what does the 'Repeat as header row at the top of each page' option do?",
        "options": ["It copies the entire table to every page.", "It prints the first row of the table on every page if the table spans multiple pages.", "It adds a new header row to the table.", "It locks the first row so it can't be edited."],
        "answer": "It prints the first row of the table on every page if the table spans multiple pages."
    },
    {
        "question": "Which feature allows you to create a personalized letter for each person on a mailing list?",
        "options": ["Mail Merge", "Form Letters", "Quick Parts", "Document Assembly"],
        "answer": "Mail Merge"
    },
    {
        "question": "What is the function of the 'Format Painter' double-click?",
        "options": ["It copies formatting to multiple items in succession.", "It pastes formatting in two places at once.", "It opens the Format dialog box.", "It does the same thing as a single-click."],
        "answer": "It copies formatting to multiple items in succession."
    },
    {
        "question": "Where can you find the option to change the default 'Line Numbering' setting for a document?",
        "options": ["Home Tab > Paragraph Group", "Insert Tab > Page Numbering", "Layout Tab > Page Setup Group", "Review Tab > Tracking Group"],
        "answer": "Layout Tab > Page Setup Group"
    },
    {
        "question": "What is a 'Nested Table'?",
        "options": ["A table that is placed in the header", "A table placed inside a cell of another table", "A table with a complex border style", "A table that is linked to an Excel spreadsheet"],
        "answer": "A table placed inside a cell of another table"
    },
    {
        "question": "Which key combination selects a vertical block of text?",
        "options": ["Ctrl + Shift + F8", "Alt + Drag with mouse", "Ctrl + A", "Both A and B"],
        "answer": "Both A and B"
    },
    {
        "question": "What is the purpose of the 'Spike' feature?",
        "options": ["A special type of chart", "To cut multiple items from different locations and paste them as a group", "A type of list bullet", "To mark a location in the document"],
        "answer": "To cut multiple items from different locations and paste them as a group"
    },
    {
        "question": "How do you access the 'Create New Style from Formatting' dialog box?",
        "options": ["Right-click formatted text > Styles > Save Selection as a New Quick Style", "Home Tab > Styles Pane > New Style", "Design Tab > New Style", "Both A and B"],
        "answer": "Both A and B"
    },
    {
        "question": "What does the 'Ignore All' command do in the spell checker?",
        "options": ["Adds the word to the custom dictionary", "Ignores the current instance of the word for this session only", "Ignores all instances of the word in this document", "Deletes all instances of the word"],
        "answer": "Ignores all instances of the word in this document"
    },
    {
        "question": "Which feature allows you to see the document's structure and easily rearrange sections by dragging headings?",
        "options": ["Thumbnails Pane", "Navigation Pane", "Outline View", "Both B and C"],
        "answer": "Both B and C"
    },
    {
        "question": "What is the purpose of setting a 'Precise Tabs' using the Tabs dialog box?",
        "options": ["To align text at a specific, measured position on the ruler", "To create dot leaders", "To set tabs that are indented from the margin", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "In Mail Merge, what is the 'Main Document'?",
        "options": ["The document containing the list of names and addresses", "The template that contains the boilerplate text and merge fields", "The final merged output", "The data source from Excel"],
        "answer": "The template that contains the boilerplate text and merge fields"
    },
    {
        "question": "What does the 'Update Table of Contents' command do?",
        "options": ["Updates the page numbers and headings to reflect changes in the document", "Changes the style of the table", "Creates a new table of contents", "Refreshes the data from a linked source"],
        "answer": "Updates the page numbers and headings to reflect changes in the document"
    },
    {
        "question": "Which key combination is used to insert a hyperlink?",
        "options": ["Ctrl + H", "Ctrl + K", "Ctrl + L", "Ctrl + I"],
        "answer": "Ctrl + K"
    },
    {
        "question": "What is the function of the 'Text Direction' button in a table?",
        "options": ["Changes the direction of the entire document", "Rotates text within selected table cells", "Changes the page orientation", "Aligns text to the left or right"],
        "answer": "Rotates text within selected table cells"
    },
    {
        "question": "How can you create a 'Custom Tab Stop' that includes leading dots (.......) before the text?",
        "options": ["By pressing the period key repeatedly", "Using the 'Border' feature", "In the Tabs dialog box, selecting a Dot Leader", "Using the Bullets feature"],
        "answer": "In the Tabs dialog box, selecting a Dot Leader"
    },
    {
        "question": "What is the purpose of the 'Split Cells' command in a table?",
        "options": ["To divide a single cell into multiple cells", "To merge two cells into one", "To break a table across two pages", "To add a new row to the table"],
        "answer": "To divide a single cell into multiple cells"
    },
    {
        "question": "Which feature allows you to save a set of color, font, and effect choices as a custom theme?",
        "options": ["Design Tab > Themes", "File > Save As > Word Template", "Home Tab > Change Styles", "Insert Tab > Themes"],
        "answer": "Design Tab > Themes"
    },
    {
        "question": "What does the 'Show Preview' checkbox in the Styles pane do?",
        "options": ["Shows a preview of the page layout", "Shows how the selected text will look with a style before you apply it", "Shows a preview of the printed document", "Shows hidden formatting symbols"],
        "answer": "Shows how the selected text will look with a style before you apply it"
    },
    {
        "question": "In the context of printing, what does 'Collate' mean?",
        "options": ["Print on both sides of the paper", "Print multiple copies in sequence (e.g., 1,2,3 then 1,2,3)", "Print multiple copies sorted by page (e.g., 1,1,1 then 2,2,2)", "Print in black and white"],
        "answer": "Print multiple copies in sequence (e.g., 1,2,3 then 1,2,3)"
    },
    {
        "question": "Which key combination selects text from the cursor to the beginning of the document?",
        "options": ["Ctrl + Shift + Home", "Ctrl + Shift + Up Arrow", "Ctrl + A", "Shift + Page Up"],
        "answer": "Ctrl + Shift + Home"
    },
    {
        "question": "What is the purpose of the 'Document Map'?",
        "options": ["It's an older term for the Navigation Pane that shows headings.", "It shows a geographical map.", "It displays all the bookmarks in the document.", "It creates a visual sitemap for a website."],
        "answer": "It's an older term for the Navigation Pane that shows headings."
    },
    {
        "question": "How do you create a 'Drop Cap' that extends into the margin?",
        "options": ["Insert > Text > Drop Cap > In Margin", "Insert > Text > Drop Cap > Dropped", "You cannot create a drop cap in the margin.", "By manually adjusting the text wrapping."],
        "answer": "Insert > Text > Drop Cap > In Margin"
    },
    {
        "question": "What is the function of the 'Go To' tab in the Find and Replace dialog box?",
        "options": ["To find specific text", "To navigate quickly to a specific page, section, line, or bookmark", "To replace text with formatting", "To search the web"],
        "answer": "To navigate quickly to a specific page, section, line, or bookmark"
    },
    {
        "question": "Which option would you use to have different headers for the first page and the rest of the pages?",
        "options": ["Different First Page", "Different Odd & Even Pages", "Link to Previous", "Show Document Text"],
        "answer": "Different First Page"
    },
    {
        "question": "What does the 'Convert to Text' feature do when applied to a table?",
        "options": ["Deletes the table", "Converts the table's data into regular paragraph text, using separators like tabs or commas", "Converts text into an image of a table", "Changes the table's font"],
        "answer": "Converts the table's data into regular paragraph text, using separators like tabs or commas"
    },
    {
        "question": "Which key is used to move the cursor to the end of the current line?",
        "options": ["Home", "End", "Page Down", "Ctrl + End"],
        "answer": "End"
    },
    {
        "question": "What is the purpose of the 'AutoCaption' feature?",
        "options": ["To automatically generate a table of contents", "To automatically add captions to images, tables, or other objects as you insert them", "To automatically correct capitalization errors", "To automatically save the document"],
        "answer": "To automatically add captions to images, tables, or other objects as you insert them"
    },
    {
        "question": "In a Mail Merge, what is the 'Data Source'?",
        "options": ["The main document template", "The file (like an Excel spreadsheet) that contains the recipient information", "The final merged letters", "The field codes in the document"],
        "answer": "The file (like an Excel spreadsheet) that contains the recipient information"
    },
    {
        "question": "What does the 'Merge Cells' command in a table do?",
        "options": ["Splits a cell into two", "Combines two or more selected cells into one cell", "Adds a new column", "Deletes the selected cells"],
        "answer": "Combines two or more selected cells into one cell"
    },
    {
        "question": "Which feature allows you to see the changes made by different reviewers in different colors?",
        "options": ["Track Changes", "Compare", "Document Inspector", "Version History"],
        "answer": "Track Changes"
    },
    {
        "question": "How can you apply a border to a specific paragraph?",
        "options": ["Using the Table Borders tool", "Using the Page Border feature", "Using the Shading button", "Using the Borders and Shading dialog box in the Paragraph group"],
        "answer": "Using the Borders and Shading dialog box in the Paragraph group"
    },
    {
        "question": "What is the purpose of the 'Insert Address Block' in Mail Merge?",
        "options": ["To draw a block around an address", "To insert a standard formatted address field that pulls from your data source", "To insert a placeholder for a picture", "To create a new data source"],
        "answer": "To insert a standard formatted address field that pulls from your data source"
    },
    {
        "question": "Which key combination is used to decrease the font size by 1 point?",
        "options": ["Ctrl + [", "Ctrl + -", "Ctrl + Shift + <", "Ctrl + ]"],
        "answer": "Ctrl + ["
    },
    {
        "question": "What is the function of the 'Navigation Pane'?",
        "options": ["To manage your computer's files", "To search and navigate through a document by headings, pages, or search results", "To connect to the internet", "To align objects on the page"],
        "answer": "To search and navigate through a document by headings, pages, or search results"
    },
    {
        "question": "How do you create a 'Custom Watermark' with your own text and formatting?",
        "options": ["Design > Watermark > Custom Watermark", "Insert > Text Box > Save as Watermark", "Page Layout > Watermark > Edit Watermark", "You cannot create custom watermarks."],
        "answer": "Design > Watermark > Custom Watermark"
    },
    {
        "question": "What does the 'Allow only this type of editing in the document' option do in Restrict Editing?",
        "options": ["Lets you set a password to open the file", "Lets you force users to only fill in form fields or make no changes at all", "Lets you track changes automatically", "Lets you change the file format"],
        "answer": "Lets you force users to only fill in form fields or make no changes at all"
    },
    {
        "question": "Which key combination is used to increase the font size by 1 point?",
        "options": ["Ctrl + ]", "Ctrl + =", "Ctrl + Shift + >", "Ctrl + }"],
        "answer": "Ctrl + ]"
    },
    {
        "question": "What is the purpose of the 'AutoFormat As You Type' feature?",
        "options": ["To automatically correct spelling mistakes", "To automatically apply formatting like bulleted lists or borders as you type certain characters", "To automatically save the document", "To automatically insert the date"],
        "answer": "To automatically apply formatting like bulleted lists or borders as you type certain characters"
    },
    {
        "question": "In the Table of Contents dialog, what does the 'Show levels' option control?",
        "options": ["The number of heading levels (e.g., Heading 1, Heading 2) included in the table", "The number of pages shown", "The font size of the entries", "The alignment of the page numbers"],
        "answer": "The number of heading levels (e.g., Heading 1, Heading 2) included in the table"
    },
    {
        "question": "What is the function of the 'Show/Hide White Space' command?",
        "options": ["Hides spaces between words", "Shows or hides the gray space between pages in Print Layout view", "Removes all empty paragraphs", "Hides the margins"],
        "answer": "Shows or hides the gray space between pages in Print Layout view"
    },
    {
        "question": "Which feature allows you to insert a placeholder for text that prompts the user for input?",
        "options": ["Text Box", "Content Control (e.g., Plain Text Control)", "Quick Part", "Bookmark"],
        "answer": "Content Control (e.g., Plain Text Control)"
    },
    {
        "question": "How can you quickly select a whole sentence?",
        "options": ["Double-click the sentence", "Triple-click the sentence", "Hold Ctrl and click anywhere in the sentence", "Hold Alt and click the sentence"],
        "answer": "Hold Ctrl and click anywhere in the sentence"
    },
    {
        "question": "What is the purpose of the 'Manage Versions' feature in File > Info?",
        "options": ["To compare two documents", "To access automatically saved previous versions of the current document", "To manage different language versions", "To control the version of Word used to open the file"],
        "answer": "To access automatically saved previous versions of the current document"
    },
    {
        "question": "Which key combination is used to center-align text?",
        "options": ["Ctrl + E", "Ctrl + L", "Ctrl + R", "Ctrl + J"],
        "answer": "Ctrl + E"
    },
    {
        "question": "What does the 'Insert Merge Field' button do in a Mail Merge document?",
        "options": ["Inserts a blank line", "Inserts a field from your data source (e.g., First_Name) into the main document", "Creates a new data source", "Merges all the documents together"],
        "answer": "Inserts a field from your data source (e.g., First_Name) into the main document"
    },
    {
        "question": "How do you create a 'Building Block Gallery' content control?",
        "options": ["Developer Tab > Rich Text Content Control", "Developer Tab > Building Block Gallery Content Control", "Insert Tab > Quick Parts > Building Block", "This is not a standard Word feature."],
        "answer": "Developer Tab > Building Block Gallery Content Control"
    },
    {
        "question": "What is the purpose of the 'Calculate' command (added to the Quick Access Toolbar)?",
        "options": ["To count words", "To perform a simple mathematical calculation on a selected expression (e.g., '5+3') and display the result", "To calculate the average word length", "To create a chart from data"],
        "answer": "To perform a simple mathematical calculation on a selected expression (e.g., '5+3') and display the result"
    },
    {
        "question": "Which feature allows you to link an Excel chart so that it updates when the source data changes?",
        "options": ["Paste Special > Paste as Picture", "Paste Special > Paste Link", "Insert > Chart", "Insert > Object"],
        "answer": "Paste Special > Paste Link"
    },
    {
        "question": "What does the 'Distribute Rows' command do in a table?",
        "options": ["Deletes rows", "Makes all selected rows the same height", "Adds space between rows", "Merges rows together"],
        "answer": "Makes all selected rows the same height"
    },
    {
        "question": "How can you see the exact formatting details of a selected text?",
        "options": ["Home > Font dialog box launcher", "Right-click > Font", "The Reveal Formatting task pane (Shift+F1)", "All of the above"],
        "answer": "All of the above"
    },
    {
        "question": "What is the purpose of the 'Wrap Text' options for images?",
        "options": ["To change the image's color", "To control how text flows around the image", "To add a caption to the image", "To resize the image proportionally"],
        "answer": "To control how text flows around the image"
    },
    {
        "question": "Which key combination is used to justify text (align to both left and right margins)?",
        "options": ["Ctrl + E", "Ctrl + L", "Ctrl + R", "Ctrl + J"],
        "answer": "Ctrl + J"
    },
    {
        "question": "In a long document, what is the benefit of using 'Outline View'?",
        "options": ["It provides a WYSIWYG view for printing.", "It allows you to collapse and expand content under headings and easily rearrange large sections.", "It is best for adding comments and tracking changes.", "It shows how the document will look as a webpage."],
        "answer": "It allows you to collapse and expand content under headings and easily rearrange large sections."
    },
    {
        "question": "What does the 'Insert File' feature (Object > Text from File) allow you to do?",
        "options": ["Insert an image file", "Insert the text content from another Word document into the current document", "Create a hyperlink to another file", "Embed an entire Excel workbook"],
        "answer": "Insert the text content from another Word document into the current document"
    },
    {
        "question": "How do you create a 'Custom Dictionary' for spell check?",
        "options": ["File > Options > Proofing > Custom Dictionaries", "Review > Spelling & Grammar > Options", "Right-click a word > Add to Dictionary", "You cannot create a custom dictionary."],
        "answer": "File > Options > Proofing > Custom Dictionaries"
    },
    {
        "question": "What is the function of the 'Reset Picture' command?",
        "options": ["Deletes the picture", "Reverts the picture to its original state, discarding all formatting and size changes", "Resets the document's theme", "Changes the picture's file format"],
        "answer": "Reverts the picture to its original state, discarding all formatting and size changes"
    },
    {
        "question": "Which feature allows you to create a list of references or works cited at the end of a document?",
        "options": ["Table of Contents", "Index", "Bibliography", "Captions"],
        "answer": "Bibliography"
    },
    {
        "question": "What is the purpose of the 'Macro Security' settings?",
        "options": ["To prevent viruses from running potentially harmful macros", "To password-protect a macro", "To make macros run faster", "To share macros with other users"],
        "answer": "To prevent viruses from running potentially harmful macros"
    },
    {
        "question": "How can you apply a shadow or reflection effect to a shape?",
        "options": ["Home Tab > Text Effects", "Shape Format Tab > Shape Effects", "Design Tab > Effects", "Insert Tab > Shapes > Effects"],
        "answer": "Shape Format Tab > Shape Effects"
    },
    {
        "question": "What does the 'Convert to SmartArt' feature do?",
        "options": ["Converts a list or text into a visual graphic like a process cycle or hierarchy", "Converts an image into text", "Converts a table into a chart", "Makes the text artistic"],
        "answer": "Converts a list or text into a visual graphic like a process cycle or hierarchy"
    },
    {
        "question": "Which key combination is used to left-align text?",
        "options": ["Ctrl + E", "Ctrl + L", "Ctrl + R", "Ctrl + J"],
        "answer": "Ctrl + L"
    },
    {
        "question": "What is the purpose of the 'Insert Endnote' feature?",
        "options": ["To add a note at the bottom of the page", "To add a note at the end of the document or section", "To mark the end of the document", "To insert a final comment"],
        "answer": "To add a note at the end of the document or section"
    },
    {
        "question": "How do you create a 'Custom Page Size' for printing?",
        "options": ["Layout > Size > More Paper Sizes", "File > Print > Page Setup", "Design > Page Background > Page Color", "You cannot create custom page sizes."],
        "answer": "Layout > Size > More Paper Sizes"
    },
    {
        "question": "What does the 'AutoRecover' feature do?",
        "options": ["Automatically corrects spelling errors", "Automatically saves a temporary copy of your document at set intervals to prevent data loss", "Automatically recovers deleted files from the Recycle Bin", "Automatically formats the entire document"],
        "answer": "Automatically saves a temporary copy of your document at set intervals to prevent data loss"
    },
    {
        "question": "Which feature allows you to see the document's properties like author, title, and keywords?",
        "options": ["File > Info", "Review > Properties", "View > Show > Properties", "File > Properties (Advanced Properties)"],
        "answer": "File > Info"
    },
    {
        "question": "What is the purpose of the 'Shrink One Page' feature?",
        "options": ["To reduce the file size of the document", "To slightly reduce the text size and spacing to fit content onto one less page", "To zoom out the view", "To compress images"],
        "answer": "To slightly reduce the text size and spacing to fit content onto one less page"
    },
    {
        "question": "How can you create a 'Keyboard Shortcut' for a symbol or command?",
        "options": ["File > Options > Customize Ribbon > Keyboard Shortcuts", "File > Options > Proofing > AutoCorrect Options", "File > Options > Customize Ribbon > Quick Access Toolbar", "Right-click the command > Assign Shortcut"],
        "answer": "File > Options > Customize Ribbon > Keyboard Shortcuts"
    },
    {
        "question": "What does the 'Select All Text With Similar Formatting' command do?",
        "options": ["Selects all text in the document", "Selects only the text that has the same style (e.g., all Normal text)", "Selects text that looks visually similar in font and size", "Both B and C"],
        "answer": "Both B and C"
    },
    {
        "question": "Which feature allows you to save the current document as a template (.dotx) for future use?",
        "options": ["File > Save As > Word Template (*.dotx)", "File > Export > Create PDF/XPS", "File > New > Blank Document", "Design > Themes > Save Current Theme"],
        "answer": "File > Save As > Word Template (*.dotx)"
    },
    {
        "question": "What is the function of the 'Clear All Formatting' button (Home tab, looks like an 'A' with an eraser)?",
        "options": ["Deletes the selected text", "Removes all character formatting (bold, italic, font, etc.) from the selected text, reverting it to the underlying style", "Clears the document's background", "Resets the page margins"],
        "answer": "Removes all character formatting (bold, italic, font, etc.) from the selected text, reverting it to the underlying style"
    },
    {
        "question": "In the context of sections, what does 'Link to Previous' control?",
        "options": ["Whether the header/footer of the current section is connected to the previous section", "Whether the page numbers are sequential", "Whether the sections can be merged", "Whether the text can flow between sections"],
        "answer": "Whether the header/footer of the current section is connected to the previous section"
    },
    {
        "question": "How do you create an 'Index' for a document?",
        "options": ["By manually typing a list at the end", "By marking index entries and then using the Insert Index command", "By using a Table of Contents", "Word cannot create indexes."],
        "answer": "By marking index entries and then using the Insert Index command"
    },
    {
        "question": "What is the purpose of the 'Set Default' button in the Font dialog box?",
        "options": ["To reset the font to Times New Roman", "To set the selected font as the default for this document only", "To set the selected font as the default for all new documents based on the Normal template", "To change the font for the entire document"],
        "answer": "To set the selected font as the default for all new documents based on the Normal template"
    },
    {
        "question": "Which key combination is used to right-align text?",
        "options": ["Ctrl + E", "Ctrl + L", "Ctrl + R", "Ctrl + J"],
        "answer": "Ctrl + R"
    },
    {
        "question": "What does the 'Insert Chart' feature allow you to do?",
        "options": ["Insert a picture of a chart", "Insert a linked Excel chart that you can edit data for directly in Word", "Insert a SmartArt graphic", "Insert a table"],
        "answer": "Insert a linked Excel chart that you can edit data for directly in Word"
    },
    {
        "question": "How can you apply a 'Page Color' to the entire document?",
        "options": ["Design Tab > Page Color", "Insert Tab > Shapes > Rectangle", "Layout Tab > Page Background", "View Tab > Page Color"],
        "answer": "Design Tab > Page Color"
    },
    {
        "question": "What is the purpose of the 'Word Count' dialog box (vs. the status bar)?",
        "options": ["It counts faster.", "It provides more detailed statistics, like counting text in text boxes, footnotes, and endnotes.", "It only counts words in the selected text.", "It counts characters differently."],
        "answer": "It provides more detailed statistics, like counting text in text boxes, footnotes, and endnotes."
    },
    {
        "question": "Which feature allows you to create a 'Master Document' from several sub-documents?",
        "options": ["The Outline View", "File > New > Master Document", "Insert > Object > Text from File", "This is an outdated feature; it's better to use the Navigation Pane and cross-references."],
        "answer": "This is an outdated feature; it's better to use the Navigation Pane and cross-references."
    },
    {
        "question": "What does the 'Compatibility Mode' indicate?",
        "options": ["The document was created in or saved in an older Word format (.doc) to ensure compatibility.", "The document is compatible with all printers.", "The document uses features only available in the latest version of Word.", "The document can be opened by any software."],
        "answer": "The document was created in or saved in an older Word format (.doc) to ensure compatibility."
    },
    {
        "question": "How do you 'Unlink' a field (like a table of contents or cross-reference) so it becomes static text?",
        "options": ["Select the field and press Delete", "Select the field and press Ctrl+Shift+F9", "Select the field and press Backspace", "Right-click the field > Update Field"],
        "answer": "Select the field and press Ctrl+Shift+F9"
    },
    {
        "question": "What is the purpose of the 'File > Convert' command for a document in Compatibility Mode?",
        "options": ["To convert the file to a PDF", "To convert the document to the newest file format to access all current Word features", "To convert the text to a different language", "To compress the file"],
        "answer": "To convert the document to the newest file format to access all current Word features"
    },
    {
        "question": "Which feature allows you to add alt text to an image for accessibility?",
        "options": ["Format Picture > Size & Properties", "Right-click image > Edit Alt Text", "Both A and B", "This is not possible in Word."],
        "answer": "Both A and B"
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
export const WordHard = getRandomQuestions(questions, 30);    