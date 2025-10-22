import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { X, Mic, MicOff, Save } from 'lucide-react';

const CreateRecordModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [patients, setPatients] = useState([]);
  const [listening, setListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  
  const [formData, setFormData] = useState({
    patientId: '',
    symptoms: '',
    diagnosis: '',
    prescription: '',
    notes: '',
    voiceTranscript: '',
    bloodPressure: '',
    temperature: '',
    pulse: '',
    weight: ''
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patient');
      setPatients(response.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // 🎙️ Voice Recording
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
        await sendVoiceToTranscribe(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setListening(true);
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      console.error('Microphone error:', err);
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setListening(false);
    }
  };

  const sendVoiceToTranscribe = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      formData.append('doctorId', localStorage.getItem('userId') || 'unknown');

      const response = await axios.post('/voice/interpret', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const transcript = response.data.text || '';
      
      // Auto-parse transcript into fields
      parseTranscript(transcript);
      
      setSuccess('Voice transcribed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Voice transcription failed. Please try again or enter manually.');
      console.error('Transcription error:', err);
    }
  };

  const parseTranscript = (transcript) => {
    // Simple parsing logic - can be enhanced with NLP
    const lowerTranscript = transcript.toLowerCase();
    
    let parsedData = { voiceTranscript: transcript };

    // Extract symptoms
    if (lowerTranscript.includes('symptoms') || lowerTranscript.includes('complains of')) {
      const symptomsMatch = transcript.match(/symptoms?:?\s*([^.]+)/i) || 
                           transcript.match(/complains? of\s+([^.]+)/i);
      if (symptomsMatch) {
        parsedData.symptoms = symptomsMatch[1].trim();
      }
    }

    // Extract diagnosis
    if (lowerTranscript.includes('diagnosis') || lowerTranscript.includes('diagnosed with')) {
      const diagnosisMatch = transcript.match(/diagnosis:?\s*([^.]+)/i) ||
                            transcript.match(/diagnosed with\s+([^.]+)/i);
      if (diagnosisMatch) {
        parsedData.diagnosis = diagnosisMatch[1].trim();
      }
    }

    // Extract prescription
    if (lowerTranscript.includes('prescribed') || lowerTranscript.includes('prescription')) {
      const prescriptionMatch = transcript.match(/prescribed?:?\s*([^.]+)/i) ||
                               transcript.match(/prescription:?\s*([^.]+)/i);
      if (prescriptionMatch) {
        parsedData.prescription = prescriptionMatch[1].trim();
      }
    }

    setFormData(prev => ({ ...prev, ...parsedData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        patientId: formData.patientId,
        symptoms: formData.symptoms,
        diagnosis: formData.diagnosis,
        prescription: formData.prescription,
        notes: formData.notes,
        voiceTranscript: formData.voiceTranscript,
        vitals: {
          bloodPressure: formData.bloodPressure,
          temperature: formData.temperature ? parseFloat(formData.temperature) : undefined,
          pulse: formData.pulse ? parseInt(formData.pulse) : undefined,
          weight: formData.weight ? parseFloat(formData.weight) : undefined
        }
      };

      await axios.post('/records', payload);
      
      setSuccess('Medical record created successfully!');
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Save className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-bold">Create Medical Record</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
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

          {/* Voice Input Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">🎙️ Voice Input (Optional)</h4>
              <button
                onClick={listening ? stopVoiceRecording : startVoiceRecording}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  listening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {listening ? (
                  <>
                    <MicOff className="h-5 w-5" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    <span>Start Voice Input</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Speak naturally: "Patient has fever and cough. Diagnosis is viral infection. Prescribed paracetamol and rest."
            </p>
            {listening && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-red-600 font-medium">Recording...</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Patient *
              </label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a patient</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} - {patient.age}y {patient.gender} ({patient.phone})
                  </option>
                ))}
              </select>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Fever, cough, body pain..."
              />
            </div>

            {/* Diagnosis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis *
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Viral fever, Upper respiratory tract infection..."
              />
            </div>

            {/* Prescription */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prescription
              </label>
              <textarea
                name="prescription"
                value={formData.prescription}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Paracetamol 500mg twice daily, Rest for 3 days..."
              />
            </div>

            {/* Vital Signs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vital Signs (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="BP: 120/80"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Temp: 98.6°F"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="pulse"
                  value={formData.pulse}
                  onChange={handleChange}
                  placeholder="Pulse: 72 bpm"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight: 70 kg"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Follow-up needed in 1 week..."
              />
            </div>

            {/* Voice Transcript Display */}
            {formData.voiceTranscript && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voice Transcript
                </label>
                <p className="text-sm text-gray-600">{formData.voiceTranscript}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition"
              >
                </button>{loading ? 'Creating Record...' : 'Create Record'}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecordModal;