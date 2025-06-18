import { NextResponse } from 'next/server';
import RegisteredStudents from '@/models/students';
import connectDB from '@/lib/DBconnection';

export async function POST(request) {
  try {
    // Ensure database connection is established
    await connectDB();
    
    const { rollNo, dateOfBirth } = await request.json();

    // Find student by rollNo and dateOfBirth
    const student = await RegisteredStudents.findOne({ rollNo, dateOfBirth });

    if (!student) {
      return NextResponse.json(
        { message: 'Student not found' },
        { status: 404 }
      );
    }

    // Return student details
    return NextResponse.json({
      fullName: student.fullName,
      fatherName: student.fatherName,
      address: student.address,
      course: student.selectedCourse,
      courseDuration: student.courseDuration,
      cretificate: student.certificate
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
} 