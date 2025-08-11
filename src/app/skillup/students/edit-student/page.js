'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiEdit, FiSave, FiX, FiUser, FiPhone, 
  FiMail, FiCalendar, FiBook, FiDollarSign, FiAward, 
  FiPlus, FiTrash2, FiChevronDown, FiChevronRight, FiUpload, FiDownload 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Certification Subjects
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
  "CS-05": "Computer Accountency: Tally"
};

const ADVANCE_DIPLOMA_IN_COMPUTER_APPLICATION = {
  "CS-01": "Basic Computer",
  "CS-02": "Windows Application: MS Office",
  "CS-03": "Operating System",
  "CS-05": "Computer Accountency: Tally",
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

// Subject Details
const SUBJECT_DETAILS = {
  "CS-01": {
    "Subject Name": "Basic Computer",
    "Max Theory Marks": 100,
    "Max Practical Marks": 0,
  },
  "CS-02": {
    "Subject Name": "Windows Application: MS Office",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-03": {
    "Subject Name": "Operating System",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-04": {
    "Subject Name": "Web Publisher: Internet Browsing",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-05": {
    "Subject Name": "COMPUTER ACCOUTANCY: TALLY",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-06": {
    "Subject Name": "DESKTOP PUBLISHING: PHOTOSHOP",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-07": {
    "Subject Name": "Computerized Accounting With Tally",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-08": {
    "Subject Name": "Manual Accounting",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  },
  "CS-09": {
    "Subject Name": "Basic Computer",
    "Max Theory Marks": 40,
    "Max Practical Marks": 0,
  },
  "CS-10": {
    "Subject Name": "Tally ERP 9 & Tally Prime",
    "Max Theory Marks": 40,
    "Max Practical Marks": 60,
  }
};

// Course to Subjects Mapping
const COURSE_SUBJECTS = {
  "CERTIFICATION IN COMPUTER APPLICATION": CERTIFICATION_IN_COMPUTER_APPLICATION,
  "DIPLOMA IN COMPUTER APPLICATION": DIPLOMA_IN_COMPUTER_APPLICATION,
  "ADVANCE DIPLOMA IN COMPUTER APPLICATION": ADVANCE_DIPLOMA_IN_COMPUTER_APPLICATION,
  "CERTIFICATION IN COMPUTER ACCOUNTANCY": CERTIFICATION_IN_COMPUTER_ACCOUNTANCY,
  "DIPLOMA IN COMPUTER ACCOUNTANCY": DIPLOMA_IN_COMPUTER_ACCOUNTANCY,
}
export default function StudentManager() {
  // State management
  const [searchInput, setSearchInput] = useState('');
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    academic: true,
    financial: true,
    exams: true
  });
  const [showPassword, setShowPassword] = useState(false);

  // Form data structure
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    fatherName: '',
    motherName: '',
    parentsPhoneNumber: '',
    emailAddress: '',
    phoneNumber: '',
    dateOfBirth: '',
    joiningDate: '',
    farewellDate: '',
    aadharNumber: '',
    selectedCourse: '',
    courseDuration: '',
    address: '',
    qualification: '',
    password: '',
    feeDetails: {
      totalFees: 0,
      remainingFees: 0,
      installments: 1,
      installmentDetails: []
    },
    examResults: [],
    certificate: false,
    finalGrade: 'Pending',
    session: '',
    percentage: 0
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle file upload preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error('File size should be less than 2MB');
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Fetch student data
  const fetchStudent = async () => {
    if (!searchInput.trim()) {
      toast.error('Please enter a roll number or phone number');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.get(`/api/admin/student/editStudent/getStudent?identifier=${searchInput.trim()}`);
      setStudent(response.data.student);
      setFormData(response.data.student);
      if (response.data.student.photo?.url) {
        setPreviewUrl(response.data.student.photo.url);
      }
      toast.success('Student found successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Student not found. Please check the details.');
      setStudent(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Append all form data
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === 'photo') continue;
          
          if (typeof formData[key] === 'object') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      }
      
      // Handle date fields
      const dateFields = ['dateOfBirth', 'joiningDate', 'farewellDate'];
      dateFields.forEach(field => {
        if (formData[field]) {
          formDataToSend.append(field, new Date(formData[field]).toISOString());
        }
      });
      
      // Append file if exists
      if (file) {
        formDataToSend.append('photo', file);
      }
  
      const response = await axios.put(`/api/admin/student/editStudent/${student._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setStudent(response.data.student);
      setIsEditing(false);
      toast.success('Student updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update student');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (name.includes('[') && name.includes(']')) {
      // Handle array fields like examResults and installmentDetails
      const matches = name.match(/^(\w+)\[(\d+)\]\.(\w+)$/);
      if (matches) {
        const [, arrayName, index, field] = matches;
        setFormData(prev => {
          const newArray = [...prev[arrayName]];
          newArray[index] = {
            ...newArray[index],
            [field]: type === 'checkbox' ? checked : value
          };
          return {
            ...prev,
            [arrayName]: newArray
          };
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Add new installment
  const addInstallment = () => {
    setFormData(prev => ({
      ...prev,
      feeDetails: {
        ...prev.feeDetails,
        installmentDetails: [
          ...prev.feeDetails.installmentDetails,
          {
            amount: 0,
            submissionDate: new Date().toISOString().split('T')[0],
            paid: false
          }
        ]
      }
    }));
  };

  // Remove installment
  const removeInstallment = (index) => {
    setFormData(prev => {
      const newInstallments = [...prev.feeDetails.installmentDetails];
      newInstallments.splice(index, 1);
      return {
        ...prev,
        feeDetails: {
          ...prev.feeDetails,
          installmentDetails: newInstallments,
          installments: newInstallments.length
        }
      };
    });
  };



  // Remove exam result
  const removeExamResult = (index) => {
    setFormData(prev => {
      const newResults = [...prev.examResults];
      newResults.splice(index, 1);
      return {
        ...prev,
        examResults: newResults
      };
    });
  };

  // Calculate percentage and grade
  const calculateResults = () => {
    if (formData.examResults.length === 0) {
      toast.warning('No exam results to calculate');
      return;
    }

    let totalObtainedMarks = 0;
    let totalMaxMarks = 0;

    formData.examResults.forEach(result => {
      const subjectDetails = SUBJECT_DETAILS[result.subjectCode] || {
        "Max Theory Marks": 100,
        "Max Practical Marks": 100
      };

      const theoryMarks = parseFloat(result.theoryMarks) || 0;
      const practicalMarks = parseFloat(result.practicalMarks) || 0;
      const maxTheory = parseFloat(subjectDetails["Max Theory Marks"]) || 100;
      const maxPractical = parseFloat(subjectDetails["Max Practical Marks"]) || 100;

      totalObtainedMarks += theoryMarks + practicalMarks;
      totalMaxMarks += maxTheory + maxPractical;
    });

    const percentage = totalMaxMarks > 0 ? Math.round((totalObtainedMarks / totalMaxMarks) * 100) : 0;
    
    let grade = 'F';
    if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    setFormData(prev => ({
      ...prev,
      percentage,
      finalGrade: grade,
      examResults: prev.examResults.map(result => ({
        ...result,
        totalMarks: (parseFloat(result.theoryMarks) || 0) + (parseFloat(result.practicalMarks) || 0)
      }))
    }));

    toast.success(`Calculated: ${percentage}% (Grade: ${grade})`);
  };

  // Update total marks when theory or practical marks change
  const handleExamResultChange = (index, field, value) => {
    setFormData(prev => {
      const newResults = [...prev.examResults];
      newResults[index] = {
        ...newResults[index],
        [field]: value
      };

      // Calculate total marks when theory or practical marks change
      if (field === 'theoryMarks' || field === 'practicalMarks') {
        const theory = parseFloat(newResults[index].theoryMarks) || 0;
        const practical = parseFloat(newResults[index].practicalMarks) || 0;
        newResults[index].totalMarks = theory + practical;
      }

      // Update subject details when subject code changes
      if (field === 'subjectCode') {
        const subjectDetails = SUBJECT_DETAILS[value] || {
          "Subject Name": "",
          "Max Theory Marks": 100,
          "Max Practical Marks": 100
        };
        newResults[index].subjectName = subjectDetails["Subject Name"];
        newResults[index].maxTheoryMarks = subjectDetails["Max Theory Marks"];
        newResults[index].maxPracticalMarks = subjectDetails["Max Practical Marks"];
      }

      return {
        ...prev,
        examResults: newResults
      };
    });
  };

  // Add exam result with proper subject selection
  const addExamResult = () => {
    if (!formData.selectedCourse) {
      toast.error('Please select a course first');
      return;
    }

    // Find the course in our COURSE_SUBJECTS (case insensitive)
    const courseKey = Object.keys(COURSE_SUBJECTS).find(
      key => key.toLowerCase() === formData.selectedCourse.toLowerCase()
    );

    if (!courseKey) {
      toast.error('No subjects defined for the selected course');
      return;
    }

    const courseSubjects = COURSE_SUBJECTS[courseKey];
    const subjectCodes = Object.keys(courseSubjects);

    if (subjectCodes.length === 0) {
      toast.error('No subjects found for the selected course');
      return;
    }

    // Add all subjects for the course that aren't already in examResults
    const newSubjects = subjectCodes
      .filter(code => !formData.examResults.some(result => result.subjectCode === code))
      .map(code => {
        const subjectDetails = SUBJECT_DETAILS[code] || {
          subjectName: courseSubjects[code],
          maxTheoryMarks: 100,
          maxPracticalMarks: 100
        };
        
        return {
          subjectCode: code,
          subjectName: subjectDetails["Subject Name"] || courseSubjects[code],
          theoryMarks: 0,
          practicalMarks: 0,
          totalMarks: 0,
          examDate: new Date().toISOString().split('T')[0],
          maxTheoryMarks: subjectDetails["Max Theory Marks"] || 100,
          maxPracticalMarks: subjectDetails["Max Practical Marks"] || 100
        };
      });

    if (newSubjects.length === 0) {
      toast.info('All subjects for this course are already added');
      return;
    }

    setFormData(prev => ({
      ...prev,
      examResults: [
        ...prev.examResults,
        ...newSubjects
      ]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Search Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by Roll No, Phone, or Email"
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchStudent()}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={fetchStudent}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Display/Edit Section */}
        {student && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow overflow-hidden rounded-lg"
          >
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {student.fullName} - {student.rollNo}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {student.selectedCourse} ({student.courseDuration})
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiEdit className="mr-2" /> Edit Student
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiX className="mr-2" /> Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        {isLoading ? (
                          'Saving...'
                        ) : (
                          <>
                            <FiSave className="mr-2" /> Save Changes
                          </>
                        )}
                      </button>
                    </>
                  )}
                  {isEditing && (
                    <button
                      onClick={calculateResults}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <FiAward className="mr-2" /> Calculate Results
                    </button>
                  )}
                </div>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                {/* Personal Information Section */}
                <div className="px-6 py-5">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('personal')}
                  >
                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                    {expandedSections.personal ? <FiChevronDown /> : <FiChevronRight />}
                  </div>
                  <AnimatePresence>
                    {expandedSections.personal && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                      >
                        {/* Photo Upload */}
                        <div className="sm:col-span-1 flex flex-col items-center">
                          <div className="relative h-32 w-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow">
                            {previewUrl ? (
                              <img src={previewUrl} alt="Student" className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <FiUser className="h-16 w-16" />
                              </div>
                            )}
                          </div>
                          <label className="mt-3 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                            <FiUpload className="mr-1" /> Upload
                            <input
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                              accept="image/*"
                            />
                          </label>
                        </div>

                        {/* Personal Details */}
                        <div className="sm:col-span-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              id="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                              Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                              Father&apos;s Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="fatherName"
                              id="fatherName"
                              value={formData.fatherName}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                              Mother&apos;s Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="motherName"
                              id="motherName"
                              value={formData.motherName}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              id="dateOfBirth"
                              value={formData.dateOfBirth?.split('T')[0] || ''}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                              Aadhar Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="aadharNumber"
                              id="aadharNumber"
                              value={formData.aadharNumber}
                              onChange={handleChange}
                              pattern="[0-9]{12}"
                              maxLength="12"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              id="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              pattern="[0-9]{10}"
                              maxLength="10"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="parentsPhoneNumber" className="block text-sm font-medium text-gray-700">
                              Parents Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="parentsPhoneNumber"
                              id="parentsPhoneNumber"
                              value={formData.parentsPhoneNumber}
                              onChange={handleChange}
                              pattern="[0-9]{10}"
                              maxLength="10"
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="emailAddress"
                              id="emailAddress"
                              value={formData.emailAddress}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                              Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="address"
                              id="address"
                              rows={3}
                              value={formData.address}
                              onChange={handleChange}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              required
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Password {isEditing && <span className="text-red-500">*</span>}
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required={isEditing}
                                minLength="6"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                  {showPassword ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Academic Information Section */}
                <div className="px-6 py-5">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('academic')}
                  >
                    <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
                    {expandedSections.academic ? <FiChevronDown /> : <FiChevronRight />}
                  </div>
                  <AnimatePresence>
                    {expandedSections.academic && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                      >
                        <div className="sm:col-span-3">
                          <label htmlFor="selectedCourse" className="block text-sm font-medium text-gray-700">
                            Course <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="selectedCourse"
                            name="selectedCourse"
                            value={formData.selectedCourse}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          >
                            <option value="">Select Course</option>
                            <option value="HTML, CSS, JS">HTML, CSS, JS</option>
                            <option value="MERN FullStack">MERN FullStack</option>
                            <option value="React">React</option>
                            <option value="CorelDRAW">CorelDRAW</option>
                            <option value="Tally">Tally</option>
                            <option value="Premier Pro">Premier Pro</option>
                            <option value="WordPress">WordPress</option>
                            <option value="Computer Course">Computer Course</option>
                            <option value="MS Office">MS Office</option>
                            <option value="PTE">PTE</option>
                            <option value="AutoCAD">AutoCAD</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
                            Course Duration <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="courseDuration"
                            name="courseDuration"
                            value={formData.courseDuration}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          >
                            <option value="">Select Duration</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="1 Year">1 Year</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                            Qualification <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          >
                            <option value="">Select Qualification</option>
                            <option value="10th">10th</option>
                            <option value="12th">12th</option>
                            <option value="Graduated">Graduated</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="session" className="block text-sm font-medium text-gray-700">
                            Session <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="session"
                            id="session"
                            value={formData.session}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
                            Joining Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="joiningDate"
                            id="joiningDate"
                            value={formData.joiningDate?.split('T')[0] || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="farewellDate" className="block text-sm font-medium text-gray-700">
                            Farewell Date
                          </label>
                          <input
                            type="date"
                            name="farewellDate"
                            id="farewellDate"
                            value={formData.farewellDate?.split('T')[0] || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2 flex items-end">
                          <div className="flex items-center h-10">
                            <input
                              id="certificate"
                              name="certificate"
                              type="checkbox"
                              checked={formData.certificate}
                              onChange={handleChange}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="certificate" className="ml-2 block text-sm text-gray-700">
                              Certificate Issued
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Financial Information Section */}
                <div className="px-6 py-5">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('financial')}
                  >
                    <h3 className="text-lg font-medium text-gray-900">Financial Information</h3>
                    {expandedSections.financial ? <FiChevronDown /> : <FiChevronRight />}
                  </div>
                  <AnimatePresence>
                    {expandedSections.financial && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                      >
                        <div className="sm:col-span-2">
                          <label htmlFor="feeDetails.totalFees" className="block text-sm font-medium text-gray-700">
                            Total Fees (₹) <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input
                              type="number"
                              name="feeDetails.totalFees"
                              id="feeDetails.totalFees"
                              value={formData.feeDetails.totalFees}
                              onChange={handleChange}
                              min="0"
                              step="100"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="feeDetails.remainingFees" className="block text-sm font-medium text-gray-700">
                            Remaining Fees (₹) <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">₹</span>
                            </div>
                            <input
                              type="number"
                              name="feeDetails.remainingFees"
                              id="feeDetails.remainingFees"
                              value={formData.feeDetails.remainingFees}
                              onChange={handleChange}
                              min="0"
                              step="100"
                              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="feeDetails.installments" className="block text-sm font-medium text-gray-700">
                            Number of Installments <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            name="feeDetails.installments"
                            id="feeDetails.installments"
                            value={formData.feeDetails.installments}
                            onChange={handleChange}
                            min="1"
                            max="12"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div className="sm:col-span-6">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-700">
                              Installment Details
                            </h4>
                            <button
                              type="button"
                              onClick={addInstallment}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiPlus className="mr-1" /> Add Installment
                            </button>
                          </div>

                          {formData.feeDetails.installmentDetails.length === 0 ? (
                            <div className="text-center py-4 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-500">No installments added yet</p>
                            </div>
                          ) : (
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {formData.feeDetails.installmentDetails.map((installment, index) => (
                                    <tr key={index}>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <div className="relative rounded-md shadow-sm">
                                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₹</span>
                                          </div>
                                          <input
                                            type="number"
                                            name={`feeDetails.installmentDetails[${index}].amount`}
                                            value={installment.amount}
                                            onChange={handleChange}
                                            min="0"
                                            step="100"
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                          />
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <input
                                          type="date"
                                          name={`feeDetails.installmentDetails[${index}].submissionDate`}
                                          value={installment.submissionDate?.split('T')[0] || ''}
                                          onChange={handleChange}
                                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            name={`feeDetails.installmentDetails[${index}].paid`}
                                            checked={installment.paid}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          />
                                          <label className="ml-2 block text-sm text-gray-700">
                                            {installment.paid ? 'Paid' : 'Pending'}
                                          </label>
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                          type="button"
                                          onClick={() => removeInstallment(index)}
                                          className="text-red-600 hover:text-red-900"
                                        >
                                          <FiTrash2 />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Exam Results Section */}
                <div className="px-6 py-5">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleSection('exams')}
                  >
                    <h3 className="text-lg font-medium text-gray-900">Exam Results</h3>
                    {expandedSections.exams ? <FiChevronDown /> : <FiChevronRight />}
                  </div>
                  <AnimatePresence>
                    {expandedSections.exams && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Add exam results for the selected course</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={addExamResult}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <FiPlus className="mr-1" /> Add Course Subjects
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  examResults: [
                                    ...prev.examResults,
                                    {
                                      subjectCode: '',
                                      subjectName: '',
                                      theoryMarks: 0,
                                      practicalMarks: 0,
                                      totalMarks: 0,
                                      examDate: new Date().toISOString().split('T')[0],
                                      maxTheoryMarks: 100,
                                      maxPracticalMarks: 100
                                    }
                                  ]
                                }));
                              }}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiPlus className="mr-1" /> Add Custom Subject
                            </button>
                          </div>
                        </div>

                        {formData.examResults.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-lg">
                            <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No exam results</h3>
                            <p className="mt-1 text-sm text-gray-500">Add exam results using the buttons above</p>
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theory</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Practical</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {formData.examResults.map((result, index) => {
                                  const courseKey = Object.keys(COURSE_SUBJECTS).find(
                                    key => key.toLowerCase() === formData.selectedCourse.toLowerCase()
                                  );
                                  const courseSubjects = courseKey ? COURSE_SUBJECTS[courseKey] : {};

                                  return (
                                    <tr key={index}>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <select
                                          value={result.subjectCode}
                                          onChange={(e) => handleExamResultChange(index, 'subjectCode', e.target.value)}
                                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        >
                                          <option value="">Select Subject</option>
                                          {Object.entries(courseSubjects).map(([code, name]) => (
                                            <option key={code} value={code}>{code} - {name}</option>
                                          ))}
                                        </select>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <input
                                          type="text"
                                          value={result.subjectName}
                                          readOnly
                                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100"
                                        />
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                          <input
                                            type="number"
                                            value={result.theoryMarks}
                                            onChange={(e) => handleExamResultChange(index, 'theoryMarks', e.target.value)}
                                            min="0"
                                            max={result.maxTheoryMarks || 100}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <span className="text-xs text-gray-500">/ {result.maxTheoryMarks}</span>
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                          <input
                                            type="number"
                                            value={result.practicalMarks}
                                            onChange={(e) => handleExamResultChange(index, 'practicalMarks', e.target.value)}
                                            min="0"
                                            max={result.maxPracticalMarks || 100}
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <span className="text-xs text-gray-500">/ {result.maxPracticalMarks}</span>
                                        </div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {result.totalMarks}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap">
                                        <input
                                          type="date"
                                          value={result.examDate?.split('T')[0] || ''}
                                          onChange={(e) => handleExamResultChange(index, 'examDate', e.target.value)}
                                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                          type="button"
                                          onClick={() => removeExamResult(index)}
                                          className="text-red-600 hover:text-red-900"
                                        >
                                          <FiTrash2 />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            ) : (
              <div className="px-6 py-5">
                {/* View Mode */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Student Photo */}
                  <div className="flex-shrink-0">
                    <div className="relative h-40 w-40 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg">
                      {student.photo?.url ? (
                        <img
                          src={student.photo.url}
                          alt={`${student.fullName}'s photo`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <FiUser className="h-20 w-20" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${student.certificate ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {student.certificate ? 'Certificate Issued' : 'Certificate Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="flex-1 space-y-6">
                    {/* Personal Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                        <button 
                          onClick={() => toggleSection('personal')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedSections.personal ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedSections.personal && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-500">Full Name</p>
                              <p className="text-sm text-gray-900">{student.fullName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Gender</p>
                              <p className="text-sm text-gray-900 capitalize">{student.gender}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Father&apos;s Name</p>
                              <p className="text-sm text-gray-900">{student.fatherName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Mother&apos;s Name</p>
                              <p className="text-sm text-gray-900">{student.motherName}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                              <p className="text-sm text-gray-900">
                                {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : '-'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone Number</p>
                              <p className="text-sm text-gray-900">{student.phoneNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Parents Phone</p>
                              <p className="text-sm text-gray-900">{student.parentsPhoneNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="text-sm text-gray-900">{student.emailAddress}</p>
                            </div>
                            <div className="sm:col-span-2">
                              <p className="text-sm font-medium text-gray-500">Address</p>
                              <p className="text-sm text-gray-900">{student.address}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Aadhar Number</p>
                              <p className="text-sm text-gray-900">{student.aadharNumber}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Academic Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
                        <button 
                          onClick={() => toggleSection('academic')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedSections.academic ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedSections.academic && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-500">Course</p>
                              <p className="text-sm text-gray-900">{student.selectedCourse}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Duration</p>
                              <p className="text-sm text-gray-900">{student.courseDuration}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Qualification</p>
                              <p className="text-sm text-gray-900">{student.qualification}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Session</p>
                              <p className="text-sm text-gray-900">{student.session}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Joining Date</p>
                              <p className="text-sm text-gray-900">
                                {student.joiningDate ? new Date(student.joiningDate).toLocaleDateString() : '-'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Farewell Date</p>
                              <p className="text-sm text-gray-900">
                                {student.farewellDate ? new Date(student.farewellDate).toLocaleDateString() : '-'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Percentage</p>
                              <p className="text-sm text-gray-900">{student.percentage}%</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Final Grade</p>
                              <p className="text-sm text-gray-900">{student.finalGrade}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Financial Info */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Financial Information</h3>
                        <button 
                          onClick={() => toggleSection('financial')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedSections.financial ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedSections.financial && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Total Fees</p>
                                <p className="text-sm text-gray-900">₹{student.feeDetails?.totalFees?.toLocaleString('en-IN') || '0'}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Remaining Fees</p>
                                <p className="text-sm text-gray-900">₹{student.feeDetails?.remainingFees?.toLocaleString('en-IN') || '0'}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">Installments</p>
                                <p className="text-sm text-gray-900">{student.feeDetails?.installments || '0'}</p>
                              </div>
                            </div>

                            {student.feeDetails?.installmentDetails?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Installment Details</h4>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                      <tr>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {student.feeDetails.installmentDetails.map((installment, index) => (
                                        <tr key={index}>
                                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                            ₹{installment.amount?.toLocaleString('en-IN')}
                                          </td>
                                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                            {installment.submissionDate ? new Date(installment.submissionDate).toLocaleDateString() : '-'}
                                          </td>
                                          <td className="px-3 py-2 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${installment.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                              {installment.paid ? 'Paid' : 'Pending'}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Exam Results */}
                    {student.examResults?.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium text-gray-900">Exam Results</h3>
                          <button 
                            onClick={() => toggleSection('exams')}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            {expandedSections.exams ? <FiChevronDown /> : <FiChevronRight />}
                          </button>
                        </div>
                        <AnimatePresence>
                          {expandedSections.exams && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theory</th>
                                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Practical</th>
                                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {student.examResults.map((result, index) => (
                                      <tr key={index}>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.subjectName}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.subjectCode}</td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {result.theoryMarks} / {result.maxTheoryMarks || 100}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {result.practicalMarks} / {result.maxPracticalMarks || 100}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                                          {result.theoryMarks + result.practicalMarks}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                          {result.examDate ? new Date(result.examDate).toLocaleDateString() : '-'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}