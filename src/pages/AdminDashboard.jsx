// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from '../api/axios';
// import Navbar from '../components/Navbar';
// import StatsCard from '../components/StatsCard';
// import AddDoctorForm from '../components/AddDoctorForm';
// import AddPatientForm from '../components/AddPatientForm';
// import { 
//   Users, 
//   UserRound, 
//   FileText, 
//   Calendar,
//   Plus,
//   Activity,
//   Stethoscope
// } from 'lucide-react';

// const AdminDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     doctors: 0,
//     patients: 0,
//     records: 0,
//     appointments: 0
//   });
//   const [recentActivity, setRecentActivity] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddDoctor, setShowAddDoctor] = useState(false);
//   const [showAddPatient, setShowAddPatient] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Fetch stats
//       const statsResponse = await axios.get('/admin/stats');
//       setStats(statsResponse.data);

//       // Fetch recent activity
//       const activityResponse = await axios.get('/admin/recent');
//       setRecentActivity(activityResponse.data);
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDoctorAdded = () => {
//     fetchDashboardData();
//   };

//   const handlePatientAdded = () => {
//     fetchDashboardData();
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
//             Welcome back, {user?.name}!
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Here's what's happening in your hospital today
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatsCard
//             title="Total Doctors"
//             value={stats.doctors}
//             icon={Stethoscope}
//             color="blue"
//           />
//           <StatsCard
//             title="Total Patients"
//             value={stats.patients}
//             icon={Users}
//             color="green"
//           />
//           <StatsCard
//             title="Medical Records"
//             value={stats.records}
//             icon={FileText}
//             color="purple"
//           />
//           <StatsCard
//             title="Appointments"
//             value={stats.appointments}
//             icon={Calendar}
//             color="orange"
//           />
//         </div>

//         {/* Quick Actions */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">
//           <button
//             onClick={() => setShowAddDoctor(true)}
//             className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center space-x-4 group"
//           >
//             <div className="bg-green-100 p-4 rounded-full group-hover:bg-green-200 transition">
//               <Plus className="h-8 w-8 text-green-600" />
//             </div>
//             <div className="text-left">
//               <h3 className="text-xl font-semibold text-gray-900">Add Doctor</h3>
//               <p className="text-gray-600">Register a new doctor to your hospital</p>
//             </div>
//           </button>

//           <button
//             onClick={() => setShowAddPatient(true)}
//             className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex items-center space-x-4 group"
//           >
//             <div className="bg-purple-100 p-4 rounded-full group-hover:bg-purple-200 transition">
//               <Plus className="h-8 w-8 text-purple-600" />
//             </div>
//             <div className="text-left">
//               <h3 className="text-xl font-semibold text-gray-900">Add Patient</h3>
//               <p className="text-gray-600">Register a new patient (walk-in)</p>
//             </div>
//           </button>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center space-x-3 mb-6">
//             <Activity className="h-6 w-6 text-blue-600" />
//             <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
//           </div>

//           {recentActivity.length > 0 ? (
//             <div className="space-y-4">
//               {recentActivity.map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   <div className="bg-blue-100 p-2 rounded-full">
//                     <FileText className="h-5 w-5 text-blue-600" />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium text-gray-900">{activity.type}</p>
//                     <p className="text-sm text-gray-600">{activity.description}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {new Date(activity.date).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-gray-500">No recent activity</p>
//               <p className="text-sm text-gray-400">
//                 Activity will appear here once you start managing records
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {showAddDoctor && (
//         <AddDoctorForm
//           onSuccess={handleDoctorAdded}
//           onClose={() => setShowAddDoctor(false)}
//         />
//       )}

//       {showAddPatient && (
//         <AddPatientForm
//           onSuccess={handlePatientAdded}
//           onClose={() => setShowAddPatient(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import StatsCard from '../components/StatsCard';
import AddDoctorForm from '../components/AddDoctorForm';
import AddPatientForm from '../components/AddPatientForm';
import { 
  Users, 
  UserRound, 
  FileText, 
  Calendar,
  Plus,
  Activity,
  Stethoscope,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    records: 0,
    appointments: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsResponse = await axios.get('/admin/stats');
      setStats(statsResponse.data);

      const activityResponse = await axios.get('/admin/recent');
      setRecentActivity(activityResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorAdded = () => {
    fetchDashboardData();
  };

  const handlePatientAdded = () => {
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping opacity-75"></div>
            <div className="relative border-4 border-blue-600 border-t-transparent rounded-full w-20 h-20 animate-spin"></div>
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Dashboard Overview</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xl text-gray-600">
            Manage your hospital operations efficiently from one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                <Stethoscope className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Doctors</p>
              <p className="text-4xl font-bold text-gray-900">{stats.doctors}</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-2xl group-hover:bg-green-600 transition-colors duration-300">
                <Users className="h-7 w-7 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Patients</p>
              <p className="text-4xl font-bold text-gray-900">{stats.patients}</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-2xl group-hover:bg-purple-600 transition-colors duration-300">
                <FileText className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Medical Records</p>
              <p className="text-4xl font-bold text-gray-900">{stats.records}</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-2xl group-hover:bg-orange-600 transition-colors duration-300">
                <Calendar className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Appointments</p>
              <p className="text-4xl font-bold text-gray-900">{stats.appointments}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setShowAddDoctor(true)}
            className="group relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Plus className="h-10 w-10 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">Add Doctor</h3>
                  <p className="text-green-50">Register a new doctor to your hospital</p>
                </div>
              </div>
              <ArrowRight className="h-8 w-8 text-white group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>

          <button
            onClick={() => setShowAddPatient(true)}
            className="group relative bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                  <Plus className="h-10 w-10 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-1">Add Patient</h3>
                  <p className="text-purple-50">Register a new patient (walk-in)</p>
                </div>
              </div>
              <ArrowRight className="h-8 w-8 text-white group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center space-x-3 mb-8 pb-6 border-b-2 border-gray-100">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-gray-500 mt-1">Latest updates from your hospital</p>
            </div>
          </div>

          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-5 p-6 bg-gray-50 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-blue-200"
                >
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                    <FileText className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg mb-1">{activity.type}</p>
                    <p className="text-gray-600 mb-2">{activity.description}</p>
                    <p className="text-sm text-gray-400 font-medium">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex p-6 bg-gray-100 rounded-3xl mb-6">
                <Activity className="h-16 w-16 text-gray-300" />
              </div>
              <p className="text-2xl font-bold text-gray-400 mb-2">No recent activity</p>
              <p className="text-gray-500 text-lg">
                Activity will appear here once you start managing records
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddDoctor && (
        <AddDoctorForm
          onSuccess={handleDoctorAdded}
          onClose={() => setShowAddDoctor(false)}
        />
      )}

      {showAddPatient && (
        <AddPatientForm
          onSuccess={handlePatientAdded}
          onClose={() => setShowAddPatient(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;