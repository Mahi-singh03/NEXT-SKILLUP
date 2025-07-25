import  connectToDatabase  from '../../../../../../lib/DBconnection';
import registered_students from '../../../../../../models/students'; 
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import formidable from 'formidable';
import { Readable } from 'stream';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validation middleware
const validate = [
  body('fullName').optional().trim().notEmpty().withMessage('Full name is required'),
  body('gender')
    .optional()
    .trim()
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be either male, female, or other'),
  body('fatherName').optional().trim().notEmpty().withMessage("Father's name is required"),
  body('motherName').optional().trim().notEmpty().withMessage("Mother's name is required"),
  body('parentsPhoneNumber')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Enter a valid 10-digit parents phone number'),
  body('emailAddress')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please fill a valid email address'),
  body('phoneNumber')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Enter a valid 10-digit phone number'),
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid date of birth'),
  body('joiningDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid joining date'),
  body('farewellDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid farewell date'),
  body('aadharNumber')
    .optional()
    .matches(/^[0-9]{12}$/)
    .withMessage('Enter a valid 12-digit Aadhar number'),
  body('selectedCourse')
    .optional()
    .isIn([
      'HTML, CSS, JS',
      'ChatGPT and AI tools',
      'Industrial Training',
      'React',
      'MERN FullStack',
      'Autocad',
      'CorelDRAW',
      'Tally',
      'Premier Pro',
      'WordPress',
      'Computer Course',
      'MS Office',
      'PTE',
    ])
    .withMessage('Invalid course selection'),
  body('courseDuration')
    .optional()
    .isIn(['3 months', '6 months', '1 year'])
    .withMessage('Invalid course duration'),
  body('address').optional().trim().notEmpty().withMessage('Address is required'),
  body('qualification')
    .optional()
    .isIn(['10th', '12th', 'Graduated'])
    .withMessage('Invalid qualification'),
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('feeDetails.totalFees')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total fees must be a positive number'),
  body('feeDetails.remainingFees')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Remaining fees must be a positive number'),
  body('feeDetails.installments')
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage('Installments must be between 1 and 12'),
  body('feeDetails.installmentDetails.*.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Installment amount must be a positive number'),
  body('feeDetails.installmentDetails.*.submissionDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid installment submission date'),
  body('feeDetails.installmentDetails.*.paid')
    .optional()
    .isBoolean()
    .withMessage('Paid status must be a boolean'),
  body('examResults.*.subjectCode')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Subject code is required'),
  body('examResults.*.subjectName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Subject name is required'),
  body('examResults.*.theoryMarks')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Theory marks must be a positive number'),
  body('examResults.*.practicalMarks')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Practical marks must be a positive number'),
  body('examResults.*.totalMarks')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total marks must be a positive number'),
  body('examResults.*.examDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid exam date'),
  body('certificate')
    .optional()
    .isBoolean()
    .withMessage('Certificate must be a boolean'),
  body('finalGrade')
    .optional()
    .isIn(['A', 'B', 'C', 'D', 'F', 'Pending'])
    .withMessage('Invalid final grade'),
];

// PUT /api/students/[id]
export async function PUT(request, { params }) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse form data
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        return mimetype && ['image/jpeg', 'image/jpg', 'image/png'].includes(mimetype);
      },
    });

    // Convert NextRequest body to a readable stream
    const buffer = await request.arrayBuffer();
    const stream = new Readable({
      read() {
        this.push(Buffer.from(buffer));
        this.push(null);
      },
    });

    // Attach headers to the stream (formidable expects these)
    stream.headers = {
      'content-type': request.headers.get('content-type') || '',
      'content-length': request.headers.get('content-length') || buffer.byteLength.toString(),
    };

    // Now pass the stream to formidable
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(stream, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });

    // Convert fields to object
    const data = {};
    Object.keys(fields).forEach((key) => {
      data[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
    });

    // Run validation
    const reqForValidation = { body: data };
    await Promise.all(validate.map((validation) => validation.run(reqForValidation)));
    const errors = validationResult(reqForValidation);
    if (!errors.isEmpty()) {
      return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    const { id } = params;

    // Handle password hashing if provided
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    // Handle photo upload to Cloudinary
    if (files.photo && files.photo[0]) {
      const file = files.photo[0];
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'student_photos',
          resource_type: 'image',
        });
        data.photo = {
          public_id: result.public_id,
          url: result.secure_url,
        };
        // Clean up temporary file
        await fs.promises.unlink(file.filepath);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to upload photo to Cloudinary' }, { status: 500 });
      }
    }

    // Parse nested fields (examResults, feeDetails)
    if (data.examResults) {
      try {
        data.examResults = JSON.parse(data.examResults);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid examResults format' }, { status: 400 });
      }
    }

    if (data.feeDetails) {
      try {
        data.feeDetails = JSON.parse(data.feeDetails);
      } catch (e) {
        return NextResponse.json({ error: 'Invalid feeDetails format' }, { status: 400 });
      }
    }

    // Check for unique fields (emailAddress, aadharNumber)
    if (data.emailAddress) {
      const existingEmail = await registered_students.findOne({
        emailAddress: data.emailAddress,
        _id: { $ne: id },
      });
      if (existingEmail) {
        return NextResponse.json({ error: 'Email address already exists' }, { status: 400 });
      }
    }

    if (data.aadharNumber) {
      const existingAadhar = await registered_students.findOne({
        aadharNumber: data.aadharNumber,
        _id: { $ne: id },
      });
      if (existingAadhar) {
        return NextResponse.json({ error: 'Aadhar number already exists' }, { status: 400 });
      }
    }

    // Update student
    const updatedStudent = await registered_students.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}