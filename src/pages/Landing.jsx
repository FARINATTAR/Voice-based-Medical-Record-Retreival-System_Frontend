import { useState, useEffect } from 'react';
import { Building2, UserRound, Stethoscope, Activity, Shield, Zap, Users, ChevronRight, Lock, Award, Heart, Brain, Cloud, Star } from 'lucide-react';

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Mouse Follower Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 80%)`
        }}
      />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.7s ease-out forwards; }
      `}</style>

      {/* Header */}
      <header className="relative z-40 bg-white/80 backdrop-blur-xl border-b border-blue-200/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-2 sm:p-3 rounded-2xl shadow-xl">
                  <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-blue-900">
                  Medical Voice System
                </h1>
                <p className="text-xs text-blue-600 font-semibold tracking-wide">AI-Powered Healthcare Platform</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-3 bg-green-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-green-300 shadow-md">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-sm font-bold text-green-700">System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-20">
        <div className={`text-center mb-16 sm:mb-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-lg px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 border border-blue-200 shadow-lg">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="text-xs sm:text-sm font-bold text-blue-900 tracking-wide">
              SECURE HOSPITAL DATA MANAGEMENT USING VOICE TECHNOLOGY
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight px-4">
            <span className="block text-blue-900 mb-2">Transform Healthcare</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              With Voice
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-medium px-4">
            Experience the future of medical documentation with cutting-edge voice recognition 
            technology that understands and adapts to your workflow.
          </p>

        </div>

        {/* Main Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 max-w-7xl mx-auto">
          {/* Hospital Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-blue-100 shadow-xl p-6 sm:p-8 transform group-hover:scale-[1.02] transition-all duration-500">
              <div className="flex justify-center mb-5 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-xl">
                    <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-blue-900">
                  Hospital
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-3 sm:mb-4 rounded-full"></div>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Enterprise command center for managing doctors, patients, and intelligent medical records
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleNavigate('/hospital/login')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Access Portal</span>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => handleNavigate('/hospital/signup')}
                  className="w-full border-2 border-blue-600 text-blue-700 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  Register Hospital
                </button>
              </div>


            </div>
          </div>

          {/* Doctor Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-blue-100 shadow-xl p-6 sm:p-8 transform group-hover:scale-[1.02] transition-all duration-500">
              <div className="flex justify-center mb-5 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-xl">
                    <Stethoscope className="h-8 w-8 sm:h-10 sm:w-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-blue-900">
                  Doctor
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-3 sm:mb-4 rounded-full"></div>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  AI-powered workspace for patient records and intelligent medical documentation
                </p>
              </div>

              <button
                onClick={() => handleNavigate('/doctor/login')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 mb-3"
              >
                <span>Enter Dashboard</span>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 py-2 sm:py-3 rounded-xl border border-blue-200 mb-3">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                <span>Hospital Verified</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 py-2 sm:py-3 rounded-xl border border-blue-200">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" fill="currentColor" />
                <span>10,000+ Active Doctors</span>
              </div>
            </div>
          </div>

          {/* Patient Card */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-blue-100 shadow-xl p-6 sm:p-8 transform group-hover:scale-[1.02] transition-all duration-500">
              <div className="flex justify-center mb-5 sm:mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-600 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-indigo-600 to-blue-700 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-xl">
                    <UserRound className="h-8 w-8 sm:h-10 sm:w-10 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3 text-blue-900">
                  Patient
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 to-blue-700 mx-auto mb-3 sm:mb-4 rounded-full"></div>
                <p className="text-sm sm:text-base text-blue-700 leading-relaxed">
                  Secure personal health hub with complete medical history and records access
                </p>
              </div>

              <button
                onClick={() => handleNavigate('/patient/login')}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 mb-3"
              >
                <span>View My Records</span>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 py-2 sm:py-3 rounded-xl border border-blue-200 mb-3">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                <span>Created at Visit</span>
              </div>

              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 py-2 sm:py-3 rounded-xl border border-blue-200">
                <Cloud className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                <span>Cloud Synchronized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-5 sm:mb-6 mx-auto shadow-lg">
                <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
              </div>
              <h4 className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 text-center text-blue-900">
                Voice AI Engine
              </h4>
              <p className="text-sm sm:text-base text-blue-700 text-center leading-relaxed">
                Neural networks transform natural speech into precise medical documentation with 99% accuracy
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-5 sm:mb-6 mx-auto shadow-lg">
                <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
              </div>
              <h4 className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 text-center text-blue-900">
                Multi-Hospital Network
              </h4>
              <p className="text-sm sm:text-base text-blue-700 text-center leading-relaxed">
                Seamless connectivity across healthcare networks with unified access and instant synchronization
              </p>
            </div>
          </div>

          <div className="group relative md:col-span-2 lg:col-span-1">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-5 sm:mb-6 mx-auto shadow-lg">
                <Brain className="h-7 w-7 sm:h-8 sm:w-8 text-white" strokeWidth={2.5} />
              </div>
              <h4 className="font-black text-xl sm:text-2xl mb-3 sm:mb-4 text-center text-blue-900">
                AI-Powered Security
              </h4>
              <p className="text-sm sm:text-base text-blue-700 text-center leading-relaxed">
                Military-grade encryption with intelligent threat detection ensures complete data protection
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-40 bg-white/80 backdrop-blur-xl border-t border-blue-200/50 py-8 sm:py-10 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3 sm:mb-4">
            <Activity className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
            <span className="text-lg sm:text-xl font-black text-blue-900">
              Medical Voice System
            </span>
          </div>
          <p className="text-sm sm:text-base text-blue-800 font-bold mb-1">&copy; 2025 Medical Voice System. All rights reserved.</p>
          <p className="text-xs sm:text-sm text-blue-600 font-semibold">Transforming healthcare with next-generation AI technology</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;