// import { useState } from 'react';
// import axios from '../api/axios';
// import { UserPlus, X, Search } from 'lucide-react';

// const AddDoctorForm = ({ onSuccess, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [searchEmail, setSearchEmail] = useState('');
//   const [existingDoctor, setExistingDoctor] = useState(null);
//   const [searching, setSearching] = useState(false);
  
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     specialization: '',
//     licenseNumber: '',
//     qualification: '',
//     experience: '',
//     role: 'Permanent',
//     department: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//   };

//   const handleSearch = async () => {
//     if (!searchEmail) return;
    
//     setSearching(true);
//     setError('');
//     setExistingDoctor(null);

//     try {
//       const response = await axios.get(`/doctor/search?email=${searchEmail}`);
      
//       if (response.data.found) {
//         setExistingDoctor(response.data.doctor);
//         setSuccess('Doctor found! You can link them to your hospital.');
//       } else {
//         setError('Doctor not found. You can create a new account below.');
//       }
//     } catch (err) {
//       setError('Search failed. Please try again.');
//     } finally {
//       setSearching(false);
//     }
//   };

//   const handleLinkDoctor = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       await axios.post('/admin/link-doctor', {
//         doctorId: existingDoctor._id,
//         role: formData.role,
//         department: formData.department
//       });

//       setSuccess('Doctor linked successfully!');
//       setTimeout(() => {
//         onSuccess();
//         onClose();
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to link doctor');
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setLoading(true);

//   try {
//     await axios.post('/admin/add-doctor', formData);
    
//     setSuccess('Doctor added successfully!');
//     setTimeout(() => {
//       onSuccess();
//       onClose();
//     }, 1500);
//   } catch (err) {
//     // ✅ Better error handling
//     const errorMessage = err.response?.data?.message || 'Failed to add doctor';
    
//     if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
//       if (errorMessage.includes('email')) {
//         setError('This email is already registered. Please use a different email.');
//       } else if (errorMessage.includes('license')) {
//         setError('This license number already exists. Please use a different license number.');
//       } else {
//         setError('Doctor with this information already exists.');
//       }
//     } else {
//       setError(errorMessage);
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <UserPlus className="h-6 w-6 text-green-600" />
//             <h3 className="text-xl font-bold">Add Doctor</h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="p-6">
//           {/* Success Message */}
//           {success && (
//             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
//               {success}
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           {/* Search Section */}
//           <div className="mb-6 p-4 bg-blue-50 rounded-lg">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Search Existing Doctor (Optional)
//             </label>
//             <div className="flex space-x-2">
//               <input
//                 type="email"
//                 value={searchEmail}
//                 onChange={(e) => setSearchEmail(e.target.value)}
//                 placeholder="doctor@email.com"
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={searching || !searchEmail}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center space-x-2"
//               >
//                 <Search className="h-4 w-4" />
//                 <span>{searching ? 'Searching...' : 'Search'}</span>
//               </button>
//             </div>
//           </div>

//           {/* Existing Doctor Found */}
//           {existingDoctor && (
//             <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <h4 className="font-semibold text-lg mb-2">Doctor Found!</h4>
//               <p><strong>Name:</strong> {existingDoctor.name}</p>
//               <p><strong>Email:</strong> {existingDoctor.email}</p>
//               <p><strong>Specialization:</strong> {existingDoctor.specialization}</p>
//               <p className="text-sm text-gray-600 mt-2">
//                 Currently works at {existingDoctor.hospitals?.length || 0} hospital(s)
//               </p>

//               <div className="mt-4 grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Role
//                   </label>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   >
//                     <option value="Permanent">Permanent</option>
//                     <option value="Visiting">Visiting</option>
//                     <option value="Consultant">Consultant</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     placeholder="Cardiology"
//                   />
//                 </div>
//               </div>

//               <button
//                 onClick={handleLinkDoctor}
//                 disabled={loading}
//                 className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300"
//               >
//                 {loading ? 'Linking...' : 'Link Doctor to Hospital'}
//               </button>
//             </div>
//           )}

//           {/* Create New Doctor Form */}
//           {!existingDoctor && (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="Dr. John Smith"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="doctor@hospital.com"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Password *
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="••••••••"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Phone *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="1234567890"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Specialization *
//                   </label>
//                   <input
//                     type="text"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="Cardiologist"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     License Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="licenseNumber"
//                     value={formData.licenseNumber}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="DOC123456"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Qualification
//                   </label>
//                   <input
//                     type="text"
//                     name="qualification"
//                     value={formData.qualification}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="MBBS, MD"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Experience (years)
//                   </label>
//                   <input
//                     type="number"
//                     name="experience"
//                     value={formData.experience}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="10"
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Role
//                   </label>
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                   >
//                     <option value="Permanent">Permanent</option>
//                     <option value="Visiting">Visiting</option>
//                     <option value="Consultant">Consultant</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//                     placeholder="Cardiology"
//                   />
//                 </div>
//               </div>

//               <div className="flex space-x-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition"
//                 >
//                   {loading ? 'Adding...' : 'Add Doctor'}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddDoctorForm;

import { useState } from 'react';
import axios from '../api/axios';
import { UserPlus, X, Search, Eye, EyeOff } from 'lucide-react';

const AddDoctorForm = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [existingDoctor, setExistingDoctor] = useState(null);
  const [searching, setSearching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    qualification: '',
    experience: '',
    role: 'Permanent',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSearch = async () => {
    if (!searchEmail) return;
    
    setSearching(true);
    setError('');
    setExistingDoctor(null);

    try {
      const response = await axios.get(`/doctor/search?email=${searchEmail}`);
      
      if (response.data.found) {
        setExistingDoctor(response.data.doctor);
        setSuccess('Doctor found! You can link them to your hospital.');
      } else {
        setError('Doctor not found. You can create a new account below.');
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleLinkDoctor = async () => {
    setLoading(true);
    setError('');

    try {
      await axios.post('/admin/link-doctor', {
        doctorId: existingDoctor._id,
        role: formData.role,
        department: formData.department
      });

      setSuccess('Doctor linked successfully!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to link doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post('/admin/add-doctor', formData);
      
      setSuccess('Doctor added successfully!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add doctor';
      
      if (errorMessage.includes('duplicate') || errorMessage.includes('already exists')) {
        if (errorMessage.includes('email')) {
          setError('This email is already registered. Please use a different email.');
        } else if (errorMessage.includes('license')) {
          setError('This license number already exists. Please use a different license number.');
        } else {
          setError('Doctor with this information already exists.');
        }
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <UserPlus className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-bold">Add Doctor</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Search Section */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Existing Doctor (Optional)
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSearch}
                disabled={searching || !searchEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center space-x-2 transition-all"
              >
                <Search className="h-4 w-4" />
                <span>{searching ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </div>

          {/* Existing Doctor Found */}
          {existingDoctor && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-lg mb-3 text-green-800">Doctor Found!</h4>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700"><strong>Name:</strong> {existingDoctor.name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {existingDoctor.email}</p>
                <p className="text-gray-700"><strong>Specialization:</strong> {existingDoctor.specialization}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Currently works at {existingDoctor.hospitals?.length || 0} hospital(s)
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="Permanent">Permanent</option>
                    <option value="Visiting">Visiting</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleLinkDoctor}
                disabled={loading}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-all font-medium"
              >
                {loading ? 'Linking...' : 'Link Doctor to Hospital'}
              </button>
            </div>
          )}

          {/* Create New Doctor Form */}
          {!existingDoctor && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="Permanent">Permanent</option>
                    <option value="Visiting">Visiting</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {loading ? 'Adding...' : 'Add Doctor'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;