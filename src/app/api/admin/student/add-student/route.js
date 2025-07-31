import connectDB from '@/lib/DBconnection';
import registered_students from '@/models/students';
import { NextResponse } from 'next/server';

// Course subject mappings
const CERTIFICATION_IN_COMPUTER_APPLICATION = {
  "CS-01": "Basic Computer",
  "CS-02": "Windows Application: MS Office",
  "CS-03": "Operating System",
  "CS-04": "Web Publisher: Internet Browsing"
};

const DIPLOMA_IN_COMPUTER_APPLICATION = {
  "CS-01": "Basic Computer",
  "CS-02": "Windows Application: MS Office",
  "CS-03": "Operating System",
  "CS-04": "Web Publisher: Internet Browsing",
  "CS-05": "Computer Accountancy: Tally"
};

const ADVANCE_DIPLOMA_IN_COMPUTER_APPLICATION = {
  "CS-01": "Basic Computer",
  "CS-02": "Windows Application: MS Office",
  "CS-03": "Operating System",
  "CS-05": "Computer Accountancy: Tally",
  "CS-06": "Desktop Publishing: Photoshop"
};

const CERTIFICATION_IN_COMPUTER_ACCOUNTANCY = {
  "CS-01": "Basic Computer",
  "CS-02": "Windows Application: MS Office",
  "CS-07": "Computerized Accounting With Tally",
  "CS-08": "Manual Accounting"
};

const DIPLOMA_IN_COMPUTER_ACCOUNTANCY = {
  "CS-01": "Basic Computer",
  "CS-02": "Windows Application: MS Office",
  "CS-07": "Computerized Accounting With Tally",
  "CS-08": "Manual Accounting",
  "CS-09": "Tally ERP 9 & Tally Prime"
};

// Subject details with max marks
const SUBJECTS = {
  "CS-01": { subjectName: "Basic Computer", maxTheoryMarks: 100, maxPracticalMarks: 0 },
  "CS-02": { subjectName: "Windows Application: MS Office", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-03": { subjectName: "Operating System", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-04": { subjectName: "Web Publisher: Internet Browsing", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-05": { subjectName: "Computer Accountancy: Tally", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-06": { subjectName: "Desktop Publishing: Photoshop", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-07": { subjectName: "Computerized Accounting With Tally", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-08": { subjectName: "Manual Accounting", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-09": { subjectName: "Tally ERP 9 & Tally Prime", maxTheoryMarks: 40, maxPracticalMarks: 60 }
};

// Map certification titles to their subjects
const CERTIFICATION_SUBJECTS = {
  "CERTIFICATION IN COMPUTER APPLICATION": CERTIFICATION_IN_COMPUTER_APPLICATION,
  "DIPLOMA IN COMPUTER APPLICATION": DIPLOMA_IN_COMPUTER_APPLICATION,
  "ADVANCE DIPLOMA IN COMPUTER APPLICATION": ADVANCE_DIPLOMA_IN_COMPUTER_APPLICATION,
  "CERTIFICATION IN COMPUTER ACCOUNTANCY": CERTIFICATION_IN_COMPUTER_ACCOUNTANCY,
  "DIPLOMA IN COMPUTER ACCOUNTANCY": DIPLOMA_IN_COMPUTER_ACCOUNTANCY
};

// POST /api/students/add-marks
export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const { rollNo, subjectCode, theoryMarks, practicalMarks, examDate } = await req.json();

    // Validate required fields
    if (!rollNo || !subjectCode) {
      return NextResponse.json(
        { error: 'rollNo and subjectCode are required' },
        { status: 400 }
      );
    }

    // Find student
    const student = await registered_students.findOne({ rollNo });
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Get valid subjects for the student's certification
    const validSubjects = CERTIFICATION_SUBJECTS[student.certificationTitle];
    if (!validSubjects) {
      return NextResponse.json(
        { error: 'Invalid certification title for student' },
        { status: 400 }
      );
    }

    // Validate subject code
    if (!validSubjects[subjectCode]) {
      return NextResponse.json(
        { error: `Subject ${subjectCode} is not part of ${student.certificationTitle}` },
        { status: 400 }
      );
    }

    // Get subject details
    const subjectDetails = SUBJECTS[subjectCode];
    if (!subjectDetails) {
      return NextResponse.json(
        { error: 'Invalid subject code' },
        { status: 400 }
      );
    }

    // Validate marks
    if (theoryMarks !== undefined && (theoryMarks < 0 || theoryMarks > subjectDetails.maxTheoryMarks)) {
      return NextResponse.json(
        { error: `Theory marks must be between 0 and ${subjectDetails.maxTheoryMarks}` },
        { status: 400 }
      );
    }

    if (practicalMarks !== undefined && (practicalMarks < 0 || practicalMarks > subjectDetails.maxPracticalMarks)) {
      return NextResponse.json(
        { error: `Practical marks must be between 0 and ${subjectDetails.maxPracticalMarks}` },
        { status: 400 }
      );
    }

    // Calculate total marks
    const totalMarks = (theoryMarks || 0) + (practicalMarks || 0);

    // Check if subject marks already exist
    const existingResult = student.examResults.find(result => result.subjectCode === subjectCode);
    if (existingResult) {
      return NextResponse.json(
        { error: `Marks for subject ${subjectCode} already exist` },
        { status: 400 }
      );
    }

    // Add new exam result
    const newResult = {
      subjectCode,
      subjectName: subjectDetails.subjectName,
      theoryMarks: theoryMarks || null,
      practicalMarks: practicalMarks || null,
      totalMarks,
      examDate: examDate || Date.now()
    };

    student.examResults.push(newResult);

    // Update final grade if all subjects have marks
    const subjectsCount = Object.keys(validSubjects).length;
    if (student.examResults.length === subjectsCount) {
      const totalObtainedMarks = student.examResults.reduce((sum, result) => sum + (result.totalMarks || 0), 0);
      const maxPossibleMarks = Object.keys(validSubjects).reduce(
        (sum, code) => sum + SUBJECTS[code].maxTheoryMarks + SUBJECTS[code].maxPracticalMarks,
        0
      );
      const percentage = (totalObtainedMarks / maxPossibleMarks) * 100;

      if (percentage >= 80) student.finalGrade = 'A';
      else if (percentage >= 60) student.finalGrade = 'B';
      else if (percentage >= 40) student.finalGrade = 'C';
      else if (percentage >= 33) student.finalGrade = 'D';
      else student.finalGrade = 'F';
    }

    // Save updated student
    await student.save();

    return NextResponse.json(
      {
        message: 'Marks added successfully',
        examResult: newResult,
        finalGrade: student.finalGrade
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error adding marks:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}