import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Activity } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  // Role-based gradient colors
  const getRoleGradient = () => {
    switch(user.role) {
      case 'hospital':
        return 'from-blue-600 to-blue-700';
      case 'doctor':
        return 'from-blue-600 to-indigo-600';
      case 'patient':
        return 'from-indigo-600 to-blue-700';
      default:
        return 'from-blue-600 to-blue-700';
    }
  };

  const getRoleBadgeColor = () => {
    switch(user.role) {
      case 'hospital':
        return 'bg-blue-500/20 text-blue-100 border-blue-400/30';
      case 'doctor':
        return 'bg-indigo-500/20 text-indigo-100 border-indigo-400/30';
      case 'patient':
        return 'bg-purple-500/20 text-purple-100 border-purple-400/30';
      default:
        return 'bg-blue-500/20 text-blue-100 border-blue-400/30';
    }
  };

  return (
    <nav className={`bg-gradient-to-r ${getRoleGradient()} text-white shadow-2xl relative overflow-hidden`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo/Title */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Medical Voice System</h1>
              <div className={`inline-flex items-center space-x-2 mt-1 px-3 py-1 rounded-full border ${getRoleBadgeColor()} backdrop-blur-sm`}>
                <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></div>
                <p className="text-xs font-bold tracking-wide">
                  {user.role === 'hospital' && 'HOSPITAL ADMIN'}
                  {user.role === 'doctor' && 'DOCTOR PORTAL'}
                  {user.role === 'patient' && 'PATIENT PORTAL'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: User Info + Logout */}
          <div className="flex items-center space-x-6">
            {/* User Info Card */}
            <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-xl border border-white/20 shadow-lg">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-md opacity-30"></div>
                <div className="relative bg-white/20 p-2 rounded-full border border-white/30">
                  <User className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs text-white/70 font-medium">{user.email}</p>
              </div>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group relative flex items-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LogOut className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" strokeWidth={2.5} />
              <span className="font-bold text-white hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
    </nav>
  );
};

export default Navbar;