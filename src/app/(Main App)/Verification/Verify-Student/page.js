"use client"
import { useState } from 'react';
import Head from 'next/head';

export default function StudentVerification() {
  const [formData, setFormData] = useState({
    rollNo: '',
    dateOfBirth: ''
  });
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('unverified'); // 'unverified', 'verified', 'not_found'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setStudent(null);
    setVerificationStatus('unverified');

    try {
      const response = await fetch('/api/varification/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStudent(data);
        setVerificationStatus('verified');
      } else {
        setError(data.message || 'Student not found');
        setVerificationStatus('not_found');
      }
    } catch (err) {
      setError('Failed to connect to server');
      setVerificationStatus('unverified');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e3f1f1] py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Student Verification Portal</title>
        <meta name="description" content="Verify student credentials" />
      </Head>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Student Verification Portal</h1>
          <p className="text-center text-blue-100 mt-2">
            Verify your student credentials securely
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">
                Roll Number
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your roll number"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : 'Verify'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {student && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="relative">
                <h2 className="text-lg font-medium text-gray-900">Student Details</h2>
                
                {verificationStatus === 'verified' && (
                  <div className="absolute top-0 right-0">
                    <div className="relative">
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white font-bold transform rotate-12">
                        <div className="text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xs block mt-1">VERIFIED</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-75"></div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="mt-1 text-sm font-medium">{student.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Father&apos;s Name</p>
                      <p className="mt-1 text-sm font-medium">{student.fatherName}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="mt-1 text-sm font-medium">{student.address}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="mt-1 text-sm font-medium">{student.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course Duration</p>
                      <p className="mt-1 text-sm font-medium">{student.courseDuration}</p>
                    </div>
                  </div>

                  {student.cretificate && (
                    <div>
                      <p className="text-sm text-gray-500">Certificate Status</p>
                      <p className="mt-1 text-sm font-medium text-green-600">
                        {student.cretificate === 'issued' ? 'Certificate Issued' : 'Certificate Pending'}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => {
                      setStudent(null);
                      setFormData({ rollNo: '', dateOfBirth: '' });
                      setVerificationStatus('unverified');
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Verify Another Student
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Educational Institution&apos;s. All rights reserved.</p>
      </footer>
    </div>
  );
}