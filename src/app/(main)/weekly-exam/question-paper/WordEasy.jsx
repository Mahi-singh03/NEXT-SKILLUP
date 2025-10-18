import { useState } from 'react';

const getRandomQuestions = (questions, count) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const allQuestions = [
    {
        "question": "What is the default file extension for a Microsoft Word document?",
        "options": [".txt", ".docx", ".xlsx", ".pptx"],
        "answer": ".docx"
    },
    {
        "question": "Which keyboard shortcut is used to save a document?",
        "options": ["Ctrl + C", "Ctrl + V", "Ctrl + S", "Ctrl + P"],
        "answer": "Ctrl + S"
    },
    {
        "question": "Which tab in the Ribbon would you use to change the font size?",
        "options": ["Insert", "Page Layout", "Home", "View"],
        "answer": "Home"
    },
    {
        "question": "What is the name of the blinking vertical line that shows where text will be inserted?",
        "options": ["Pointer", "Cursor", "Insertion Point", "Selection Bar"],
        "answer": "Insertion Point"
    },
    {
        "question": "Which feature allows you to copy formatting from one piece of text to another?",
        "options": ["Format Finder", "Format Painter", "Copy Style", "Style Brush"],
        "answer": "Format Painter"
    },
    {
        "question": "Which button is used to make text bold?",
        "options": ["The 'B' button", "The 'I' button", "The 'U' button", "The 'A' button"],
        "answer": "The 'B' button"
    },
    {
        "question": "What is the shortcut for pasting copied text?",
        "options": ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
        "answer": "Ctrl + V"
    },
    {
        "question": "Which view shows how the document will look when printed?",
        "options": ["Draft View", "Outline View", "Print Layout View", "Web Layout View"],
        "answer": "Print Layout View"
    },
    {
        "question": "What does the 'Undo' command do?",
        "options": ["Repeats the last action", "Deletes the document", "Reverses the last action", "Saves the document"],
        "answer": "Reverses the last action"
    },
    {
        "question": "Which tab do you use to add a picture to your document?",
        "options": ["Home", "Design", "Insert", "Layout"],
        "answer": "Insert"
    },
    {
        "question": "What is the name of the area at the top of the document where you can add text like a page number?",
        "options": ["Footer", "Header", "Title Bar", "Margin"],
        "answer": "Header"
    },
    {
        "question": "Which alignment makes text even on both the left and right sides?",
        "options": ["Left Align", "Center Align", "Right Align", "Justify"],
        "answer": "Justify"
    },
    {
        "question": "What is the shortcut for copying selected text?",
        "options": ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + A"],
        "answer": "Ctrl + C"
    },
    {
        "question": "Which feature checks the spelling and grammar in a document?",
        "options": ["Editor", "Proofing", "Spell Check", "Dictionary"],
        "answer": "Editor"
    },
    {
        "question": "What does the 'Enter' key create in a document?",
        "options": ["A New Page", "A New Paragraph", "A New Line", "A New Word"],
        "answer": "A New Paragraph"
    },
    {
        "question": "Which key is used to indent the first line of a paragraph?",
        "options": ["Enter Key", "Shift Key", "Tab Key", "Ctrl Key"],
        "answer": "Tab Key"
    },
    {
        "question": "What is the purpose of the 'Thesaurus'?",
        "options": ["Check Spelling", "Find Synonyms", "Translate Text", "Change Font"],
        "answer": "Find Synonyms"
    },
    {
        "question": "Which menu would you use to change the page orientation to Landscape?",
        "options": ["Home Tab", "Insert Tab", "Layout Tab", "View Tab"],
        "answer": "Layout Tab"
    },
    {
        "question": "What is the shortcut to select all text in the document?",
        "options": ["Ctrl + A", "Ctrl + S", "Ctrl + C", "Ctrl + E"],
        "answer": "Ctrl + A"
    },
    {
        "question": "Which button is used to print a document?",
        "options": ["The Printer Icon", "The File Icon", "The Save Icon", "The Folder Icon"],
        "answer": "The Printer Icon"
    },
    {
        "question": "What does the 'I' button on the Home tab do?",
        "options": ["Makes text Italic", "Makes text Bold", "Makes text Underlined", "Inserts an Image"],
        "answer": "Makes text Italic"
    },
    {
        "question": "Where is the Zoom slider typically located?",
        "options": ["Top Left of the window", "In the Home tab", "Bottom-right corner of the window", "In the File menu"],
        "answer": "Bottom-right corner of the window"
    },
    {
        "question": "What is the default page size for a Word document in the US?",
        "options": ["A4", "Legal", "Letter", "Executive"],
        "answer": "Letter"
    },
    {
        "question": "Which feature lets you see how many words are in your document?",
        "options": ["Word Count", "Document Stats", "Page Info", "File Properties"],
        "answer": "Word Count"
    },
    {
        "question": "What is the name for pre-designed document formats you can start with?",
        "options": ["Themes", "Styles", "Templates", "Designs"],
        "answer": "Templates"
    },
    {
        "question": "Which key do you hold down to select multiple, non-adjacent pieces of text?",
        "options": ["Shift", "Alt", "Ctrl", "Tab"],
        "answer": "Ctrl"
    },
    {
        "question": "What does the 'U' button on the Home tab do?",
        "options": ["Makes text Bold", "Makes text Italic", "Makes text Underlined", "Unlocks the document"],
        "answer": "Makes text Underlined"
    },
    {
        "question": "Which tab contains the option to add a Table?",
        "options": ["Home", "Insert", "Design", "Layout"],
        "answer": "Insert"
    },
    {
        "question": "What is the shortcut for the 'Find' command?",
        "options": ["Ctrl + F", "Ctrl + H", "Ctrl + G", "Ctrl + D"],
        "answer": "Ctrl + F"
    },
    {
        "question": "Which dialog box lets you change the top, bottom, left, and right page margins?",
        "options": ["Page Setup", "Paragraph", "Font", "Layout"],
        "answer": "Page Setup"
    },
    {
        "question": "What is the purpose of the 'Show/Hide ¶' button?",
        "options": ["To hide images", "To show non-printing characters", "To make the document full screen", "To print the document"],
        "answer": "To show non-printing characters"
    },
    {
        "question": "Which feature automatically moves text to the next line when it reaches the right margin?",
        "options": ["Text Wrap", "Line Break", "Word Wrap", "Paragraph End"],
        "answer": "Word Wrap"
    },
    {
        "question": "What does the 'Redo' command do?",
        "options": ["Repeats the last action you undid", "Deletes everything", "Saves a new version", "Closes the document"],
        "answer": "Repeats the last action you undid"
    },
    {
        "question": "Which tab would you use to change the background color of a page?",
        "options": ["Home", "Insert", "Design", "View"],
        "answer": "Design"
    },
    {
        "question": "What is the name for the small menu that appears when you select text?",
        "options": ["Quick Access Toolbar", "Ribbon", "Mini Toolbar", "Context Menu"],
        "answer": "Mini Toolbar"
    },
    {
        "question": "Which key is used to delete text to the right of the insertion point?",
        "options": ["Backspace", "Delete", "Enter", "Shift"],
        "answer": "Delete"
    },
    {
        "question": "What is the shortcut for the 'Replace' command?",
        "options": ["Ctrl + F", "Ctrl + R", "Ctrl + H", "Ctrl + E"],
        "answer": "Ctrl + H"
    },
    {
        "question": "Which alignment places text in the center of the page?",
        "options": ["Left Align", "Center Align", "Right Align", "Justify"],
        "answer": "Center Align"
    },
    {
        "question": "What type of object is a pre-made drawing like a rectangle or arrow?",
        "options": ["Picture", "Icon", "Shape", "Chart"],
        "answer": "Shape"
    },
    {
        "question": "Where is the 'Save As' command located?",
        "options": ["Home Tab", "Quick Access Toolbar", "File Tab", "View Tab"],
        "answer": "File Tab"
    },
    {
        "question": "What does the 'Backspace' key do?",
        "options": ["Deletes text to the left of the insertion point", "Deletes text to the right of the insertion point", "Creates a new paragraph", "Moves the insertion point up"],
        "answer": "Deletes text to the left of the insertion point"
    },
    {
        "question": "Which view removes the margins and page breaks to show more text?",
        "options": ["Print Layout", "Read Mode", "Web Layout", "Draft"],
        "answer": "Draft"
    },
    {
        "question": "What is the area at the bottom of a page where you can put text like a date called?",
        "options": ["Header", "Footer", "Margin", "Note"],
        "answer": "Footer"
    },
    {
        "question": "Which option lets you reverse the last 'Undo' command?",
        "options": ["Repeat", "Redo", "Restore", "Revert"],
        "answer": "Redo"
    },
    {
        "question": "What is the name for the set of coordinated colors and fonts in a document?",
        "options": ["Template", "Style Set", "Theme", "Design"],
        "answer": "Theme"
    },
    {
        "question": "Which tab has the command to add a Page Break?",
        "options": ["Home", "Insert", "Layout", "References"],
        "answer": "Insert"
    },
    {
        "question": "What is the shortcut for opening a new, blank document?",
        "options": ["Ctrl + O", "Ctrl + N", "Ctrl + S", "Ctrl + W"],
        "answer": "Ctrl + N"
    },
    {
        "question": "Which feature allows you to see the document as it would look on a webpage?",
        "options": ["Print Layout", "Draft", "Outline", "Web Layout"],
        "answer": "Web Layout"
    },
    {
        "question": "What is the purpose of the 'Bullets' button?",
        "options": ["To number a list", "To create a checklist", "To create a list with dots or symbols", "To indent text"],
        "answer": "To create a list with dots or symbols"
    },
    {
        "question": "Which key is used to create a new line without starting a new paragraph?",
        "options": ["Enter", "Shift + Enter", "Tab", "Ctrl + Enter"],
        "answer": "Shift + Enter"
    },
    {
        "question": "What does the 'Numbering' button do?",
        "options": ["Adds page numbers", "Creates a numbered list", "Counts the words", "Adds line numbers"],
        "answer": "Creates a numbered list"
    },
    {
        "question": "Which tab contains the 'Word Count' feature?",
        "options": ["Home", "Review", "View", "References"],
        "answer": "Review"
    },
    {
        "question": "What is the name of the bar at the very top of the Word window that shows the document name?",
        "options": ["Ribbon", "Status Bar", "Title Bar", "Taskbar"],
        "answer": "Title Bar"
    },
    {
        "question": "Which command lets you create a copy of a document with a different name or location?",
        "options": ["Save", "Copy", "Save As", "Export"],
        "answer": "Save As"
    },
    {
        "question": "What is the default font in recent versions of Microsoft Word?",
        "options": ["Times New Roman", "Arial", "Calibri", "Cambria"],
        "answer": "Calibri"
    },
    {
        "question": "Which button is used to left-align text?",
        "options": ["The button with lines aligned to the left", "The button with centered lines", "The button with lines aligned to the right", "The button with straight lines on both sides"],
        "answer": "The button with lines aligned to the left"
    },
    {
        "question": "What is the purpose of the 'Format Painter'?",
        "options": ["To change the page color", "To copy and apply formatting", "To insert a picture", "To paint a shape"],
        "answer": "To copy and apply formatting"
    },
    {
        "question": "Which tab would you use to add a comment to the text?",
        "options": ["Home", "Insert", "Review", "View"],
        "answer": "Review"
    },
    {
        "question": "What is the shortcut for printing a document?",
        "options": ["Ctrl + P", "Ctrl + S", "Ctrl + N", "Ctrl + O"],
        "answer": "Ctrl + P"
    },
    {
        "question": "Which feature automatically corrects common typing mistakes as you type?",
        "options": ["AutoComplete", "AutoFormat", "AutoCorrect", "Spell Check"],
        "answer": "AutoCorrect"
    },
    {
        "question": "What does the 'Read Mode' view do?",
        "options": ["Shows the document for easy reading and minimizes the Ribbon", "Shows the document structure", "Shows the document as a draft", "Shows the document for printing"],
        "answer": "Shows the document for easy reading and minimizes the Ribbon"
    },
    {
        "question": "Which key is used to delete text to the left of the insertion point?",
        "options": ["Delete", "Backspace", "Insert", "End"],
        "answer": "Backspace"
    },
    {
        "question": "What is the name for the tool that lets you navigate through long documents using headings?",
        "options": ["Search Box", "Navigation Pane", "Go To", "Thumbnails"],
        "answer": "Navigation Pane"
    },
    {
        "question": "Which tab contains the option to change the line spacing?",
        "options": ["Home", "Layout", "Design", "View"],
        "answer": "Home"
    },
    {
        "question": "What is the purpose of the 'Thesaurus'?",
        "options": ["To check grammar", "To find word definitions", "To find synonyms and antonyms", "To translate words"],
        "answer": "To find synonyms and antonyms"
    },
    {
        "question": "Which button is used to decrease the indent of a paragraph?",
        "options": ["The button with lines pointing left", "The button with lines pointing right", "The button with a straight line", "The button with a dot"],
        "answer": "The button with lines pointing left"
    },
    {
        "question": "What does the 'Insertion Point' refer to?",
        "options": ["The mouse cursor", "The place where text will appear when you type", "The beginning of the document", "The end of the document"],
        "answer": "The place where text will appear when you type"
    },
    {
        "question": "Which tab would you use to add a text box?",
        "options": ["Home", "Insert", "Design", "Layout"],
        "answer": "Insert"
    },
    {
        "question": "What is the shortcut for the 'Go To' command?",
        "options": ["Ctrl + F", "Ctrl + G", "Ctrl + H", "Ctrl + J"],
        "answer": "Ctrl + G"
    },
    {
        "question": "Which feature lets you see a preview of how a style will look before applying it?",
        "options": ["Live Preview", "Style Preview", "Format Preview", "Quick Look"],
        "answer": "Live Preview"
    },
    {
        "question": "What is the name of the bar at the bottom of the window that shows page number, word count, etc.?",
        "options": ["Title Bar", "Ribbon", "Status Bar", "Taskbar"],
        "answer": "Status Bar"
    },
    {
        "question": "Which command is used to permanently remove selected text from the document?",
        "options": ["Cut", "Copy", "Delete", "Clear"],
        "answer": "Cut"
    },
    {
        "question": "What is the purpose of the 'Find' command?",
        "options": ["To locate specific text", "To replace text", "To go to a specific page", "To search the internet"],
        "answer": "To locate specific text"
    },
    {
        "question": "Which tab contains the 'Spelling & Grammar' check?",
        "options": ["Home", "Review", "View", "References"],
        "answer": "Review"
    },
    {
        "question": "What does the 'Copy' command do?",
        "options": ["Removes the selected text", "Duplicates the selected text to the clipboard", "Moves the selected text", "Deletes the selected text"],
        "answer": "Duplicates the selected text to the clipboard"
    },
    {
        "question": "Which key combination is used to select one word at a time?",
        "options": ["Ctrl + Shift + Arrow", "Shift + Arrow", "Ctrl + Arrow", "Double-click the word"],
        "answer": "Double-click the word"
    },
    {
        "question": "What is the default orientation for a Word document?",
        "options": ["Landscape", "Portrait", "Booklet", "A4"],
        "answer": "Portrait"
    },
    {
        "question": "Which feature allows text to flow around a picture?",
        "options": ["Text Wrap", "Align Text", "Position", "Layout Options"],
        "answer": "Text Wrap"
    },
    {
        "question": "What is the shortcut for the 'Cut' command?",
        "options": ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + Z"],
        "answer": "Ctrl + X"
    },
    {
        "question": "Which tab would you use to change the paper size?",
        "options": ["Home", "Insert", "Layout", "Design"],
        "answer": "Layout"
    },
    {
        "question": "What is the purpose of the 'Undo' command?",
        "options": ["To cancel the last action", "To repeat the last action", "To delete the document", "To save the document"],
        "answer": "To cancel the last action"
    },
    {
        "question": "Which button is used to increase the indent of a paragraph?",
        "options": ["The button with lines pointing left", "The button with lines pointing right", "The button with a straight line", "The button with a dot"],
        "answer": "The button with lines pointing right"
    },
    {
        "question": "What does the 'Replace' command allow you to do?",
        "options": ["Find text", "Find and change text", "Change the font", "Replace a picture"],
        "answer": "Find and change text"
    },
    {
        "question": "Which view displays the document as an outline with headings and subheadings?",
        "options": ["Draft View", "Outline View", "Print Layout", "Web Layout"],
        "answer": "Outline View"
    },
    {
        "question": "What is the name for the toolbars and tabs at the top of the Word window?",
        "options": ["Menu Bar", "Status Bar", "Ribbon", "Title Bar"],
        "answer": "Ribbon"
    },
    {
        "question": "Which key is used to move the insertion point to the beginning of a line?",
        "options": ["End", "Home", "Page Up", "Page Down"],
        "answer": "Home"
    },
    {
        "question": "What is the purpose of the 'Save' command?",
        "options": ["To close the document", "To create a new document", "To store the document permanently", "To print the document"],
        "answer": "To store the document permanently"
    },
    {
        "question": "Which tab contains the option to insert a Page Number?",
        "options": ["Home", "Insert", "Layout", "View"],
        "answer": "Insert"
    },
    {
        "question": "What does the 'Paste' command do?",
        "options": ["Copies selected text", "Cuts selected text", "Inserts text from the clipboard", "Deletes selected text"],
        "answer": "Inserts text from the clipboard"
    },
    {
        "question": "Which feature is used to create a duplicate of a selected text or object?",
        "options": ["Cut and Paste", "Copy and Paste", "Drag and Drop", "Duplicate"],
        "answer": "Copy and Paste"
    },
    {
        "question": "What is the shortcut for the 'Bold' command?",
        "options": ["Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + L"],
        "answer": "Ctrl + B"
    },
    {
        "question": "Which tab would you use to change the document's margins?",
        "options": ["Home", "Insert", "Layout", "Design"],
        "answer": "Layout"
    },
    {
        "question": "What is the purpose of the 'Zoom' feature?",
        "options": ["To make the text louder", "To make the document larger or smaller on screen", "To focus on a paragraph", "To fit the document to one page"],
        "answer": "To make the document larger or smaller on screen"
    },
    {
        "question": "Which key is used to move the insertion point to the end of a line?",
        "options": ["Home", "End", "Page Up", "Page Down"],
        "answer": "End"
    },
    {
        "question": "What does the 'Italic' command do to text?",
        "options": ["Makes it slanted", "Makes it thicker", "Adds a line under it", "Makes it bigger"],
        "answer": "Makes it slanted"
    },
    {
        "question": "Which tab contains the 'Header & Footer' tools?",
        "options": ["Home", "Insert", "Design", "View"],
        "answer": "Insert"
    },
    {
        "question": "What is the purpose of the 'Bullets' command?",
        "options": ["To create a numbered list", "To create a list with symbols", "To insert a checkmark", "To indent text"],
        "answer": "To create a list with symbols"
    },
    {
        "question": "Which key is used to create a manual page break?",
        "options": ["Enter", "Shift + Enter", "Ctrl + Enter", "Alt + Enter"],
        "answer": "Ctrl + Enter"
    },
    {
        "question": "What does the 'Underline' command do?",
        "options": ["Makes text bold", "Makes text italic", "Adds a line below text", "Highlights text"],
        "answer": "Adds a line below text"
    },
    {
        "question": "Which tab would you use to change the style of a heading?",
        "options": ["Home", "Insert", "Design", "Layout"],
        "answer": "Home"
    },
    {
        "question": "What is the purpose of the 'Numbering' command?",
        "options": ["To add page numbers", "To create a list with numbers", "To count the words", "To number the lines"],
        "answer": "To create a list with numbers"
    },
    {
        "question": "Which feature allows you to see the document without the Ribbon and other tools?",
        "options": ["Full Screen Reading", "Print Layout", "Draft", "Web Layout"],
        "answer": "Full Screen Reading"
    },
    {
        "question": "What is the shortcut for the 'Italic' command?",
        "options": ["Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + P"],
        "answer": "Ctrl + I"
    },
    {
        "question": "Which tab contains the option to insert a Hyperlink?",
        "options": ["Home", "Insert", "Design", "References"],
        "answer": "Insert"
    },
    {
        "question": "What is the purpose of the 'Styles' gallery?",
        "options": ["To change the page color", "To quickly apply a set of formatting choices", "To insert pre-made text", "To change the font size"],
        "answer": "To quickly apply a set of formatting choices"
    },
    {
        "question": "Which key is used to move the insertion point down one screen?",
        "options": ["Home", "End", "Page Up", "Page Down"],
        "answer": "Page Down"
    },
    {
        "question": "What does the 'Cut' command do?",
        "options": ["Copies the selected text", "Removes the selected text and places it on the clipboard", "Deletes the selected text permanently", "Pastes text from the clipboard"],
        "answer": "Removes the selected text and places it on the clipboard"
    },
    {
        "question": "Which tab would you use to change the paragraph spacing?",
        "options": ["Home", "Insert", "Layout", "Design"],
        "answer": "Home"
    },
    {
        "question": "What is the purpose of the 'Show/Hide ¶' command?",
        "options": ["To hide images", "To reveal spaces, tabs, and paragraph marks", "To show the Ruler", "To hide the Ribbon"],
        "answer": "To reveal spaces, tabs, and paragraph marks"
    },
    {
        "question": "Which key is used to move the insertion point up one screen?",
        "options": ["Home", "End", "Page Up", "Page Down"],
        "answer": "Page Up"
    },
    {
        "question": "What does the 'Bold' command do to text?",
        "options": ["Makes it slanted", "Makes it thicker and darker", "Adds a line under it", "Makes it bigger"],
        "answer": "Makes it thicker and darker"
    },
    {
        "question": "Which tab contains the option to insert a Symbol?",
        "options": ["Home", "Insert", "Design", "Layout"],
        "answer": "Insert"
    },
    {
        "question": "What is the purpose of the 'Format Painter'?",
        "options": ["To change the color of a picture", "To copy formatting from one place to another", "To paint a shape", "To change the page border"],
        "answer": "To copy formatting from one place to another"
    },
    {
        "question": "Which key is used to move the insertion point one word to the left?",
        "options": ["Left Arrow", "Ctrl + Left Arrow", "Right Arrow", "Ctrl + Right Arrow"],
        "answer": "Ctrl + Left Arrow"
    },
    {
        "question": "What does the 'Paste Special' command allow you to do?",
        "options": ["Paste only the text without formatting", "Paste a picture", "Paste a hyperlink", "Paste a table"],
        "answer": "Paste only the text without formatting"
    },
    {
        "question": "Which tab would you use to add a Watermark?",
        "options": ["Home", "Insert", "Design", "View"],
        "answer": "Design"
    },
    {
        "question": "What is the purpose of the 'Thesaurus'?",
        "options": ["To check spelling", "To find word definitions", "To find similar words", "To translate text"],
        "answer": "To find similar words"
    },
    {
        "question": "Which key is used to move the insertion point one word to the right?",
        "options": ["Left Arrow", "Ctrl + Left Arrow", "Right Arrow", "Ctrl + Right Arrow"],
        "answer": "Ctrl + Right Arrow"
    },
    {
        "question": "What does the 'Find and Replace' dialog box allow you to do?",
        "options": ["Only find text", "Find text and replace it with something else", "Only replace text", "Find and delete text"],
        "answer": "Find text and replace it with something else"
    },
    {
        "question": "Which tab contains the option to change the document's Theme?",
        "options": ["Home", "Insert", "Design", "Layout"],
        "answer": "Design"
    },
    {
        "question": "What is the purpose of the 'Word Count' feature?",
        "options": ["To count the number of pages", "To count the number of words, characters, and paragraphs", "To count the number of lines", "To count the number of images"],
        "answer": "To count the number of words, characters, and paragraphs"
    },
    {
        "question": "Which key is used to select text from the insertion point to where you click?",
        "options": ["Shift", "Ctrl", "Alt", "Tab"],
        "answer": "Shift"
    },
    {
        "question": "What does the 'AutoCorrect' feature do?",
        "options": ["Automatically saves your document", "Automatically formats your document", "Automatically fixes common spelling errors as you type", "Automatically prints your document"],
        "answer": "Automatically fixes common spelling errors as you type"
    },
    {
        "question": "Which tab would you use to start a Mail Merge?",
        "options": ["Home", "Insert", "Mailings", "Review"],
        "answer": "Mailings"
    },
    {
        "question": "What is the purpose of the 'Navigation Pane'?",
        "options": ["To check spelling", "To quickly jump to different parts of the document", "To change page layout", "To insert pictures"],
        "answer": "To quickly jump to different parts of the document"
    },
    {
        "question": "Which key is used to insert a tab character?",
        "options": ["Enter", "Shift", "Tab", "Ctrl"],
        "answer": "Tab"
    },
    {
        "question": "What does the 'Save As' command allow you to do?",
        "options": ["Save the document for the first time", "Save a copy with a new name or location", "Save and close the document", "Save and print the document"],
        "answer": "Save a copy with a new name or location"
    },
    {
        "question": "Which tab contains the option to track changes in a document?",
        "options": ["Home", "Insert", "Review", "View"],
        "answer": "Review"
    },
    {
        "question": "What is the purpose of the 'Page Break' command?",
        "options": ["To break a word", "To start a new page at the insertion point", "To split the window", "To break a table"],
        "answer": "To start a new page at the insertion point"
    },
    {
        "question": "Which key is used to cancel a command or close a dialog box?",
        "options": ["Enter", "Shift", "Esc", "Tab"],
        "answer": "Esc"
    },
    {
        "question": "What does the 'Print Preview' feature show?",
        "options": ["A preview of the fonts", "A preview of how the document will look when printed", "A preview of the styles", "A preview of the page layout"],
        "answer": "A preview of how the document will look when printed"
    },
    {
        "question": "Which tab would you use to add a Footnote?",
        "options": ["Home", "Insert", "References", "Layout"],
        "answer": "References"
    },
    {
        "question": "What is the purpose of the 'Ruler'?",
        "options": ["To measure the page", "To set tabs and indents", "To draw lines", "To align images"],
        "answer": "To set tabs and indents"
    },
    {
        "question": "Which key is used to open the right-click context menu?",
        "options": ["The right-click button on the mouse", "The Application key on the keyboard", "The Windows key", "Both A and B"],
        "answer": "Both A and B"
    },
    {
        "question": "What does the 'Drop Cap' feature do?",
        "options": ["Makes the first letter of a paragraph large and sunk into the text", "Adds a capital letter to every word", "Creates a caption for a picture", "Drops a capital letter from the clipboard"],
        "answer": "Makes the first letter of a paragraph large and sunk into the text"
    },
    {
        "question": "Which tab contains the option to change the text direction?",
        "options": ["Home", "Insert", "Layout", "Design"],
        "answer": "Layout"
    },
    {
        "question": "What is the purpose of the 'Document Inspector'?",
        "options": ["To check for spelling errors", "To remove hidden data and personal information", "To inspect the page layout", "To count the words"],
        "answer": "To remove hidden data and personal information"
    },
    {
        "question": "Which key is used to update a field, like a table of contents?",
        "options": ["F1", "F5", "F9", "F11"],
        "answer": "F9"
    },
    {
        "question": "What does the 'Split' command in the View tab do?",
        "options": ["Splits the document into two files", "Splits the window into two panes to view different parts of the document", "Splits a table", "Splits a cell"],
        "answer": "Splits the window into two panes to view different parts of the document"
    },
    {
        "question": "Which tab would you use to create a Table of Contents?",
        "options": ["Home", "Insert", "References", "Layout"],
        "answer": "References"
    },
    {
        "question": "What is the purpose of the 'Go To' command?",
        "options": ["To find text", "To quickly jump to a specific page, section, or line", "To replace text", "To go to the next comment"],
        "answer": "To quickly jump to a specific page, section, or line"
    },
    {
        "question": "Which key is used to create a non-breaking space?",
        "options": ["Ctrl + Shift + Spacebar", "Ctrl + Spacebar", "Alt + Spacebar", "Shift + Spacebar"],
        "answer": "Ctrl + Shift + Spacebar"
    },
    {
        "question": "What does the 'Mail Merge' feature help you do?",
        "options": ["Merge two documents into one", "Send an email from Word", "Create personalized letters or emails for a list of recipients", "Merge table cells"],
        "answer": "Create personalized letters or emails for a list of recipients"
    },
    {
        "question": "Which tab contains the option to protect the document with a password?",
        "options": ["Home", "File", "Review", "View"],
        "answer": "File"
    },
    {
        "question": "What is the purpose of the 'Building Blocks Organizer'?",
        "options": ["To organize your files", "To store and reuse pieces of content like cover pages and headers", "To build a table", "To organize your styles"],
        "answer": "To store and reuse pieces of content like cover pages and headers"
    },
    {
        "question": "Which key is used to select a full sentence?",
        "options": ["Click once on the sentence", "Double-click on the sentence", "Triple-click on the sentence", "Ctrl + click on the sentence"],
        "answer": "Ctrl + click on the sentence"
    },
    {
        "question": "What does the 'Cross-reference' feature allow you to do?",
        "options": ["Reference a book", "Create a link to a heading, figure, or table elsewhere in the document", "Check references online", "Insert a citation"],
        "answer": "Create a link to a heading, figure, or table elsewhere in the document"
    },
    {
        "question": "Which tab would you use to change the case of text (e.g., UPPERCASE, lowercase)?",
        "options": ["Home", "Insert", "Layout", "Review"],
        "answer": "Home"
    },
    {
        "question": "What is the purpose of the 'Compare' feature?",
        "options": ["To compare two documents and see the differences", "To compare fonts", "To check for plagiarism", "To compare page sizes"],
        "answer": "To compare two documents and see the differences"
    },
    {
        "question": "Which key is used to open the 'Font' dialog box?",
        "options": ["Ctrl + D", "Ctrl + F", "Ctrl + G", "Ctrl + H"],
        "answer": "Ctrl + D"
    },
    {
        "question": "What does the 'Caption' feature add to a picture or table?",
        "options": ["A border", "A numbered label and description", "A hyperlink", "A style"],
        "answer": "A numbered label and description"
    },
    {
        "question": "Which tab contains the option to insert an Index?",
        "options": ["Home", "Insert", "References", "Layout"],
        "answer": "References"
    },
    {
        "question": "What is the purpose of the 'AutoText' feature?",
        "options": ["To automatically type for you", "To store and quickly insert frequently used text and graphics", "To correct text automatically", "To format text automatically"],
        "answer": "To store and quickly insert frequently used text and graphics"
    },
    {
        "question": "Which key is used to open the 'Paragraph' dialog box?",
        "options": ["Alt + Enter", "Ctrl + Enter", "The dialog box launcher in the Paragraph group", "There is no shortcut"],
        "answer": "The dialog box launcher in the Paragraph group"
    },
    {
        "question": "What does the 'Track Changes' feature do?",
        "options": ["Tracks how long you work on a document", "Marks additions, deletions, and formatting changes for review", "Tracks the number of changes", "Follows the insertion point"],
        "answer": "Marks additions, deletions, and formatting changes for review"
    },
    {
        "question": "Which tab would you use to change the language of the proofing tools?",
        "options": ["Home", "Review", "View", "File"],
        "answer": "Review"
    },
    {
        "question": "What is the purpose of a 'Text Box'?",
        "options": ["To draw a box around text", "To contain text that can be placed anywhere on the page", "To format text in columns", "To create a title"],
        "answer": "To contain text that can be placed anywhere on the page"
    },
    {
        "question": "Which key is used to accept a suggested AutoComplete word?",
        "options": ["Enter", "Tab", "Spacebar", "Right Arrow"],
        "answer": "Enter"
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
export const WordEasy = getRandomQuestions(allQuestions, 30);    