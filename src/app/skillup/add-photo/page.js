'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch, FiUser, FiPhone, FiMail, FiCalendar, FiEdit2, FiCheck, FiX, FiBook, FiDollarSign, FiHome, FiAward, FiUsers } from 'react-icons/fi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentProfile = () => {
  const [searchType, setSearchType] = useState('rollNo');
  const [searchValue, setSearchValue] = useState('');
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const rollNo = searchParams.get('rollNo');
    const phoneNumber = searchParams.get('phoneNumber');
    
    if (rollNo) {
      setSearchType('rollNo');
      setSearchValue(rollNo);
      fetchStudent('rollNo', rollNo);
    } else if (phoneNumber) {
      setSearchType('phoneNumber');
      setSearchValue(phoneNumber);
      fetchStudent('phoneNumber', phoneNumber);
    }
  }, [searchParams]);

  const fetchStudent = async (type, value) => {
    if (!value) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/student/add-student-photo?${type}=${value}`);
      const data = await res.json();
      
      if (res.ok) {
        setStudent(data.data);
        // Handle photo data which might be stringified JSON
        if (data.data.photo) {
          try {
            const photoData = typeof data.data.photo === 'string' 
              ? JSON.parse(data.data.photo) 
              : data.data.photo;
            setPhotoPreview(photoData.url);
          } catch (parseError) {
            console.error('Error parsing photo data:', parseError);
            setPhotoPreview(null);
          }
        } else {
          setPhotoPreview(null);
        }
        toast.success('Student found!');
      } else {
        toast.error(data.error || 'Student not found');
        setStudent(null);
        setPhotoPreview(null);
      }
    } catch (fetchError) {
      toast.error('Failed to fetch student');
      console.error('Fetch error:', fetchError);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`?${searchType}=${searchValue}`);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async () => {
    if (!photo || !student) return;
    
    try {
      const formData = new FormData();
      formData.append('rollNo', student.rollNo);
      formData.append('photo', photo);
      
      const res = await fetch('/api/admin/student/add-student-photo', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Update both student data and photo preview
        const updatedStudent = { ...student, photo: data.data };
        setStudent(updatedStudent);
        setPhotoPreview(data.data.url);
        toast.success('Photo updated successfully!');
        setIsEditingPhoto(false);
        setPhoto(null);
      } else {
        throw new Error(data.error || 'Failed to update photo');
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
      // Revert to original photo if upload fails
      if (student.photo) {
        const originalPhoto = typeof student.photo === 'string' 
          ? JSON.parse(student.photo) 
          : student.photo;
        setPhotoPreview(originalPhoto.url);
      }
    }
  };

  const cancelPhotoEdit = () => {
    setIsEditingPhoto(false);
    setPhoto(null);
    if (student?.photo) {
      const photoData = typeof student.photo === 'string' 
        ? JSON.parse(student.photo) 
        : student.photo;
      setPhotoPreview(photoData.url);
    } else {
      setPhotoPreview(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calculateAge = (dobString) => {
    if (!dobString) return '';
    const dob = new Date(dobString);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Helper function to safely get photo URL
  const getPhotoUrl = () => {
    if (photoPreview) return photoPreview;
    if (!student?.photo) return null;
    
    try {
      const photoData = typeof student.photo === 'string' 
        ? JSON.parse(student.photo) 
        : student.photo;
      return photoData.url;
    } catch (error) {
      console.error('Error parsing photo data:', error);
      return null;
    }
  };

  const photoUrl = getPhotoUrl();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">Student Profile</h1>
        
        {/* Search Form */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1">
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="bg-transparent outline-none text-gray-700 mr-2"
              >
                <option value="rollNo">Roll Number</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="aadharNumber">Aadhar Number</option>
              </select>
              <input
                type={searchType === 'phoneNumber' || searchType === 'aadharNumber' ? 'tel' : 'text'}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Enter ${searchType === 'rollNo' ? 'Roll Number' : searchType === 'phoneNumber' ? 'Phone Number' : 'Aadhar Number'}`}
                className="bg-transparent outline-none flex-1"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : (
                <>
                  <FiSearch /> Search
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Student Profile */}
        {student && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          >
            <div className="md:flex">
              {/* Photo Section */}
              <div className="md:w-1/3 bg-indigo-50 p-6 flex flex-col items-center">
                <div className="relative mb-4">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={`${student.fullName}'s profile`}
                      className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-48 h-48 rounded-full bg-indigo-200 flex items-center justify-center border-4 border-white shadow-md">
                      <FiUser className="text-indigo-500 text-6xl" />
                    </div>
                  )}
                  
                  {isEditingPhoto ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-2 left-0 right-0 flex justify-center gap-2"
                    >
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="bg-white text-indigo-600 px-3 py-1 rounded-full text-sm shadow-md cursor-pointer hover:bg-indigo-50 transition-colors flex items-center gap-1"
                      >
                        <FiEdit2 size={14} /> Choose
                      </label>
                      {photo && (
                        <>
                          <button
                            onClick={uploadPhoto}
                            className="bg-green-500 text-white px-3 py-1 rounded-full text-sm shadow-md hover:bg-green-600 transition-colors flex items-center gap-1"
                          >
                            <FiCheck size={14} /> Save
                          </button>
                          <button
                            onClick={cancelPhotoEdit}
                            className="bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow-md hover:bg-red-600 transition-colors flex items-center gap-1"
                          >
                            <FiX size={14} /> Cancel
                          </button>
                        </>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditingPhoto(true)}
                      className="absolute -bottom-2 left-0 right-0 mx-auto bg-indigo-600 text-white px-4 py-1 rounded-full text-sm shadow-md hover:bg-indigo-700 transition-colors w-max flex items-center gap-1"
                    >
                      <FiEdit2 size={14} /> Edit Photo
                    </motion.button>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-center text-gray-800">{student.fullName}</h2>
                <p className="text-indigo-600 font-medium">{student.rollNo}</p>
                
                <div className="mt-4 w-full space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMail />
                    <span>{student.emailAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiPhone />
                    <span>{student.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiAward />
                    <span>{student.certificationTitle || student.selectedCourse}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiCalendar />
                    <span>{student.courseDuration}</span>
                  </div>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="md:w-2/3 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="col-span-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <FiUser /> Personal Information
                    </h3>
                    <DetailCard icon={<FiUser />} title="Full Name" value={student.fullName} />
                    <DetailCard icon={<FiCalendar />} title="Date of Birth" value={`${formatDate(student.dateOfBirth)} (${calculateAge(student.dateOfBirth)} years)`} />
                    <DetailCard icon={<FiUser />} title="Gender" value={student.gender} />
                    <DetailCard icon={<FiUsers />} title="Father's Name" value={student.fatherName} />
                    <DetailCard icon={<FiUsers />} title="Mother's Name" value={student.motherName} />
                  </div>

                  {/* Academic Information */}
                  <div className="col-span-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                      <FiBook /> Academic Information
                    </h3>
                    <DetailCard icon={<FiBook />} title="Selected Course" value={student.selectedCourse} />
                    <DetailCard icon={<FiCalendar />} title="Course Duration" value={student.courseDuration} />
                    <DetailCard icon={<FiCalendar />} title="Joining Date" value={formatDate(student.joiningDate)} />
                    <DetailCard icon={<FiCalendar />} title="Farewell Date" value={formatDate(student.farewellDate)} />
                    <DetailCard icon={<FiHome />} title="Address" value={student.address} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

const DetailCard = ({ icon, title, value }) => {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-gray-50 p-3 rounded-lg mb-3"
    >
      <div className="flex items-center gap-2 text-indigo-600 mb-1">
        {icon}
        <span className="font-medium text-gray-700">{title}</span>
      </div>
      <p className="text-gray-600 ml-6">{value || 'Not provided'}</p>
    </motion.div>
  );
};

export default StudentProfile;