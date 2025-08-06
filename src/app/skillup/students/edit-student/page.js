'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEdit, FiSave, FiX, FiUser, FiPhone, FiMail, FiCalendar, FiBook, FiDollarSign, FiAward, FiPlus, FiTrash2 } from 'react-icons/fi';

// ... (your existing COURSE_SUBJECTS and SUBJECT_DETAILS objects remain the same)

export default function StudentManager() {
  // State management
  const [searchInput, setSearchInput] = useState('');
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showCustomCourseInput, setShowCustomCourseInput] = useState(false);
  const [customCourse, setCustomCourse] = useState('');

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
    finalGrade: 'Pending'
  });

  // Reset messages after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, success]);

  // Handle file upload preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
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
      setError('Please enter a roll number or phone number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await axios.get(`/api/admin/student/editStudent/getStudent?identifier=${searchInput.trim()}`);
      setStudent(response.data.student);
      setFormData(response.data.student);
      if (response.data.student.photo?.url) {
        setPreviewUrl(response.data.student.photo.url);
      }
      setSuccess('Student found successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Student not found. Please check the details.');
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
          if (key === 'photo') continue; // Skip photo as we handle it separately
          
          if (typeof formData[key] === 'object') {
            // Handle nested objects like feeDetails and examResults
            if (key === 'feeDetails' || key === 'examResults') {
              formDataToSend.append(key, JSON.stringify(formData[key]));
            }
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
      setSuccess('Student updated successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update student');
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
          installmentDetails: newInstallments
        }
      };
    });
  };

  // Add exam result
  const addExamResult = () => {
    if (!formData.selectedCourse) {
      setError('Please select a course first');
      return;
    }
  
    // Find the course in our COURSE_SUBJECTS (case insensitive)
    const courseKey = Object.keys(COURSE_SUBJECTS).find(
      key => key.toLowerCase() === formData.selectedCourse.toLowerCase()
    );
  
    if (!courseKey) {
      setError('No subjects defined for the selected course');
      return;
    }
  
    const courseSubjects = COURSE_SUBJECTS[courseKey];
    const subjectCodes = Object.keys(courseSubjects);
  
    if (subjectCodes.length === 0) {
      setError('No subjects found for the selected course');
      return;
    }
  
    // Add all subjects for the course that aren't already in examResults
    const newSubjects = subjectCodes
      .filter(code => !formData.examResults.some(result => result.subjectCode === code))
      .map(code => {
        const subjectDetails = SUBJECT_DETAILS[code] || {
          subjectName: courseSubjects[code],
          maxTheoryMarks: 0,
          maxPracticalMarks: 0
        };
        
        return {
          subjectCode: code,
          subjectName: subjectDetails.subjectName,
          theoryMarks: 0,
          practicalMarks: 0,
          totalMarks: 0,
          examDate: new Date().toISOString().split('T')[0],
          maxTheoryMarks: subjectDetails.maxTheoryMarks,
          maxPracticalMarks: subjectDetails.maxPracticalMarks
        };
      });
  
    if (newSubjects.length === 0) {
      setError('All subjects for this course are already added');
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

  // Handle custom course input
  const handleCustomCourseSubmit = () => {
    if (customCourse.trim()) {
      setFormData(prev => ({
        ...prev,
        selectedCourse: customCourse
      }));
      setShowCustomCourseInput(false);
      setCustomCourse('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* ... (previous search section and messages remain the same) ... */}

        {/* Student Display/Edit Section */}
        {student && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow overflow-hidden rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Student Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiX className="mr-1" /> Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : (
                        <>
                          <FiSave className="mr-1" /> Save
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex">
                    <button
                      type="button"
                      onClick={() => setActiveTab('basic')}
                      className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'basic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Basic Info
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('academic')}
                      className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'academic' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Academic
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('financial')}
                      className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'financial' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Financial
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('exams')}
                      className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${activeTab === 'exams' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      Exam Results
                    </button>
                  </nav>
                </div>

                {/* Academic Tab - Improved Course Selection */}
                {activeTab === 'academic' && (
                  <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Selected Course with Custom Option */}
                    <div className="sm:col-span-6">
                      <label htmlFor="selectedCourse" className="block text-sm font-medium text-gray-700">
                        Selected Course <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex gap-2">
                        <select
                          id="selectedCourse"
                          name="selectedCourse"
                          value={formData.selectedCourse}
                          onChange={handleChange}
                          className="flex-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select Course</option>
                          {Object.keys(COURSE_SUBJECTS).map(course => (
                            <option key={course} value={course}>{course}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => setShowCustomCourseInput(!showCustomCourseInput)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {showCustomCourseInput ? <FiX /> : <FiPlus />}
                        </button>
                      </div>
                      
                      {showCustomCourseInput && (
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={customCourse}
                            onChange={(e) => setCustomCourse(e.target.value)}
                            placeholder="Enter custom course name"
                            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                          <button
                            type="button"
                            onClick={handleCustomCourseSubmit}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Course Duration with Manual Input */}
                    <div className="sm:col-span-3">
                      <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
                        Course Duration <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <select
                          id="courseDuration"
                          name="courseDuration"
                          value={formData.courseDuration}
                          onChange={handleChange}
                          className="flex-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          required
                        >
                          <option value="">Select Duration</option>
                          <option value="3 months">3 months</option>
                          <option value="6 months">6 months</option>
                          <option value="1 year">1 year</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                      {formData.courseDuration === 'custom' && (
                        <div className="mt-2">
                          <input
                            type="text"
                            name="courseDuration"
                            value={formData.courseDuration}
                            onChange={handleChange}
                            placeholder="Enter custom duration"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* ... (rest of the academic tab remains the same) ... */}
                  </div>
                )}

                {/* Financial Tab - Improved Fee Inputs */}
                {activeTab === 'financial' && (
                  <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Total Fees with Better Input */}
                    <div className="sm:col-span-3">
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
                          step="100" // Allows increments by 100
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm px-2">.00</span>
                        </div>
                      </div>
                    </div>

                    {/* Remaining Fees with Better Input */}
                    <div className="sm:col-span-3">
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
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm px-2">.00</span>
                        </div>
                      </div>
                    </div>

                    {/* Installment Details with Improved UX */}
                    <div className="sm:col-span-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Installment Details
                        </h4>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const totalInstallments = formData.feeDetails.installments || 1;
                              const newInstallments = Array(totalInstallments).fill().map(() => ({
                                amount: 0,
                                submissionDate: new Date().toISOString().split('T')[0],
                                paid: false
                              }));
                              
                              setFormData(prev => ({
                                ...prev,
                                feeDetails: {
                                  ...prev.feeDetails,
                                  installmentDetails: newInstallments
                                }
                              }));
                            }}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Add All Installments
                          </button>
                          <button
                            type="button"
                            onClick={addInstallment}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FiPlus className="mr-1" /> Add One
                          </button>
                        </div>
                      </div>

                      {formData.feeDetails.installmentDetails.length === 0 ? (
                        <div className="text-center py-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">No installments added yet</p>
                          <button
                            type="button"
                            onClick={addInstallment}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <FiPlus className="mr-1" /> Add First Installment
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {formData.feeDetails.installmentDetails.map((installment, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end bg-gray-50 p-3 rounded">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Amount (₹)
                                </label>
                                <input
                                  type="number"
                                  name={`feeDetails.installmentDetails[${index}].amount`}
                                  value={installment.amount}
                                  onChange={handleChange}
                                  min="0"
                                  step="100"
                                  className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Due Date
                                </label>
                                <input
                                  type="date"
                                  name={`feeDetails.installmentDetails[${index}].submissionDate`}
                                  value={installment.submissionDate?.split('T')[0] || ''}
                                  onChange={handleChange}
                                  className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div className="flex items-center h-full">
                                <div className="flex items-center h-5">
                                  <input
                                    type="checkbox"
                                    name={`feeDetails.installmentDetails[${index}].paid`}
                                    checked={installment.paid}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                </div>
                                <label className="ml-2 block text-xs text-gray-700">
                                  Paid
                                </label>
                              </div>
                              <div className="sm:col-span-2 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => removeInstallment(index)}
                                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <FiTrash2 className="mr-1" /> Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Exam Results Tab - Improved UX */}
                {activeTab === 'exams' && (
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-sm font-medium text-gray-700">
                        Exam Results
                      </h4>
                      <div className="flex gap-2">
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
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FiPlus className="mr-1" /> Add Manual Entry
                        </button>
                        <button
                          type="button"
                          onClick={addExamResult}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FiPlus className="mr-1" /> Add Course Subjects
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
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theory</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Practical</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {formData.examResults.map((result, index) => (
                              <tr key={index}>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <input
                                    type="text"
                                    name={`examResults[${index}].subjectName`}
                                    value={result.subjectName}
                                    onChange={handleChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <input
                                    type="text"
                                    name={`examResults[${index}].subjectCode`}
                                    value={result.subjectCode}
                                    onChange={handleChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  />
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      name={`examResults[${index}].theoryMarks`}
                                      value={result.theoryMarks}
                                      onChange={handleChange}
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
                                      name={`examResults[${index}].practicalMarks`}
                                      value={result.practicalMarks}
                                      onChange={handleChange}
                                      min="0"
                                      max={result.maxPracticalMarks || 100}
                                      className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <span className="text-xs text-gray-500">/ {result.maxPracticalMarks}</span>
                                  </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {result.theoryMarks + result.practicalMarks}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <input
                                    type="date"
                                    name={`examResults[${index}].examDate`}
                                    value={result.examDate?.split('T')[0] || ''}
                                    onChange={handleChange}
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </form>
            ) : (
              <div className="px-4 py-5 sm:p-6">
                {/* View Mode */}
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Student Photo */}
                  <div className="flex-shrink-0">
                    {student.photo?.url ? (
                      <img
                        src={student.photo.url}
                        alt={`${student.fullName}'s photo`}
                        className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow">
                        <FiUser className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Student Details */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{student.fullName}</h2>
                        <p className="text-sm text-gray-500">{student.rollNo}</p>
                      </div>
                      <div className="sm:text-right">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${student.certificate ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {student.certificate ? 'Certificate Issued' : 'Certificate Pending'}
                        </span>
                        {student.finalGrade && (
                          <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            Grade: {student.finalGrade}
                          </span>
                        )}
                      </div>

                      {/* Basic Info */}
                      <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Gender</p>
                          <p className="text-sm text-gray-900 capitalize">{student.gender || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                          <p className="text-sm text-gray-900">{student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone Number</p>
                          <p className="text-sm text-gray-900">{student.phoneNumber || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-sm text-gray-900">{student.emailAddress || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Parents Phone</p>
                          <p className="text-sm text-gray-900">{student.parentsPhoneNumber || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Aadhar Number</p>
                          <p className="text-sm text-gray-900">{student.aadharNumber || 'Not specified'}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-sm text-gray-900">{student.address || 'Not specified'}</p>
                        </div>
                      </div>

                      {/* Academic Info */}
                      <div className="sm:col-span-2 border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Academic Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Course</p>
                            <p className="text-sm text-gray-900">{student.selectedCourse || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Duration</p>
                            <p className="text-sm text-gray-900">{student.courseDuration || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Joining Date</p>
                            <p className="text-sm text-gray-900">{student.joiningDate ? new Date(student.joiningDate).toLocaleDateString() : 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Farewell Date</p>
                            <p className="text-sm text-gray-900">{student.farewellDate ? new Date(student.farewellDate).toLocaleDateString() : 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Qualification</p>
                            <p className="text-sm text-gray-900">{student.qualification || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Financial Info */}
                      <div className="sm:col-span-2 border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Total Fees</p>
                            <p className="text-sm text-gray-900">₹{student.feeDetails?.totalFees?.toLocaleString() || '0'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Remaining Fees</p>
                            <p className="text-sm text-gray-900">₹{student.feeDetails?.remainingFees?.toLocaleString() || '0'}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Installments</p>
                            <p className="text-sm text-gray-900">{student.feeDetails?.installments || '0'}</p>
                          </div>
                        </div>

                        {student.feeDetails?.installmentDetails?.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Installment Details</h4>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {student.feeDetails.installmentDetails.map((installment, index) => (
                                    <tr key={index}>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">₹{installment.amount?.toLocaleString()}</td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{installment.submissionDate ? new Date(installment.submissionDate).toLocaleDateString() : '-'}</td>
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
                      </div>

                      {/* Exam Results */}
                      {student.examResults?.length > 0 && (
                        <div className="sm:col-span-2 border-t border-gray-200 pt-4 mt-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">Exam Results</h3>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
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
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.theoryMarks}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.practicalMarks}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">{result.totalMarks}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{result.examDate ? new Date(result.examDate).toLocaleDateString() : '-'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
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