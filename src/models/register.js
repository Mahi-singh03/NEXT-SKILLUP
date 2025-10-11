import mongoose from 'mongoose';

const seminarRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    minlength: [10, 'Phone number must be at least 10 digits'],
    maxlength: [15, 'Phone number cannot exceed 15 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters long'],
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  modePreference: {
    type: String,
    required: [true, 'Mode preference is required'],
    enum: {
      values: ['online', 'offline'],
      message: 'Mode preference must be either online or offline'
    }
  }
}, {
  timestamps: true
});

// Create indexes for better performance
seminarRegistrationSchema.index({ email: 1 });
seminarRegistrationSchema.index({ createdAt: -1 });

const SeminarRegistration = mongoose.models.SeminarRegistration || mongoose.model('SeminarRegistration', seminarRegistrationSchema);

export default SeminarRegistration;
