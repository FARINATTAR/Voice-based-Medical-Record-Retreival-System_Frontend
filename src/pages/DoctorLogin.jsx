import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { Stethoscope, ArrowLeft } from 'lucide-react';

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHospitalSelection, setShowHospitalSelection] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [doctorData, setDoctorData] = useState(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/doctor/login', formData);

      // Check if doctor has multiple hospitals
      if (response.data.requiresHospitalSelection) {
        setShowHospitalSelection(true);
        setHospitals(response.data.hospitals);
        setDoctorData({
          doctorId: response.data.doctorId,
          name: response.data.name
        });
        setLoading(false);
      } else {
        // Direct login (single hospital)
        login(response.data.user, response.data.token);
        navigate('/doctor/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  const handleHospitalSelect = async (hospitalId) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/doctor/select-hospital', {
        doctorId: doctorData.doctorId,
        hospitalId: hospitalId
      });

      // Login user
      login(response.data.user, response.data.token);
      navigate('/doctor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to select hospital');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Doctor Login</h2>
          <p className="text-gray-600 mt-2">
            {showHospitalSelection ? 'Select your hospital' : 'Access your portal'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Login Form */}
        {!showHospitalSelection ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="doctor@hospital.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          /* Hospital Selection */
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-4">
              Welcome, <span className="font-semibold">{doctorData?.name}</span>!<br />
              Please select which hospital you want to access:
            </p>
            
            {hospitals.map((hospital) => (
              <button
                key={hospital.hospitalId}
                onClick={() => handleHospitalSelect(hospital.hospitalId)}
                disabled={loading}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left disabled:opacity-50"
              >
                <div className="font-semibold text-lg">{hospital.hospitalName}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Role: {hospital.role} {hospital.department && `• ${hospital.department}`}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Info Message */}
        {!showHospitalSelection && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Your account is created by the hospital admin.
              Contact your hospital if you don't have credentials.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorLogin;