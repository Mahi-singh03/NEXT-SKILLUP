'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEdit, FiSave, FiX, FiUser, FiPhone, FiMail, FiCalendar, FiBook, FiDollarSign, FiAward } from 'react-icons/fi';

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
          if (typeof formData[key] === 'object') {
            formDataToSend.append(key, JSON.stringify(formData[key]));
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      }
      
      // Append file if exists
      if (file) {
        formDataToSend.append('photo', file);
      }

      const response = await axios.put(`/api//admin/editStudent/${student._id}`, formDataToSend, {
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
          examDate: new Date().toISOString().split('T')[0]
        }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Student Management System
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Search, view, and edit student records
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Roll Number or Phone Number"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchStudent()}
              />
            </div>
            <button
              onClick={fetchStudent}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Searching...' : 'Search Student'}
            </button>
          </div>
        </div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && !student && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

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

                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Photo Upload */}
                    <div className="sm:col-span-6">
                      <div className="flex items-center">
                        <div className="mr-4">
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Student"
                              className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                              <FiUser className="h-10 w-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student Photo
                          </label>
                          <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Father's Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                        Father's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        id="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Mother's Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                        Mother's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="motherName"
                        id="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>

                    {/* Parents Phone */}
                    <div className="sm:col-span-3">
                      <label htmlFor="parentsPhoneNumber" className="block text-sm font-medium text-gray-700">
                        Parents Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="parentsPhoneNumber"
                          id="parentsPhoneNumber"
                          value={formData.parentsPhoneNumber}
                          onChange={handleChange}
                          pattern="[0-9]{10}"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-3">
                      <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="emailAddress"
                          id="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-3">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          pattern="[0-9]{10}"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="sm:col-span-3">
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiCalendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          value={formData.dateOfBirth?.split('T')[0] || ''}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Address */}
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
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Academic Tab */}
                {activeTab === 'academic' && (
                  <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Selected Course */}
                    <div className="sm:col-span-3">
                      <label htmlFor="selectedCourse" className="block text-sm font-medium text-gray-700">
                        Selected Course <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="selectedCourse"
                        name="selectedCourse"
                        value={formData.selectedCourse}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        required
                      >
                        <option value="">Select Course</option>
                        <option value="HTML, CSS, JS">HTML, CSS, JS</option>
                        <option value="ChatGPT and AI tools">ChatGPT and AI tools</option>
                        <option value="Industrial Training">Industrial Training</option>
                        <option value="React">React</option>
                        <option value="MERN FullStack">MERN FullStack</option>
                        <option value="Autocad">Autocad</option>
                        <option value="CorelDRAW">CorelDRAW</option>
                        <option value="Tally">Tally</option>
                        <option value="Premier Pro">Premier Pro</option>
                        <option value="WordPress">WordPress</option>
                        <option value="Computer Course">Computer Course</option>
                        <option value="MS Office">MS Office</option>
                        <option value="PTE">PTE</option>
                      </select>
                    </div>

                    {/* Course Duration */}
                    <div className="sm:col-span-3">
                      <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
                        Course Duration <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="courseDuration"
                        name="courseDuration"
                        value={formData.courseDuration}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        required
                      >
                        <option value="">Select Duration</option>
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 year">1 year</option>
                      </select>
                    </div>

                    {/* Joining Date */}
                    <div className="sm:col-span-3">
                      <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
                        Joining Date
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiCalendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="joiningDate"
                          id="joiningDate"
                          value={formData.joiningDate?.split('T')[0] || ''}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Farewell Date */}
                    <div className="sm:col-span-3">
                      <label htmlFor="farewellDate" className="block text-sm font-medium text-gray-700">
                        Farewell Date
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiCalendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="farewellDate"
                          id="farewellDate"
                          value={formData.farewellDate?.split('T')[0] || ''}
                          onChange={handleChange}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Qualification */}
                    <div className="sm:col-span-3">
                      <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                        Qualification <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        required
                      >
                        <option value="">Select Qualification</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                    </div>

                    {/* Aadhar Number */}
                    <div className="sm:col-span-3">
                      <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        name="aadharNumber"
                        id="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        pattern="[0-9]{12}"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Certificate */}
                    <div className="sm:col-span-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="certificate"
                          id="certificate"
                          checked={formData.certificate}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="certificate" className="ml-2 block text-sm text-gray-700">
                          Certificate Issued
                        </label>
                      </div>
                    </div>

                    {/* Final Grade */}
                    <div className="sm:col-span-3">
                      <label htmlFor="finalGrade" className="block text-sm font-medium text-gray-700">
                        Final Grade
                      </label>
                      <select
                        id="finalGrade"
                        name="finalGrade"
                        value={formData.finalGrade}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="sm:col-span-6">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Change Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength="6"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <p className="mt-1 text-sm text-gray-500">Leave blank to keep current password</p>
                    </div>
                  </div>
                )}

                {/* Financial Tab */}
                {activeTab === 'financial' && (
                  <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    {/* Total Fees */}
                    <div className="sm:col-span-2">
                      <label htmlFor="feeDetails.totalFees" className="block text-sm font-medium text-gray-700">
                        Total Fees (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiDollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          name="feeDetails.totalFees"
                          id="feeDetails.totalFees"
                          value={formData.feeDetails.totalFees}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    {/* Remaining Fees */}
                    <div className="sm:col-span-2">
                      <label htmlFor="feeDetails.remainingFees" className="block text-sm font-medium text-gray-700">
                        Remaining Fees (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiDollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          name="feeDetails.remainingFees"
                          id="feeDetails.remainingFees"
                          value={formData.feeDetails.remainingFees}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>

                    {/* Installments */}
                    <div className="sm:col-span-2">
                      <label htmlFor="feeDetails.installments" className="block text-sm font-medium text-gray-700">
                        Total Installments
                      </label>
                      <input
                        type="number"
                        name="feeDetails.installments"
                        id="feeDetails.installments"
                        value={formData.feeDetails.installments}
                        onChange={handleChange}
                        min="1"
                        max="12"
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Installment Details */}
                    <div className="sm:col-span-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Installment Details
                        </h4>
                        <button
                          type="button"
                          onClick={addInstallment}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add Installment
                        </button>
                      </div>

                      {formData.feeDetails.installmentDetails.length === 0 ? (
                        <p className="text-sm text-gray-500">No installments added yet</p>
                      ) : (
                        <div className="space-y-4">
                          {formData.feeDetails.installmentDetails.map((installment, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end bg-gray-50 p-3 rounded">
                              <div>
                                <label htmlFor={`installment-${index}-amount`} className="block text-xs font-medium text-gray-700">
                                  Amount (₹)
                                </label>
                                <input
                                  type="number"
                                  id={`installment-${index}-amount`}
                                  name={`feeDetails.installmentDetails[${index}].amount`}
                                  value={installment.amount}
                                  onChange={handleChange}
                                  min="0"
                                  step="0.01"
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label htmlFor={`installment-${index}-date`} className="block text-xs font-medium text-gray-700">
                                  Submission Date
                                </label>
                                <input
                                  type="date"
                                  id={`installment-${index}-date`}
                                  name={`feeDetails.installmentDetails[${index}].submissionDate`}
                                  value={installment.submissionDate?.split('T')[0] || ''}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`installment-${index}-paid`}
                                  name={`feeDetails.installmentDetails[${index}].paid`}
                                  checked={installment.paid}
                                  onChange={handleChange}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor={`installment-${index}-paid`} className="ml-2 block text-xs text-gray-700">
                                  Paid
                                </label>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  onClick={() => removeInstallment(index)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Exam Results Tab */}
                {activeTab === 'exams' && (
                  <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Exam Results
                        </h4>
                        <button
                          type="button"
                          onClick={addExamResult}
                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add Exam Result
                        </button>
                      </div>

                      {formData.examResults.length === 0 ? (
                        <p className="text-sm text-gray-500">No exam results added yet</p>
                      ) : (
                        <div className="space-y-4">
                          {formData.examResults.map((result, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-6 gap-4 bg-gray-50 p-3 rounded">
                              <div className="sm:col-span-2">
                                <label htmlFor={`exam-${index}-subjectCode`} className="block text-xs font-medium text-gray-700">
                                  Subject Code
                                </label>
                                <input
                                  type="text"
                                  id={`exam-${index}-subjectCode`}
                                  name={`examResults[${index}].subjectCode`}
                                  value={result.subjectCode}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor={`exam-${index}-subjectName`} className="block text-xs font-medium text-gray-700">
                                  Subject Name
                                </label>
                                <input
                                  type="text"
                                  id={`exam-${index}-subjectName`}
                                  name={`examResults[${index}].subjectName`}
                                  value={result.subjectName}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label htmlFor={`exam-${index}-theoryMarks`} className="block text-xs font-medium text-gray-700">
                                  Theory Marks
                                </label>
                                <input
                                  type="number"
                                  id={`exam-${index}-theoryMarks`}
                                  name={`examResults[${index}].theoryMarks`}
                                  value={result.theoryMarks}
                                  onChange={handleChange}
                                  min="0"
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label htmlFor={`exam-${index}-practicalMarks`} className="block text-xs font-medium text-gray-700">
                                  Practical Marks
                                </label>
                                <input
                                  type="number"
                                  id={`exam-${index}-practicalMarks`}
                                  name={`examResults[${index}].practicalMarks`}
                                  value={result.practicalMarks}
                                  onChange={handleChange}
                                  min="0"
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label htmlFor={`exam-${index}-totalMarks`} className="block text-xs font-medium text-gray-700">
                                  Total Marks
                                </label>
                                <input
                                  type="number"
                                  id={`exam-${index}-totalMarks`}
                                  name={`examResults[${index}].totalMarks`}
                                  value={result.totalMarks}
                                  onChange={handleChange}
                                  min="0"
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div>
                                <label htmlFor={`exam-${index}-examDate`} className="block text-xs font-medium text-gray-700">
                                  Exam Date
                                </label>
                                <input
                                  type="date"
                                  id={`exam-${index}-examDate`}
                                  name={`examResults[${index}].examDate`}
                                  value={result.examDate?.split('T')[0] || ''}
                                  onChange={handleChange}
                                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              <div className="sm:col-span-6 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => removeExamResult(index)}
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
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