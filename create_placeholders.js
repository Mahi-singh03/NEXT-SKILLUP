const fs = require('fs');
const path = require('path');

const subjects = [
  'PowerPointMedium', 'PowerPointHard',
  'OfficeEasy', 'OfficeMedium', 'OfficeHard',
  'PhotoshopEasy', 'PhotoshopMedium', 'PhotoshopHard',
  'AIEasy', 'AIMedium', 'AIHard',
  'TallyEasy', 'TallyMedium', 'TallyHard',
  'PythonEasy', 'PythonMedium', 'PythonHard',
  'WebEasy', 'WebMedium', 'WebHard',
  'MERNEasy', 'MERNMedium', 'MERNHard',
  'VideoEasy', 'VideoMedium', 'VideoHard',
  'EnglishEasy', 'EnglishMedium', 'EnglishHard'
];

const placeholderContent = `import { Placeholder } from "./Placeholder.jsx";

// Export the placeholder for now - will be replaced with actual questions later
export const {SUBJECT} = Placeholder;`;

subjects.forEach(subject => {
  const fileName = `${subject}.jsx`;
  const filePath = path.join(__dirname, 'src', 'app', '(main)', 'weekly-exam', 'question-paper', fileName);
  const content = placeholderContent.replace('{SUBJECT}', subject);
  
  fs.writeFileSync(filePath, content);
  console.log(`Created ${fileName}`);
});

console.log('All placeholder files created successfully!');
