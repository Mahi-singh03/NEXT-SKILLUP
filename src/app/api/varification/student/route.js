import { NextResponse } from 'next/server';
import RegisteredStudents from '@/models/students';

export async function POST(request) {
  try {
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
      cretificate: student.Cretificate
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
} 