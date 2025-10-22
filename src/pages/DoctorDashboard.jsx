// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axios';
// import Navbar from '../components/Navbar';
// import { Users, FileText, Calendar, Activity } from 'lucide-react';

// const DoctorDashboard = () => {
//   const { user } = useAuth();
//   const [patients, setPatients] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctorData();
//   }, []);

//   const fetchDoctorData = async () => {
//     try {
//       // Fetch patients
//       const patientsResponse = await axios.get('/patient');
//       setPatients(patientsResponse.data);

//       // Fetch doctor's records
//       const recordsResponse = await axios.get(`/records/doctor/${user.id}`);
//       setRecords(recordsResponse.data);
//     } catch (error) {
//       console.error('Error fetching doctor data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-xl">Loading dashboard...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Welcome, Dr. {user?.name}!
//           </h1>
//           <p className="text-gray-600 mt-1">
//             {user?.specialization && `Specialization: ${user.specialization}`}
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Patients</p>
//                 <p className="text-3xl font-bold mt-1">{patients.length}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Users className="h-8 w-8 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Records Created</p>
//                 <p className="text-3xl font-bold mt-1">{records.length}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <FileText className="h-8 w-8 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Today's Appointments</p>
//                 <p className="text-3xl font-bold mt-1">0</p>
//               </div>
//               <div className="bg-orange-100 p-3 rounded-full">
//                 <Calendar className="h-8 w-8 text-orange-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Recent Records */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <Activity className="h-6 w-6 text-blue-600" />
//             <h2 className="text-2xl font-bold text-gray-900">Recent Medical Records</h2>
//           </div>

//           {records.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Patient
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Diagnosis
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {records.slice(0, 10).map((record) => (
//                     <tr key={record._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">
//                           {record.patientId?.name || 'Unknown'}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           Age: {record.patientId?.age || 'N/A'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900">{record.diagnosis}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(record.createdAt).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No records created yet</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import CreateRecordModal from '../components/CreateRecordModal';
import VoiceSearchModal from '../components/VoiceSearchModal';
import { Users, FileText, Calendar, Activity, Mic, Plus, Search } from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateRecord, setShowCreateRecord] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const fetchDoctorData = async () => {
    try {
      // Fetch patients
      const patientsResponse = await axios.get('/patient');
      setPatients(patientsResponse.data);

      // Fetch doctor's records
      const recordsResponse = await axios.get(`/records/doctor/${user.id}`);
      setRecords(recordsResponse.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecordCreated = () => {
    fetchDoctorData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, Dr. {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.specialization && `Specialization: ${user.specialization}`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Patients</p>
                <p className="text-3xl font-bold mt-1">{patients.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

<div className="bg-white p-6 rounded-xl shadow-md">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">Records Created</p>
      <p className="text-3xl font-bold mt-1">{records.length}</p>
    </div>
    <div className="bg-blue-100 p-3 rounded-full">
      <FileText className="h-8 w-8 text-blue-600" />
    </div>
  </div>
</div>


          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Today's Appointments</p>
                <p className="text-3xl font-bold mt-1">0</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setShowCreateRecord(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition text-white flex items-center space-x-4 group"
          >
            <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition">
              <Plus className="h-8 w-8" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold">Create Medical Record</h3>
              <p className="text-blue-100 text-sm">Manual or voice input</p>
            </div>
          </button>

          <button
            onClick={() => setShowVoiceSearch(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition text-white flex items-center space-x-4 group"
          >
            <div className="bg-white bg-opacity-20 p-4 rounded-full group-hover:bg-opacity-30 transition">
              <Mic className="h-8 w-8" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold">Voice Search Records</h3>
              <p className="text-purple-100 text-sm">Find patient files quickly</p>
            </div>
          </button>
        </div>

        {/* Recent Records */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Recent Medical Records</h2>
          </div>

          {records.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Diagnosis
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Files
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {records.slice(0, 10).map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.patientId?.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.patientId?.age}y | {record.patientId?.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{record.diagnosis}</div>
                        {record.voiceTranscript && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                            <Mic className="h-3 w-3 mr-1" />
                            Voice
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.files && record.files.length > 0 ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            📎 {record.files.length} file(s)
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">No files</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No records created yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Create your first medical record using the button above
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateRecord && (
        <CreateRecordModal
          onSuccess={handleRecordCreated}
          onClose={() => setShowCreateRecord(false)}
        />
      )}

      {showVoiceSearch && (
        <VoiceSearchModal
          onClose={() => setShowVoiceSearch(false)}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;