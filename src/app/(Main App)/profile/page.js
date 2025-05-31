'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import defaultProfilePic from '../../../../public/tom.gif'; 

const Profile = () => {
    const [studentData, setStudentData] = useState({});
    const [profilePic, setProfilePic] = useState(defaultProfilePic);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');
    const router = useRouter();

    // Format date in Indian format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    // Load student data from localStorage
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    const userData = parsedUser.student || parsedUser;
                    
                    // Format dates and process data
                    const formattedData = {
                        ...userData,
                        dateOfBirth: formatDate(userData.dateOfBirth),
                        joiningDate: formatDate(userData.joiningDate),
                        farewellDate: formatDate(userData.farewellDate),
                        createdAt: formatDate(userData.createdAt),
                        updatedAt: formatDate(userData.updatedAt),
                        feeDetails: userData.feeDetails ? {
                            ...userData.feeDetails,
                            installmentDetails: userData.feeDetails.installmentDetails?.map(installment => ({
                                ...installment,
                                submissionDate: formatDate(installment.submissionDate)
                            }))
                        } : null,
                        examResults: userData.examResults?.map(exam => ({
                            ...exam,
                            examDate: formatDate(exam.examDate)
                        }))
                    };
                    
                    setStudentData(formattedData);
                    
                    // Set profile picture - use Cloudinary URL if available
                    if (userData.photo?.url) {
                        setProfilePic(userData.photo.url);
                    }
                }
            } catch (error) {
                console.error('Error loading student data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Handle image loading errors
    const handleImageError = (e) => {
        e.target.src = defaultProfilePic.src;
    };

    // Render personal details section
    const renderPersonalDetails = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { key: 'fullName', label: 'Full Name' },
                { key: 'gender', label: 'Gender' },
                { key: 'fatherName', label: "Father's Name" },
                { key: 'motherName', label: "Mother's Name" },
                { key: 'parentsPhoneNumber', label: "Parents' Phone Number" },
                { key: 'dateOfBirth', label: 'Date of Birth' },
                { key: 'emailAddress', label: 'Email Address' },
                { key: 'phoneNumber', label: 'Phone Number' },
                { key: 'aadharNumber', label: 'Aadhar Number' },
                { key: 'address', label: 'Address' },
                { key: 'qualification', label: 'Qualification' },
                { key: 'joiningDate', label: 'Joining Date' },
                { key: 'farewellDate', label: 'Farewell Date' },
            ].map((item) => (
                <div key={item.key} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold">
                        {studentData[item.key] || 'N/A'}
                    </p>
                </div>
            ))}
        </div>
    );

    // Render course details section
    const renderCourseDetails = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
                { key: 'rollNo', label: 'Roll Number' },
                { key: 'selectedCourse', label: 'Course' },
                { key: 'courseDuration', label: 'Duration' },
                { key: 'certificationTitle', label: 'Certification' },
                { key: 'createdAt', label: 'Enrollment Date' },
                { key: 'finalGrade', label: 'Final Grade' },
                { key: 'certificate', label: 'Certificate Issued', format: (val) => val ? 'Yes' : 'No' },
            ].map((item) => (
                <div key={item.key} className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold">
                        {item.format ? item.format(studentData[item.key]) : (studentData[item.key] || 'N/A')}
                    </p>
                </div>
            ))}
        </div>
    );

    // Render fee details section
    const renderFeeDetails = () => {
        if (!studentData.feeDetails) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500">No fee details available</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Total Fees</p>
                        <p className="mt-1 text-lg font-semibold">
                            {studentData.feeDetails.totalFees ? `₹${studentData.feeDetails.totalFees}` : 'N/A'}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Remaining Fees</p>
                        <p className="mt-1 text-lg font-semibold">
                            {studentData.feeDetails.remainingFees ? `₹${studentData.feeDetails.remainingFees}` : 'N/A'}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">Installments</p>
                        <p className="mt-1 text-lg font-semibold">
                            {studentData.feeDetails.installments || 'N/A'}
                        </p>
                    </div>
                </div>

                {studentData.feeDetails.installmentDetails?.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium mb-4">Installment Details</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {studentData.feeDetails.installmentDetails.map((installment, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {installment.amount ? `₹${installment.amount}` : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {installment.submissionDate || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${installment.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
        );
    };

    // Render exam results section
    const renderExamResults = () => {
        if (!studentData.examResults || studentData.examResults.length === 0) {
            return (
                <div className="text-center py-8">
                    <p className="text-gray-500">No exam results available yet</p>
                    <button 
                        onClick={() => router.push('/Exams/Weekly-Exam')}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Take the final exam to see the result
                    </button>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Theory Marks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Practical Marks</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {studentData.examResults.map((exam, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subjectName || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.subjectCode || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.examDate || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.theoryMarks ?? 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.practicalMarks ?? 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    {(exam.theoryMarks || 0) + (exam.practicalMarks || 0)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-blue-50 py-8 px-4 sm:px-6 lg:px-8 pt-7"
        >
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="bg-white shadow-xl rounded-lg overflow-hidden"
                >
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="relative mb-4 md:mb-0 md:mr-6"
                            >
                                <img 
                                    src={profilePic.src} 
                                    alt="Profile" 
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                    onError={handleImageError}
                                />
                                <button
                                    onClick={() => router.push('/update-photo')}
                                    className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors"
                                    aria-label="Update profile photo"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </motion.div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold">{studentData.fullName || 'Student Profile'}</h1>
                                <p className="text-blue-100 mt-1">{studentData.selectedCourse || 'Course not specified'}</p>
                                <div className="flex items-center mt-2">
                                    <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                                        Roll No: {studentData.rollNo || 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Personal Details
                            </button>
                            <button
                                onClick={() => setActiveTab('course')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'course' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Course Details
                            </button>
                            <button
                                onClick={() => setActiveTab('fees')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'fees' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Fee Details
                            </button>
                            <button
                                onClick={() => setActiveTab('exams')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'exams' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Exam Results
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'personal' && renderPersonalDetails()}
                            {activeTab === 'course' && renderCourseDetails()}
                            {activeTab === 'fees' && renderFeeDetails()}
                            {activeTab === 'exams' && renderExamResults()}
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200">
                        <button 
                            onClick={() => router.push('/weekly-exam')}
                            className="mb-2 sm:mb-0 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                            </svg>
                            Weekly Exam
                        </button>
                        <div className="text-sm text-gray-500">
                            Last updated: {studentData.updatedAt || 'N/A'}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;