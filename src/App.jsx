import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing from './pages/Landing';
import HospitalSignup from './pages/HospitalSignup';
import HospitalLogin from './pages/HospitalLogin';
import DoctorLogin from './pages/DoctorLogin';
import PatientLogin from './pages/PatientLogin';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/hospital/signup" element={<HospitalSignup />} />
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient/login" element={<PatientLogin />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['hospital']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;