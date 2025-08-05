'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiChevronLeft, 
  FiChevronRight, 
  FiUser, 
  FiPhone, 
  FiBook, 
  FiCalendar, 
  FiLoader,
  FiPlus,
  FiRefreshCw,
  FiChevronsLeft,
  FiChevronsRight
} from 'react-icons/fi';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import Image from 'next/image';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStudents: 0,
    limit: 20,
  });
  const [sortConfig, setSortConfig] = useState({
    field: 'rollNo',
    direction: 'asc'
  });

  // Fetch students with pagination, search, and sorting
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/admin/student/view-all-students?page=${pagination.currentPage}&search=${debouncedSearchTerm}&sort=${sortConfig.field}&order=${sortConfig.direction}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        
        const data = await response.json();
        
        if (data.success) {
          setStudents(data.data);
          setPagination(prev => ({
            ...prev,
            totalPages: data.pagination.totalPages,
            totalStudents: data.pagination.totalStudents,
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [pagination.currentPage, debouncedSearchTerm, sortConfig]);

  // Reset to page 1 when search term or sort changes
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearchTerm, sortConfig]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSort = (field) => {
    let direction = 'asc';
    if (sortConfig.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ field, direction });
  };

  const refreshData = () => {
    setPagination(prev => ({ ...prev }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const sortIcon = (field) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Handle photo display
  const renderStudentPhoto = (student) => {
    if (student.photo?.url) {
      return (
        <Image
          src={student.photo.url}
          alt={student.fullName}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          unoptimized={true} // Bypass Next.js image optimization if needed
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-user.png'; // Fallback image
          }}
        />
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
        <FiUser className="text-gray-500 text-2xl" />
      </div>
    );
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-blue-500 mb-2">Student Management</h1>
            <p className="text-gray-600">
              {pagination.totalStudents} students found
            </p>
          </div>
          <Link 
            href="/admin/student/add" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiPlus /> Add New Student
          </Link>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, roll no, or phone..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={refreshData}
                disabled={loading}
                className={`p-2 rounded-lg ${loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                <FiRefreshCw className={loading ? "animate-spin" : ""} />
              </button>
              
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.currentPage === 1 || loading}
                className={`p-2 rounded-lg ${pagination.currentPage === 1 || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                <FiChevronsLeft size={20} />
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1 || loading}
                className={`p-2 rounded-lg ${pagination.currentPage === 1 || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                <FiChevronLeft size={20} />
              </button>
              
              <span className="text-gray-700 px-2">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages || loading}
                className={`p-2 rounded-lg ${pagination.currentPage === pagination.totalPages || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                <FiChevronRight size={20} />
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages || loading}
                className={`p-2 rounded-lg ${pagination.currentPage === pagination.totalPages || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
              >
                <FiChevronsRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Student List */}
        {!loading && (
          <>
            {/* Sort Controls */}
            <div className="mb-4 flex flex-wrap gap-2">
              <button 
                onClick={() => handleSort('fullName')}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
              >
                Name {sortIcon('fullName')}
              </button>
              <button 
                onClick={() => handleSort('rollNo')}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
              >
                Roll No {sortIcon('rollNo')}
              </button>
              <button 
                onClick={() => handleSort('joiningDate')}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
              >
                Joining Date {sortIcon('joiningDate')}
              </button>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {students.length > 0 ? (
                  students.map((student) => (
                    <motion.div
                      key={student._id}
                      variants={itemVariants}
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                      className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-200 cursor-pointer hover:border-blue-300"
                    >
                      <div className="p-5">
                        <div className="flex items-center mb-4">
                          <div className="w-25 h-25 overflow-hidden mr-4 border border-gray-200">
                            {renderStudentPhoto(student)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                              {student.fullName}
                            </h3>
                            <p className="text-gray-500 text-sm">Roll: {student.rollNo}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <FiPhone className="mr-2 text-blue-500" />
                            <span className="text-sm">{student.phoneNumber}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <FiPhone className="mr-2 text-blue-500" />
                            <span className="text-sm">Parent: {student.parentsPhoneNumber}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <FiBook className="mr-2 text-blue-500" />
                            <span className="text-sm">{student.selectedCourse}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <FiCalendar className="mr-2 text-blue-500" />
                            <span className="text-sm">
                            {new Date(student.joiningDate).toLocaleDateString()} -{' '}
                              {student.farewellDate ? new Date(student.farewellDate).toLocaleDateString() : 'Present'}

                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-12 text-center"
                  >
                    <div className="text-gray-500">
                      No students found{debouncedSearchTerm ? ` for "${debouncedSearchTerm}"` : ''}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {/* Pagination */}
        {!loading && students.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-sm text-gray-600">
              Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.limit, pagination.totalStudents)} of{' '}
              {pagination.totalStudents} students
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.currentPage === 1}
                className={`px-3 py-1 rounded ${pagination.currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
              >
                First
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${pagination.currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
                className={`px-3 py-1 rounded ${pagination.currentPage === pagination.totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
              >
                Last
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;