import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { X, Mic, MicOff, Save } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
];

const CreateRecordModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [patients, setPatients] = useState([]);
  const [listening, setListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [language, setLanguage] = useState('en');
  const [transcribing, setTranscribing] = useState(false);
  const [entities, setEntities] = useState(null);
  
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

  // ��️ Voice Recording
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
    setTranscribing(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
      formData.append('doctorId', localStorage.getItem('userId') || 'unknown');
      formData.append('language', language);

      const response = await axios.post('/voice/interpret', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const transcript = response.data.text || '';
      
      // Auto-parse transcript into fields (passing medicalEntities and translation as helper)
      parseTranscript(transcript, response.data.medicalEntities, response.data.translation);
      setEntities(response.data.entities || null);
      
      setSuccess('Voice transcribed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Voice transcription failed. Please try again or enter manually.');
      console.error('Transcription error:', err);
    } finally {
      setTranscribing(false);
    }
  };

  const parseTranscript = (transcript, medicalEntities = null, translation = null) => {
    const lowerTranscript = transcript.toLowerCase();
    const lowerTranslation = (translation || '').toLowerCase();
    
    // We combine the native transcript and English translation for keyword/regex searches
    // so that we can match keywords even when Whisper translates or transcribes in native tongues.
    const combinedLower = `${lowerTranscript} ${lowerTranslation}`;
    const combinedText = `${transcript} ${translation || ''}`;
    
    let parsedData = { voiceTranscript: transcript };

    console.log('🔍 parseTranscript input:', { transcript, medicalEntities, translation });

    // ============================================================
    // LAYER 1: Direct regex extraction from raw transcript text
    //          (works even when NER misses things due to garbled Whisper output)
    // ============================================================

    // Direct BP extraction from transcript: "BP 140/90", "BP, 140, 90", "BP 140 90", "bb 140 90", "Bp12080", "BP 1,2080"
    // We search the combined lower transcript/translation using a robust pattern
    const bpDirectMatch = combinedLower.match(/(?:bp|bb|blood\s+pressure)[\s,:]*((?:\d[\s,/\-]*){4,8})/i);
    if (bpDirectMatch) {
      const cleaned = bpDirectMatch[1].replace(/[\s,]/g, '');
      const standardMatch = cleaned.match(/^(\d{2,3})[\/\-](\d{2,3})$/);
      if (standardMatch) {
        parsedData.bloodPressure = `${standardMatch[1]}/${standardMatch[2]}`;
      } else {
        const digitsOnly = cleaned.replace(/[^\d]/g, '');
        if (digitsOnly.length === 5) {
          parsedData.bloodPressure = `${digitsOnly.substring(0, 3)}/${digitsOnly.substring(3)}`;
        } else if (digitsOnly.length === 6) {
          parsedData.bloodPressure = `${digitsOnly.substring(0, 3)}/${digitsOnly.substring(3)}`;
        } else if (digitsOnly.length === 4) {
          parsedData.bloodPressure = `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2)}`;
        }
      }
      if (parsedData.bloodPressure) {
        console.log('✅ BP extracted from transcript:', parsedData.bloodPressure);
      }
    }

    // Direct weight extraction: "70 kg", "70 kilo", "weight 70"
    const weightDirectMatch = combinedLower.match(/(\d{2,3}(?:\.\d)?)\s*(?:kg|kilo|kilograms?)/i)
      || combinedLower.match(/(?:weight|wajan|wazan|vajan)\s*(?:is|hai|:)?\s*(\d{2,3}(?:\.\d)?)/i);
    if (weightDirectMatch) {
      parsedData.weight = weightDirectMatch[1];
      console.log('✅ Weight extracted from transcript:', parsedData.weight);
    }

    // Direct temperature extraction: "temperature 101", "temp 99.5", "fever 102"
    const tempDirectMatch = combinedLower.match(/(?:temp|temperature|fever)\s*(?:is|of|:)?\s*(\d{2,3}(?:\.\d)?)\s*(?:f|°)?/i);
    if (tempDirectMatch) {
      const num = parseFloat(tempDirectMatch[1]);
      if (num > 94 && num < 106) {
        parsedData.temperature = num.toString();
        console.log('✅ Temp extracted from transcript:', parsedData.temperature);
      }
    }

    // Direct pulse extraction: "pulse 72", "heart rate 80", "72 bpm"
    const pulseDirectMatch = combinedLower.match(/(?:pulse|heart rate|hr)\s*(?:is|of|:)?\s*(\d{2,3})/i)
      || combinedLower.match(/(\d{2,3})\s*bpm/i);
    if (pulseDirectMatch) {
      parsedData.pulse = pulseDirectMatch[1];
      console.log('✅ Pulse extracted from transcript:', parsedData.pulse);
    }

    // ============================================================
    // LAYER 2: Keyword-based field extraction
    // ============================================================

    // Extract symptoms (English keywords)
    if (combinedLower.includes('symptoms') || combinedLower.includes('complains of')
        || combinedLower.includes('suffering from') || combinedLower.includes('patient has')) {
      const symptomsMatch = combinedText.match(/symptoms?:?\s*([^.]+)/i) || 
                           combinedText.match(/complains? of\s+([^.]+)/i) ||
                           combinedText.match(/suffering from\s+([^.]+)/i) ||
                           combinedText.match(/patient has\s+([^.]+)/i);
      if (symptomsMatch) {
        parsedData.symptoms = symptomsMatch[1].trim();
      }
    }

    // Extract diagnosis
    if (combinedLower.includes('diagnosis') || combinedLower.includes('diagnosed with')) {
      const diagnosisMatch = combinedText.match(/diagnosis:?\s*([^.]+)/i) ||
                             combinedText.match(/diagnosed with\s+([^.]+)/i);
      if (diagnosisMatch) {
        parsedData.diagnosis = diagnosisMatch[1].trim();
      }
    }

    // Extract prescription — also match garbled "priscrib", "prescrib" 
    if (combinedLower.match(/prescri|priscri/)) {
      const prescriptionMatch = combinedText.match(/prescri\w*:?\s*([^.]+)/i) ||
                               combinedText.match(/priscri\w*:?\s*([^.]+)/i);
      if (prescriptionMatch) {
        parsedData.prescription = prescriptionMatch[1].trim();
      }
    }

    // ============================================================
    // LAYER 3: NLP Entity-based population (from backend NER)
    // ============================================================
    if (medicalEntities) {
      console.log('🧠 medicalEntities received:', medicalEntities);

      // Auto-populate diagnosis from extracted diseases
      if (!parsedData.diagnosis && medicalEntities.diseases && medicalEntities.diseases.length > 0) {
        parsedData.diagnosis = medicalEntities.diseases
          .map(d => d.charAt(0).toUpperCase() + d.slice(1))
          .join(', ');
        console.log('✅ Diagnosis from NER:', parsedData.diagnosis);
      }

      // Auto-build prescription from extracted drugs + doses
      if (!parsedData.prescription && medicalEntities.drugs && medicalEntities.drugs.length > 0) {
        const meds = [];
        medicalEntities.drugs.forEach((drug, index) => {
          const dose = (medicalEntities.doses && medicalEntities.doses[index]) || '';
          meds.push(`${drug.charAt(0).toUpperCase() + drug.slice(1)}${dose ? ' ' + dose : ''}`);
        });
        parsedData.prescription = meds.join(', ');
        console.log('✅ Prescription from NER:', parsedData.prescription);
      }

      // Auto-extract vitals from NER (as backup to Layer 1)
      if (medicalEntities.vitals && medicalEntities.vitals.length > 0) {
        medicalEntities.vitals.forEach(vital => {
          const val = vital.toLowerCase();
          
          // Match Blood Pressure (e.g., "120/80" or "120 80" or "130 85" or "130-85" or "140, 90" or "Bp12080" or "BP 1,2080")
          if (!parsedData.bloodPressure) {
            const cleaned = val.replace(/(?:bp|bb|blood pressure)/g, '').replace(/[\s,]/g, '');
            const standardMatch = cleaned.match(/^(\d{2,3})[\/\-](\d{2,3})$/);
            if (standardMatch) {
              parsedData.bloodPressure = `${standardMatch[1]}/${standardMatch[2]}`;
            } else {
              const digitsOnly = cleaned.replace(/[^\d]/g, '');
              if (digitsOnly.length === 5) {
                parsedData.bloodPressure = `${digitsOnly.substring(0, 3)}/${digitsOnly.substring(3)}`;
              } else if (digitsOnly.length === 6) {
                parsedData.bloodPressure = `${digitsOnly.substring(0, 3)}/${digitsOnly.substring(3)}`;
              } else if (digitsOnly.length === 4) {
                parsedData.bloodPressure = `${digitsOnly.substring(0, 2)}/${digitsOnly.substring(2)}`;
              }
            }
            if (parsedData.bloodPressure) {
              console.log('✅ BP from NER vital:', parsedData.bloodPressure);
            }
          }

          // Match Temperature
          if (!parsedData.temperature) {
            const tempMatch = val.match(/(\d{2,3}(?:\.\d)?)/);
            if (tempMatch) {
              const num = parseFloat(tempMatch[1]);
              if (num > 94 && num < 106) {
                parsedData.temperature = num.toString();
              }
            }
          }

          // Match Pulse
          if (!parsedData.pulse) {
            const pulseMatch = val.match(/(?:pulse|bpm|heart rate)\s*(\d{2,3})|(\d{2,3})\s*(?:bpm|pulse)/i);
            if (pulseMatch) {
              parsedData.pulse = pulseMatch[1] || pulseMatch[2];
            }
          }

          // Match Weight
          if (!parsedData.weight) {
            const weightMatch = val.match(/(\d{2,3}(?:\.\d)?)\s*(?:kg|kilograms?)/i);
            if (weightMatch) {
              parsedData.weight = weightMatch[1];
            }
          }
        });
      }
    }

    console.log('📝 Final parsed data:', parsedData);
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
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-sm font-medium text-gray-700">🗣️ Speak in:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">🎙️ Voice Input (Optional)</h4>
              <button
                type="button"
                onClick={listening ? stopVoiceRecording : startVoiceRecording}
                disabled={transcribing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  listening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${transcribing ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            {transcribing && (
              <div className="mt-3 flex items-center space-x-2 text-blue-600">
                <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-sm font-medium">Transcribing voice with AI... Please wait.</span>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                placeholder="Enter symptoms (e.g. fever, cough)..."
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                placeholder="Enter diagnosis (e.g. Type 2 Diabetes)..."
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                placeholder="Enter prescription details (e.g. Metformin 500mg daily)..."
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
                  placeholder="BP: e.g. 120/80"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                />
                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Temp: e.g. 98.6°F"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                />
                <input
                  type="number"
                  name="pulse"
                  value={formData.pulse}
                  onChange={handleChange}
                  placeholder="Pulse: e.g. 72 bpm"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                />
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight: e.g. 70 kg"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900"
                placeholder="Enter any additional notes..."
              />
            </div>

            {/* Voice Transcript Display */}
            {formData.voiceTranscript && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Voice Transcript
                  </label>
                  <p className="text-sm text-gray-600">{formData.voiceTranscript}</p>
                </div>
                
                {/* Detected medical entities (from the NER pipeline) */}
                {entities && entities.length > 0 && (
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs font-semibold text-indigo-800 mb-2">🧠 Medical Entities Detected</p>
                    <div className="flex flex-wrap gap-2">
                      {entities.map((e, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            e.label === 'DRUG' ? 'bg-green-100 text-green-700'
                            : e.label === 'DISEASE' ? 'bg-red-100 text-red-700'
                            : e.label === 'DOSE' ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {e.text} <span className="opacity-60 font-normal">· {e.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
                {loading ? 'Creating Record...' : 'Create Record'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRecordModal;