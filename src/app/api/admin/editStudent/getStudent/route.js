import  connectToDatabase  from '../../../../../lib/DBconnection';
import registered_students from '../../../../../models/students'; 
import { NextResponse } from 'next/server';
import { query, validationResult } from 'express-validator';

// Validation middleware for GET request
const validate = [
  query('identifier')
    .notEmpty()
    .withMessage('Identifier (rollNo or phoneNumber) is required')
    .trim()
    .matches(/^(?:[0-9]{7}|[0-9]{10})$/)
    .withMessage('Identifier must be a valid roll number (7 digits) or phone number (10 digits)'),
];

// GET /api/students/find?identifier=<rollNo or phoneNumber>
export async function GET(request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const identifier = searchParams.get('identifier');

    // Run validation
    const reqForValidation = { query: { identifier } };
    await Promise.all(validate.map((validation) => validation.run(reqForValidation)));
    const errors = validationResult(reqForValidation);
    if (!errors.isEmpty()) {
      return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    // Find student by rollNo or phoneNumber
    const student = await registered_students.findOne({
      $or: [{ rollNo: identifier }, { phoneNumber: identifier }],
    }).select('-password'); // Exclude password from response

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}