import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiBook, FiUser, FiCalendar, FiCheck, FiX, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddStudentMarks = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    rollNo: '',
    subjectCode: '',
    theoryMarks: '',
    practicalMarks: '',
    examDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState(null);

  // Fetch student data when rollNo changes
  useEffect(() => {
    const fetchStudent = async () => {
      if (!formData.rollNo) return;
      
      try {
        setSearchLoading(true);
        const response = await axios.get(`/api/students?rollNo=${formData.rollNo}`);
        
        if (response.data) {
          setStudent(response.data);
          toast.success('Student found!');
          
          // Get available subjects (not already in examResults)
          const takenSubjects = response.data.examResults.map(r => r.subjectCode);
          const certificationSubjects = CERTIFICATION_SUBJECTS[response.data.certificationTitle] || {};
          
          const available = Object.entries(certificationSubjects)
            .filter(([code]) => !takenSubjects.includes(code))
            .map(([code, name]) => ({ code, name }));
          
          setAvailableSubjects(available);
        } else {
          setStudent(null);
          toast.error('Student not found');
        }
      } catch (error) {
        console.error('Error fetching student:', error);
        toast.error('Error fetching student data');
        setStudent(null);
      } finally {
        setSearchLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchStudent, 500);
    return () => clearTimeout(debounceTimer);
  }, [formData.rollNo]);

  // Update subject details when subjectCode changes
  useEffect(() => {
    if (formData.subjectCode && SUBJECTS[formData.subjectCode]) {
      setSubjectDetails(SUBJECTS[formData.subjectCode]);
    } else {
      setSubjectDetails(null);
    }
  }, [formData.subjectCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.rollNo) newErrors.rollNo = 'Roll number is required';
    if (!student) newErrors.rollNo = 'Please find a valid student first';
    if (!formData.subjectCode) newErrors.subjectCode = 'Subject is required';
    
    if (formData.theoryMarks !== '') {
      const theoryNum = Number(formData.theoryMarks);
      if (isNaN(theoryNum)){
        newErrors.theoryMarks = 'Must be a number';
      } else if (subjectDetails && (theoryNum < 0 || theoryNum > subjectDetails.maxTheoryMarks)) {
        newErrors.theoryMarks = `Must be between 0-${subjectDetails.maxTheoryMarks}`;
      }
    }
    
    if (formData.practicalMarks !== '') {
      const practicalNum = Number(formData.practicalMarks);
      if (isNaN(practicalNum)) {
        newErrors.practicalMarks = 'Must be a number';
      } else if (subjectDetails && (practicalNum < 0 || practicalNum > subjectDetails.maxPracticalMarks)) {
        newErrors.practicalMarks = `Must be between 0-${subjectDetails.maxPracticalMarks}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    try {
      setLoading(true);
      
      const submissionData = {
        rollNo: formData.rollNo,
        subjectCode: formData.subjectCode,
        theoryMarks: formData.theoryMarks !== '' ? Number(formData.theoryMarks) : null,
        practicalMarks: formData.practicalMarks !== '' ? Number(formData.practicalMarks) : null,
        examDate: formData.examDate
      };
      
      const response = await axios.post('/api/students/add-marks', submissionData);
      
      if (response.status === 200) {
        toast.success('Marks added successfully!');
        // Reset form for next entry
        setFormData(prev => ({
          ...prev,
          subjectCode: '',
          theoryMarks: '',
          practicalMarks: ''
        }));
        // Refresh student data to show updated results
        const studentResponse = await axios.get(`/api/students?rollNo=${formData.rollNo}`);
        setStudent(studentResponse.data);
      }
    } catch (error) {
      console.error('Error adding marks:', error);
      const errorMsg = error.response?.data?.error || 'Failed to add marks';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Add Student Marks</h1>
          <p className="opacity-90">Enter examination results for students</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Search Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
              <FiUser className="mr-2" /> Student Information
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Student Roll Number *</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.rollNo ? 'border-red-500' : 'border'}`}
                    placeholder="Enter student roll number"
                  />
                  {searchLoading && (
                    <div className="absolute right-3 top-2.5">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
                {errors.rollNo && <p className="mt-1 text-sm text-red-600">{errors.rollNo}</p>}
              </div>
              
              {student && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Student Found</label>
                  <div className="mt-1 p-2 bg-green-50 rounded-md border border-green-200">
                    <p className="text-sm font-medium text-green-800">
                      {student.fullName} - {student.certificationTitle}
                    </p>
                    <p className="text-xs text-green-600">
                      Completed {student.examResults.length} of {availableSubjects.length + student.examResults.length} subjects
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Marks Entry Section */}
          {student && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 flex items-center">
                <FiBook className="mr-2" /> Marks Entry
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject *</label>
                  <select
                    name="subjectCode"
                    value={formData.subjectCode}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.subjectCode ? 'border-red-500' : 'border'}`}
                    disabled={availableSubjects.length === 0}
                  >
                    <option value="">Select Subject</option>
                    {availableSubjects.map((subject) => (
                      <option key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </option>
                    ))}
                  </select>
                  {errors.subjectCode && <p className="mt-1 text-sm text-red-600">{errors.subjectCode}</p>}
                  {availableSubjects.length === 0 && student.examResults.length > 0 && (
                    <p className="mt-1 text-sm text-yellow-600">
                      All subjects already have marks assigned
                    </p>
                  )}
                </div>
                
                {/* Exam Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Exam Date</label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      name="examDate"
                      value={formData.examDate}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border"
                    />
                    <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Marks Input */}
              {formData.subjectCode && subjectDetails && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                >
                  {/* Theory Marks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Theory Marks (Max: {subjectDetails.maxTheoryMarks})
                    </label>
                    <input
                      type="number"
                      name="theoryMarks"
                      value={formData.theoryMarks}
                      onChange={handleChange}
                      min="0"
                      max={subjectDetails.maxTheoryMarks}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.theoryMarks ? 'border-red-500' : 'border'}`}
                      placeholder={`Enter theory marks (0-${subjectDetails.maxTheoryMarks})`}
                    />
                    {errors.theoryMarks && <p className="mt-1 text-sm text-red-600">{errors.theoryMarks}</p>}
                  </div>
                  
                  {/* Practical Marks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Practical Marks (Max: {subjectDetails.maxPracticalMarks})
                    </label>
                    <input
                      type="number"
                      name="practicalMarks"
                      value={formData.practicalMarks}
                      onChange={handleChange}
                      min="0"
                      max={subjectDetails.maxPracticalMarks}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${errors.practicalMarks ? 'border-red-500' : 'border'}`}
                      placeholder={`Enter practical marks (0-${subjectDetails.maxPracticalMarks})`}
                    />
                    {errors.practicalMarks && <p className="mt-1 text-sm text-red-600">{errors.practicalMarks}</p>}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
          
          {/* Submit Button */}
          {student && formData.subjectCode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end pt-6"
            >
              <button
                type="submit"
                disabled={loading || availableSubjects.length === 0}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Add Marks'
                )}
              </button>
            </motion.div>
          )}
        </form>
      </motion.div>
      
      {/* Student Results Display */}
      {student && student.examResults.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-xl font-bold">Student Results</h2>
            <p className="opacity-90">Current examination results for {student.fullName}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Theory
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Practical
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {student.examResults.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.subjectCode} - {result.subjectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.theoryMarks !== null ? result.theoryMarks : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.practicalMarks !== null ? result.practicalMarks : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {result.totalMarks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(result.examDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {student.finalGrade !== 'Pending' && (
            <div className="p-4 bg-blue-50 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-800">Final Grade:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  student.finalGrade === 'A' ? 'bg-green-100 text-green-800' :
                  student.finalGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                  student.finalGrade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                  student.finalGrade === 'D' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {student.finalGrade}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// Certification subjects mapping (should match your backend)
const CERTIFICATION_SUBJECTS = {
  "CERTIFICATION IN COMPUTER APPLICATION": {
    "CS-01": "Basic Computer",
    "CS-02": "Windows Application: MS Office",
    "CS-03": "Operating System",
    "CS-04": "Web Publisher: Internet Browsing"
  },
  "DIPLOMA IN COMPUTER APPLICATION": {
    "CS-01": "Basic Computer",
    "CS-02": "Windows Application: MS Office",
    "CS-03": "Operating System",
    "CS-04": "Web Publisher: Internet Browsing",
    "CS-05": "Computer Accountancy: Tally"
  },
  "ADVANCE DIPLOMA IN COMPUTER APPLICATION": {
    "CS-01": "Basic Computer",
    "CS-02": "Windows Application: MS Office",
    "CS-03": "Operating System",
    "CS-05": "Computer Accountancy: Tally",
    "CS-06": "Desktop Publishing: Photoshop"
  },
  "CERTIFICATION IN COMPUTER ACCOUNTANCY": {
    "CS-01": "Basic Computer",
    "CS-02": "Windows Application: MS Office",
    "CS-07": "Computerized Accounting With Tally",
    "CS-08": "Manual Accounting"
  },
  "DIPLOMA IN COMPUTER ACCOUNTANCY": {
    "CS-01": "Basic Computer",
    "CS-02": "Windows Application: MS Office",
    "CS-07": "Computerized Accounting With Tally",
    "CS-08": "Manual Accounting",
    "CS-09": "Tally ERP 9 & Tally Prime"
  }
};

// Subject details with max marks (should match your backend)
const SUBJECTS = {
  "CS-01": { subjectName: "Basic Computer", maxTheoryMarks: 100, maxPracticalMarks: 0 },
  "CS-02": { subjectName: "Windows Application: MS Office", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-03": { subjectName: "Operating System", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-04": { subjectName: "Web Publisher: Internet Browsing", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-05": { subjectName: "Computer Accountancy: Tally", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-06": { subjectName: "Desktop Publishing: Photoshop", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-07": { subjectName: "Computerized Accounting With Tally", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-08": { subjectName: "Manual Accounting", maxTheoryMarks: 40, maxPracticalMarks: 60 },
  "CS-09": { subjectName: "Tally ERP 9 & Tally Prime", maxTheoryMarks: 40, maxPracticalMarks: 60 }
};

export default AddStudentMarks;