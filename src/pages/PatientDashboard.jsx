import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import VoiceSearchModal from '../components/VoiceSearchModal';
import { FileText, Building2, Calendar, User, Download, Eye, Mic } from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);

  useEffect(() => {
    fetchPatientRecords();
  }, []);

  const fetchPatientRecords = async () => {
    try {
      const response = await axios.get(`/records/patient/${user.id}?allHospitals=true`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDownloadFile = async (recordId, fileIndex, fileName) => {
  try {
    const response = await axios.get(
      `/records/file/${recordId}/${fileIndex}?download=true`, // ✅ Added query param
      {
        responseType: 'blob'
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download error:', err);
  }
};

const handleViewFile = async (recordId, fileIndex) => {
  try {
    const response = await axios.get(
      `/records/file/${recordId}/${fileIndex}?download=false`, // ✅ Added query param
      {
        responseType: 'blob'
      }
    );

    // ✅ Proper blob handling
    const contentType = response.headers['content-type'] || 'application/pdf';
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    const newWindow = window.open(url, '_blank');
    
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      };
    }
  } catch (err) {
    console.error('View error:', err);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your records...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-4 rounded-full">
                <User className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600">
                  Age: {user?.age} | Gender: {user?.gender}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowVoiceSearch(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <Mic className="h-5 w-5" />
              <span>Voice Search</span>
            </button>
          </div>
        </div>

        {/* Medical Records */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          </div>

          {records.length > 0 ? (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold text-lg">
                          {record.hospitalId?.name || 'Unknown Hospital'}
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-500">Doctor</p>
                          <p className="font-medium">
                            Dr. {record.doctorId?.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {record.doctorId?.specialization}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Visit Date</p>
                          <p className="font-medium">
                            {new Date(record.visitDate || record.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-3">
                        <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                        <p className="font-medium text-gray-900">{record.diagnosis}</p>
                      </div>

                      {record.prescription && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-500">Prescription</p>
                          <p className="text-sm text-gray-700">{record.prescription}</p>
                        </div>
                      )}

                      {/* Files Section */}
                      {record.files && record.files.length > 0 && (
                        <div className="mt-3 border-t pt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            📎 Attached Files ({record.files.length})
                          </p>
                          <div className="grid md:grid-cols-2 gap-2">
                            {record.files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{file.originalName}</p>
                                  <p className="text-xs text-gray-600">
                                    {file.fileType} | {(file.fileSize / 1024).toFixed(2)} KB
                                  </p>
                                </div>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => handleViewFile(record._id, index)}
                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    title="View"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDownloadFile(record._id, index, file.originalName)}
                                    className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    title="Download"
                                  >
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.visitType === 'Emergency' 
                          ? 'bg-red-100 text-red-700'
                          : record.visitType === 'Follow-up'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {record.visitType || 'OPD'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Full Details →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No medical records found</p>
              <p className="text-sm text-gray-400 mt-2">
                Your medical records will appear here after hospital visits
              </p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Records</p>
                <p className="text-3xl font-bold mt-1">{records.length}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Hospitals Visited</p>
                <p className="text-3xl font-bold mt-1">
                  {new Set(records.map(r => r.hospitalId?._id)).size}
                </p>
              </div>
              <Building2 className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Last Visit</p>
                <p className="text-xl font-bold mt-1">
                  {records.length > 0 
                    ? new Date(records[0].visitDate || records[0].createdAt).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
              </div>
              <Calendar className="h-10 w-10 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Voice Search Modal */}
      {showVoiceSearch && (
        <VoiceSearchModal
          patientId={user.id}
          onClose={() => setShowVoiceSearch(false)}
        />
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedRecord(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <h3 className="text-xl font-bold">Medical Record Details</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Hospital</p>
                <p className="text-lg font-semibold">{selectedRecord.hospitalId?.name}</p>
                <p className="text-sm text-gray-600">{selectedRecord.hospitalId?.address}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">Dr. {selectedRecord.doctorId?.name}</p>
                  <p className="text-sm text-gray-600">{selectedRecord.doctorId?.specialization}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Visit Date</p>
                  <p className="font-medium">
                    {new Date(selectedRecord.visitDate || selectedRecord.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {selectedRecord.symptoms && (
                <div>
                  <p className="text-sm text-gray-500">Symptoms</p>
                  <p className="text-gray-900">{selectedRecord.symptoms}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Diagnosis</p>
                <p className="text-gray-900 font-medium">{selectedRecord.diagnosis}</p>
              </div>

              {selectedRecord.prescription && (
                <div>
                  <p className="text-sm text-gray-500">Prescription</p>
                  <p className="text-gray-900">{selectedRecord.prescription}</p>
                </div>
              )}

              {selectedRecord.prescriptions && selectedRecord.prescriptions.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Medications</p>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecord.prescriptions.map((med, index) => (
                      <li key={index} className="text-gray-900">{med}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRecord.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-gray-900">{selectedRecord.notes}</p>
                </div>
              )}

              {selectedRecord.vitals && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Vital Signs</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {selectedRecord.vitals.bloodPressure && (
                      <p><strong>BP:</strong> {selectedRecord.vitals.bloodPressure}</p>
                    )}
                    {selectedRecord.vitals.temperature && (
                      <p><strong>Temp:</strong> {selectedRecord.vitals.temperature}°F</p>
                    )}
                    {selectedRecord.vitals.pulse && (
                      <p><strong>Pulse:</strong> {selectedRecord.vitals.pulse} bpm</p>
                    )}
                    {selectedRecord.vitals.weight && (
                      <p><strong>Weight:</strong> {selectedRecord.vitals.weight} kg</p>
                    )}
                  </div>
                </div>
              )}

              {selectedRecord.nextVisit && (
                <div>
                  <p className="text-sm text-gray-500">Next Visit</p>
                  <p className="font-medium text-blue-600">
{new Date(selectedRecord.nextVisit).toLocaleDateString()}
                  </p>
                </div>
              )}

              {/* Files in Detail Modal */}
              {selectedRecord.files && selectedRecord.files.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Attached Files</p>
                  <div className="space-y-2">
                    {selectedRecord.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{file.originalName}</p>
                          <p className="text-xs text-gray-600">
                            {file.fileType} | {(file.fileSize / 1024).toFixed(2)} KB
                          </p>
                          {file.description && (
                            <p className="text-xs text-gray-500 mt-1">{file.description}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewFile(selectedRecord._id, index)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadFile(selectedRecord._id, index, file.originalName)}
                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
              <button
                onClick={() => setSelectedRecord(null)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;