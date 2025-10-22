import { useState } from 'react';
import axios from '../api/axios';
import { X, Mic, MicOff, Search, Download, Eye } from 'lucide-react';

const VoiceSearchModal = ({ onClose, patientId = null }) => {
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        await transcribeAndSearch(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setListening(true);
    } catch (err) {
      setError('Microphone access denied');
      console.error('Microphone error:', err);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setListening(false);
    }
  };

  const transcribeAndSearch = async (audioBlob) => {
    setLoading(true);
    setError('');

    try {
      // Step 1: Transcribe audio
      const formData = new FormData();
      formData.append('audio', audioBlob, 'search.wav');
      formData.append('doctorId', localStorage.getItem('userId') || 'unknown');

      const transcribeResponse = await axios.post('/voice/interpret', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const transcript = transcribeResponse.data.text || '';
      setSearchQuery(transcript);

      // Step 2: Search with transcript
      await performSearch(transcript);
    } catch (err) {
      setError('Voice search failed. Please try again.');
      console.error('Voice search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/records/voice-search', {
        query: query.trim(),
        patientId: patientId
      });

      setResults(response.data.records || []);
      
      if (response.data.records.length === 0) {
        setError('No records found matching your search');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTextSearch = () => {
    performSearch(searchQuery);
  };

//   const handleDownloadFile = async (recordId, fileIndex, fileName) => {
//     try {
//       const response = await axios.get(`/records/file/${recordId}/${fileIndex}`, {
//         responseType: 'blob'
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', fileName);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error('Download error:', err);
//       setError('Failed to download file');
//     }
//   };
  

//   const handleViewFile = async (recordId, fileIndex) => {
//     try {
//       const response = await axios.get(`/records/file/${recordId}/${fileIndex}`, {
//         responseType: 'blob'
//       });

//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       window.open(url, '_blank');
//     } catch (err) {
//       console.error('View error:', err);
//       setError('Failed to view file');
//     }
//   };

const handleViewFile = async (recordId, fileIndex) => {
  try {
    // ✅ FIX: Add query param for view mode
    const response = await axios.get(
      `/records/file/${recordId}/${fileIndex}?download=false`, 
      {
        responseType: 'blob'
      }
    );

    // ✅ Create proper blob URL with correct MIME type
    const contentType = response.headers['content-type'] || 'application/pdf';
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    // Open in new tab
    const newWindow = window.open(url, '_blank');
    
    // Clean up URL after window opens
    if (newWindow) {
      newWindow.onload = () => {
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      };
    }
  } catch (err) {
    console.error('View error:', err);
    setError('Failed to view file');
  }
};

const handleDownloadFile = async (recordId, fileIndex, fileName) => {
  try {
    // ✅ FIX: Add query param for download mode
    const response = await axios.get(
      `/records/file/${recordId}/${fileIndex}?download=true`,
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
    setError('Failed to download file');
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Search className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold">Voice Search Medical Records</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Search Input */}
          <div className="mb-6">
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSearch()}
                placeholder="Type or use voice: 'Show ECG reports', 'Find diabetes records'..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={listening ? stopVoiceRecording : startVoiceRecording}
                disabled={loading}
                className={`px-6 py-3 rounded-lg transition flex items-center space-x-2 ${
                  listening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {listening ? (
                  <>
                    <MicOff className="h-5 w-5" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    <span>Voice</span>
                  </>
                )}
              </button>
              <button
                onClick={handleTextSearch}
                disabled={loading || !searchQuery.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {listening && (
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Listening... Speak now!</span>
              </div>
            )}

            {loading && (
              <div className="text-center text-gray-600">
                <div className="animate-spin h-6 w-6 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Searching records...</p>
              </div>
            )}
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-4">
                Search Results ({results.length} found)
              </h4>
              <div className="space-y-4">
                {results.map((record) => (
                  <div
                    key={record._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    {/* Record Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-semibold text-lg text-gray-900">
                          {record.patientId?.name || 'Unknown Patient'}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {record.patientId?.age}y | {record.patientId?.gender} | {record.patientId?.phone}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {new Date(record.visitDate || record.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Record Details */}
                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Hospital</p>
                        <p className="font-medium">{record.hospitalId?.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Doctor</p>
                        <p className="font-medium">
                          Dr. {record.doctorId?.name} ({record.doctorId?.specialization})
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-xs text-gray-500 mb-1">Diagnosis</p>
                      <p className="font-medium text-gray-900">{record.diagnosis}</p>
                    </div>

                    {record.symptoms && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Symptoms</p>
                        <p className="text-sm text-gray-700">{record.symptoms}</p>
                      </div>
                    )}

                    {record.prescription && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500">Prescription</p>
                        <p className="text-sm text-gray-700">{record.prescription}</p>
                      </div>
                    )}

                    {/* Files */}
                    {record.files && record.files.length > 0 && (
                      <div className="mt-3 border-t pt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          📎 Attached Files ({record.files.length})
                        </p>
                        <div className="space-y-2">
                          {record.files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                            >
                              <div>
                                <p className="font-medium text-sm">{file.originalName}</p>
                                <p className="text-xs text-gray-600">
                                  {file.fileType} | {(file.fileSize / 1024).toFixed(2)} KB
                                </p>
                                {file.description && (
                                  <p className="text-xs text-gray-500 mt-1">{file.description}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewFile(record._id, index)}
                                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                  title="View"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDownloadFile(record._id, index, file.originalName)}
                                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
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
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && results.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No records found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try different keywords or use voice search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearchModal;