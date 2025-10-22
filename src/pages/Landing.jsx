// // // // import { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { Building2, UserRound, Stethoscope, Activity } from 'lucide-react';

// // // // const Landing = () => {
// // // //   const navigate = useNavigate();

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm">
// // // //         <div className="max-w-7xl mx-auto px-4 py-6">
// // // //           <div className="flex items-center justify-between">
// // // //             <div className="flex items-center space-x-3">
// // // //               <Activity className="h-10 w-10 text-blue-600" />
// // // //               <h1 className="text-3xl font-bold text-gray-900">
// // // //                 Medical Voice System
// // // //               </h1>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       {/* Hero Section */}
// // // //       <main className="max-w-7xl mx-auto px-4 py-16">
// // // //         <div className="text-center mb-16">
// // // //           <h2 className="text-5xl font-bold text-gray-900 mb-4">
// // // //             Voice-Powered Healthcare Management
// // // //           </h2>
// // // //           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
// // // //             Streamline medical records with voice recognition, manage patients efficiently,
// // // //             and provide better healthcare services.
// // // //           </p>
// // // //         </div>

// // // //         {/* Login Options */}
// // // //         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
// // // //           {/* Hospital Card */}
// // // //           <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
// // // //             <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //               <Building2 className="h-8 w-8 text-blue-600" />
// // // //             </div>
// // // //             <h3 className="text-2xl font-bold text-center mb-4">Hospital</h3>
// // // //             <p className="text-gray-600 text-center mb-6">
// // // //               Manage doctors, patients, and medical records
// // // //             </p>
// // // //             <div className="space-y-3">
// // // //               <button
// // // //                 onClick={() => navigate('/hospital/login')}
// // // //                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
// // // //               >
// // // //                 Login
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => navigate('/hospital/signup')}
// // // //                 className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition font-medium"
// // // //               >
// // // //                 Register Hospital
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Doctor Card */}
// // // //           <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
// // // //             <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //               <Stethoscope className="h-8 w-8 text-green-600" />
// // // //             </div>
// // // //             <h3 className="text-2xl font-bold text-center mb-4">Doctor</h3>
// // // //             <p className="text-gray-600 text-center mb-6">
// // // //               Access patient records and create medical reports
// // // //             </p>
// // // //             <button
// // // //               onClick={() => navigate('/doctor/login')}
// // // //               className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
// // // //             >
// // // //               Doctor Login
// // // //             </button>
// // // //             <p className="text-sm text-gray-500 text-center mt-4">
// // // //               Account created by hospital admin
// // // //             </p>
// // // //           </div>

// // // //           {/* Patient Card */}
// // // //           <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition transform hover:-translate-y-1">
// // // //             <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //               <UserRound className="h-8 w-8 text-purple-600" />
// // // //             </div>
// // // //             <h3 className="text-2xl font-bold text-center mb-4">Patient</h3>
// // // //             <p className="text-gray-600 text-center mb-6">
// // // //               View your medical history and records
// // // //             </p>
// // // //             <button
// // // //               onClick={() => navigate('/patient/login')}
// // // //               className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-medium"
// // // //             >
// // // //               Patient Login
// // // //             </button>
// // // //             <p className="text-sm text-gray-500 text-center mt-4">
// // // //               Account created during hospital visit
// // // //             </p>
// // // //           </div>
// // // //         </div>

// // // //         {/* Features Section */}
// // // //         <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
// // // //           <div className="text-center">
// // // //             <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
// // // //               <Activity className="h-6 w-6 text-blue-600" />
// // // //             </div>
// // // //             <h4 className="font-semibold text-lg mb-2">Voice Recognition</h4>
// // // //             <p className="text-gray-600 text-sm">
// // // //               Create medical records using voice commands
// // // //             </p>
// // // //           </div>
// // // //           <div className="text-center">
// // // //             <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
// // // //               <Building2 className="h-6 w-6 text-green-600" />
// // // //             </div>
// // // //             <h4 className="font-semibold text-lg mb-2">Multi-Hospital Support</h4>
// // // //             <p className="text-gray-600 text-sm">
// // // //               Doctors and patients can access multiple hospitals
// // // //             </p>
// // // //           </div>
// // // //           <div className="text-center">
// // // //             <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
// // // //               <Stethoscope className="h-6 w-6 text-purple-600" />
// // // //             </div>
// // // //             <h4 className="font-semibold text-lg mb-2">Secure Records</h4>
// // // //             <p className="text-gray-600 text-sm">
// // // //               HIPAA compliant medical record management
// // // //             </p>
// // // //           </div>
// // // //         </div>
// // // //       </main>

// // // //       {/* Footer */}
// // // //       <footer className="bg-white mt-20 py-8">
// // // //         <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
// // // //           <p>&copy; 2025 Medical Voice System. All rights reserved.</p>
// // // //         </div>
// // // //       </footer>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Landing;

// // // import { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { Building2, UserRound, Stethoscope, Activity, Heart, Shield, Zap, Clock, Users, FileText } from 'lucide-react';

// // // const Landing = () => {
// // //   const navigate = useNavigate();
// // //   const [hoveredCard, setHoveredCard] = useState(null);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
// // //       {/* Animated Background Elements */}
// // //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// // //         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
// // //         <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
// // //         <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>
// // //       </div>

// // //       {/* Header */}
// // //       <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50">
// // //         <div className="max-w-7xl mx-auto px-4 py-5">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center space-x-3 group cursor-pointer">
// // //               <div className="relative">
// // //                 <Activity className="h-11 w-11 text-blue-600 transition-transform group-hover:scale-110 group-hover:rotate-12" />
// // //                 <Heart className="h-4 w-4 text-red-500 absolute -top-1 -right-1 animate-pulse" />
// // //               </div>
// // //               <div>
// // //                 <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
// // //                   Medical Voice System
// // //                 </h1>
// // //                 <p className="text-xs text-gray-500 font-medium">Healthcare Reimagined</p>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center space-x-2">
// // //               <Shield className="h-5 w-5 text-green-600" />
// // //               <span className="text-sm font-semibold text-gray-700">HIPAA Compliant</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Hero Section */}
// // //       <main className="max-w-7xl mx-auto px-4 py-20 relative z-10">
// // //         <div className="text-center mb-20">
// // //           <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
// // //             <span className="text-blue-700 font-semibold text-sm flex items-center gap-2">
// // //               <Zap className="h-4 w-4" />
// // //               AI-Powered Healthcare Platform
// // //             </span>
// // //           </div>
// // //           <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
// // //             Voice-Powered
// // //             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
// // //               Healthcare Management
// // //             </span>
// // //           </h2>
// // //           <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
// // //             Transform medical documentation with advanced voice recognition. 
// // //             Manage patients effortlessly and deliver exceptional healthcare services.
// // //           </p>
// // //         </div>

// // //         {/* Login Options */}
// // //         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
// // //           {/* Hospital Card */}
// // //           <div 
// // //             className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300 relative overflow-hidden group"
// // //             onMouseEnter={() => setHoveredCard('hospital')}
// // //             onMouseLeave={() => setHoveredCard(null)}
// // //           >
// // //             <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// // //             <div className="relative z-10">
// // //               <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
// // //                 <Building2 className="h-10 w-10 text-white" />
// // //               </div>
// // //               <h3 className="text-3xl font-bold text-center mb-3 text-gray-900">Hospital</h3>
// // //               <p className="text-gray-600 text-center mb-8 leading-relaxed">
// // //                 Complete control over doctors, patients, and comprehensive medical record management
// // //               </p>
// // //               <div className="space-y-3">
// // //                 <button
// // //                   onClick={() => navigate('/hospital/login')}
// // //                   className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
// // //                 >
// // //                   Login
// // //                 </button>
// // //                 <button
// // //                   onClick={() => navigate('/hospital/signup')}
// // //                   className="w-full border-2 border-blue-600 text-blue-600 py-3.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
// // //                 >
// // //                   Register Hospital
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Doctor Card */}
// // //           <div 
// // //             className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 hover:shadow-green-500/20 transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-300 relative overflow-hidden group"
// // //             onMouseEnter={() => setHoveredCard('doctor')}
// // //             onMouseLeave={() => setHoveredCard(null)}
// // //           >
// // //             <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// // //             <div className="relative z-10">
// // //               <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
// // //                 <Stethoscope className="h-10 w-10 text-white" />
// // //               </div>
// // //               <h3 className="text-3xl font-bold text-center mb-3 text-gray-900">Doctor</h3>
// // //               <p className="text-gray-600 text-center mb-8 leading-relaxed">
// // //                 Instant access to patient records and voice-powered medical report creation
// // //               </p>
// // //               <button
// // //                 onClick={() => navigate('/doctor/login')}
// // //                 className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3.5 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
// // //               >
// // //                 Doctor Login
// // //               </button>
// // //               <div className="mt-5 pt-5 border-t border-gray-200">
// // //                 <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
// // //                   <Shield className="h-4 w-4" />
// // //                   Account created by hospital admin
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Patient Card */}
// // //           <div 
// // //             className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 relative overflow-hidden group"
// // //             onMouseEnter={() => setHoveredCard('patient')}
// // //             onMouseLeave={() => setHoveredCard(null)}
// // //           >
// // //             <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
// // //             <div className="relative z-10">
// // //               <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
// // //                 <UserRound className="h-10 w-10 text-white" />
// // //               </div>
// // //               <h3 className="text-3xl font-bold text-center mb-3 text-gray-900">Patient</h3>
// // //               <p className="text-gray-600 text-center mb-8 leading-relaxed">
// // //                 Secure access to your complete medical history and health records
// // //               </p>
// // //               <button
// // //                 onClick={() => navigate('/patient/login')}
// // //                 className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3.5 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
// // //               >
// // //                 Patient Login
// // //               </button>
// // //               <div className="mt-5 pt-5 border-t border-gray-200">
// // //                 <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2">
// // //                   <Clock className="h-4 w-4" />
// // //                   Account created during hospital visit
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Features Section */}
// // //         <div className="mb-20">
// // //           <div className="text-center mb-12">
// // //             <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
// // //             <p className="text-lg text-gray-600">Advanced features designed for modern healthcare</p>
// // //           </div>
// // //           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
// // //             <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
// // //               <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
// // //                 <Activity className="h-8 w-8 text-white" />
// // //               </div>
// // //               <h4 className="font-bold text-xl mb-3 text-gray-900">Voice Recognition</h4>
// // //               <p className="text-gray-600 leading-relaxed">
// // //                 Create detailed medical records effortlessly using advanced AI-powered voice commands
// // //               </p>
// // //             </div>
// // //             <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
// // //               <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
// // //                 <Building2 className="h-8 w-8 text-white" />
// // //               </div>
// // //               <h4 className="font-bold text-xl mb-3 text-gray-900">Multi-Hospital Support</h4>
// // //               <p className="text-gray-600 leading-relaxed">
// // //                 Seamless access across multiple hospitals for doctors and patients nationwide
// // //               </p>
// // //             </div>
// // //             <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
// // //               <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
// // //                 <Shield className="h-8 w-8 text-white" />
// // //               </div>
// // //               <h4 className="font-bold text-xl mb-3 text-gray-900">Secure Records</h4>
// // //               <p className="text-gray-600 leading-relaxed">
// // //                 HIPAA compliant medical record management with enterprise-grade security
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Stats Section */}
// // //         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-12 mb-20">
// // //           <div className="grid md:grid-cols-3 gap-8 text-center text-white">
// // //             <div>
// // //               <Users className="h-12 w-12 mx-auto mb-3 opacity-90" />
// // //               <div className="text-5xl font-bold mb-2">10K+</div>
// // //               <div className="text-blue-100 text-lg">Active Users</div>
// // //             </div>
// // //             <div>
// // //               <FileText className="h-12 w-12 mx-auto mb-3 opacity-90" />
// // //               <div className="text-5xl font-bold mb-2">50K+</div>
// // //               <div className="text-blue-100 text-lg">Medical Records</div>
// // //             </div>
// // //             <div>
// // //               <Heart className="h-12 w-12 mx-auto mb-3 opacity-90" />
// // //               <div className="text-5xl font-bold mb-2">99.9%</div>
// // //               <div className="text-blue-100 text-lg">Uptime</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* Footer */}
// // //       <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-10 relative z-10">
// // //         <div className="max-w-7xl mx-auto px-4">
// // //           <div className="flex flex-col md:flex-row justify-between items-center">
// // //             <div className="flex items-center space-x-3 mb-4 md:mb-0">
// // //               <Activity className="h-8 w-8 text-blue-400" />
// // //               <span className="text-xl font-bold">Medical Voice System</span>
// // //             </div>
// // //             <div className="text-gray-400">
// // //               <p>&copy; 2025 Medical Voice System. All rights reserved.</p>
// // //             </div>
// // //             <div className="flex items-center space-x-2 mt-4 md:mt-0">
// // //               <Shield className="h-5 w-5 text-green-400" />
// // //               <span className="text-sm text-gray-300">Secured & Encrypted</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </footer>
// // //     </div>
// // //   );
// // // };

// // // export default Landing;



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
              SECURE AI VOICE TECHNOLOGY
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight px-4">
            <span className="block text-blue-900 mb-2">Transform Healthcare</span>
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              With Voice AI
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 font-medium px-4">
            Experience the future of medical documentation with cutting-edge voice recognition 
            technology that understands and adapts to your workflow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold px-4">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-lg px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md border border-blue-100">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <span className="text-blue-900">HIPAA Certified</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-lg px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md border border-blue-100">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <span className="text-blue-900">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-lg px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md border border-blue-100">
              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
              <span className="text-blue-900">Award Winning</span>
            </div>
          </div>
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

              <div className="mt-5 sm:mt-6 flex items-center justify-center space-x-2 text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 py-2 sm:py-3 rounded-xl border border-blue-200">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" fill="currentColor" />
                <span>Enterprise Solution</span>
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