`use client`
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


const AddStaff = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Name: '',
    JoinningData: '',
    Designation: '',
    DOB: '',
    FatherName: '',
    Address: '',
    LeavingDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [generatedStaffId, setGeneratedStaffId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowPopup(false);

    try {
      const payload = { ...formData };
      if (!payload.LeavingDate) delete payload.LeavingDate;

      const response = await ('/staff', payload);
      setGeneratedStaffId(response.data.StaffID);
      setShowPopup(true);
      setFormData({
        Name: '',
        JoinningData: '',
        Designation: '',
        DOB: '',
        FatherName: '',
        Address: '',
        LeavingDate: '',
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add staff');
      console.error('Error adding staff:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToHome = () => router.push('/skillup');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-blue-100 px-4 py-6">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-6">
          Add New Staff Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {[
            { label: 'Name', name: 'Name', type: 'text', required: true },
            { label: 'Joining Date', name: 'JoinningData', type: 'date', required: true },
            { label: 'Designation', name: 'Designation', type: 'text', required: true },
            { label: 'Date of Birth', name: 'DOB', type: 'date', required: true },
            { label: "Father's Name", name: 'FatherName', type: 'text', required: true },
            { label: 'Address', name: 'Address', type: 'text', required: true },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-600 text-sm font-semibold mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={formData[field.name]}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">
              Leaving Date (Optional)
            </label>
            <input
              type="date"
              name="LeavingDate"
              className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={formData.LeavingDate}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Add Staff'
            )}
          </button>
        </form>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
              <p className="text-gray-700 mb-6">
                New staff member <strong>{formData.Name || 'Staff'}</strong> has been added
                successfully. {generatedStaffId && `Staff ID: ${generatedStaffId}`}
              </p>
              <button
                onClick={handleGoToHome}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStaff;