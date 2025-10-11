// app/api/register/route.js
import connectDB from '../../../lib/DBconnection.js';
import SeminarRegistration from '../../../models/register.js';

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    const { name, phoneNumber, email, address, modePreference } = await request.json();

    // Basic validation
    if (!name || !phoneNumber || !email || !address || !modePreference) {
      return Response.json({
        success: false,
        message: 'All fields are required'
      }, { status: 400 });
    }

    // Check if email already exists
    const existingRegistration = await SeminarRegistration.findOne({ email });
    if (existingRegistration) {
      return Response.json({
        success: false,
        message: 'Email is already registered for this seminar'
      }, { status: 400 });
    }

    // Create new registration
    const registration = await SeminarRegistration.create({
      name,
      phoneNumber,
      email,
      address,
      modePreference
    });

    return Response.json({
      success: true,
      message: 'Registration successful',
      data: registration
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return Response.json({
        success: false,
        message: 'Validation failed',
        errors: errors
      }, { status: 400 });
    }

    return Response.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Connect to database
    await connectDB();
    
    // Get all registrations (optional - for admin purposes)
    const registrations = await SeminarRegistration.find({}).sort({ createdAt: -1 });
    
    return Response.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return Response.json({
      success: false,
      message: 'Error fetching registrations'
    }, { status: 500 });
  }
}