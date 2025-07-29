import { NextResponse } from 'next/server';
import registered_students from '@/models/students'; 
import connectDB from '@/lib/DBconnection'; 
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Fetch student data (read-only)
export async function GET(request) {
  try {
    await connectDB(); 

    const { searchParams } = new URL(request.url);
    const rollNo = searchParams.get('rollNo');
    const phoneNumber = searchParams.get('phoneNumber');
    const aadharNumber = searchParams.get('aadharNumber');

    if (!rollNo && !phoneNumber && !aadharNumber) {
      return NextResponse.json(
        { error: 'Please provide rollNo, phoneNumber, or aadharNumber' },
        { status: 400 }
      );
    }

    let student;
    if (rollNo) {
      student = await registered_students.findOne({ rollNo }).select('-password');
    } else if (phoneNumber) {
      student = await registered_students.findOne({ phoneNumber }).select('-password');
    } else if (aadharNumber) {
      student = await registered_students.findOne({ aadharNumber }).select('-password');
    }

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Ensure photo is properly formatted (parse if it's a string)
    if (student.photo && typeof student.photo === 'string') {
      try {
        student.photo = JSON.parse(student.photo);
      } catch (error) {
        console.error('Error parsing photo data:', error);
        student.photo = null;
      }
    }

    return NextResponse.json(
      { message: 'Student fetched successfully', data: student },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Update only the student's photo
export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const rollNo = formData.get('rollNo');
    const file = formData.get('photo');

    if (!rollNo || !file) {
      return NextResponse.json(
        { error: 'rollNo and photo are required' },
        { status: 400 }
      );
    }

    // Fetch only the student's photo data (no need for full document)
    const student = await registered_students.findOne({ rollNo }).select('photo');
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    // Delete old photo if exists
    if (student.photo?.public_id) {
      try {
        await cloudinary.uploader.destroy(student.photo.public_id);
      } catch (error) {
        console.error('Error deleting old photo:', error);
        // Continue with upload even if deletion fails
      }
    }

    // Upload new image to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'student_profiles',
          public_id: `student_${rollNo}_${Date.now()}`,
          transformation: [
            { width: 500, height: 500, crop: 'fill' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Update only the photo field in the database
    const updatedStudent = await registered_students.findOneAndUpdate(
      { rollNo },
      { 
        $set: { 
          photo: {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url
          } 
        } 
      },
      { new: true }
    ).select('photo');

    return NextResponse.json(
      {
        message: 'Profile photo updated successfully',
        data: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile photo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}