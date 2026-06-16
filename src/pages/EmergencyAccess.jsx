import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { AlertTriangle, HeartPulse, Phone, Pill, Activity } from 'lucide-react';

// PUBLIC page reached by scanning a patient's emergency QR code. Shows only
// life-critical info, no login required. Backed by a signed token.
const EmergencyAccess = () => {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/emergency/access/${token}`);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Invalid or expired emergency code');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading emergency record…</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-600 text-white rounded-t-xl px-6 py-4 flex items-center space-x-3">
          <HeartPulse className="h-7 w-7" />
          <div>
            <h1 className="text-xl font-bold">Emergency Medical Card</h1>
            <p className="text-red-100 text-sm">Critical information only · accessed {new Date(data.accessedAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-md p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Info label="Name" value={data.name} />
            <Info label="Blood Group" value={data.bloodGroup} highlight />
            <Info label="Age" value={data.age} />
            <Info label="Gender" value={data.gender} />
          </div>

          <Section icon={<AlertTriangle className="h-5 w-5 text-amber-600" />} title="Allergies"
            items={data.allergies} empty="No known allergies" color="amber" />

          <Section icon={<Activity className="h-5 w-5 text-blue-600" />} title="Chronic Conditions"
            items={data.chronicConditions} empty="None recorded" color="blue" />

          <Section icon={<Pill className="h-5 w-5 text-green-600" />} title="Current Medications"
            items={data.currentMedications} empty="None recorded" color="green" />

          {data.emergencyContact?.name && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="h-5 w-5 text-gray-700" />
                <p className="font-semibold text-gray-900">Emergency Contact</p>
              </div>
              <p className="text-gray-800">
                {data.emergencyContact.name}
                {data.emergencyContact.relation && ` (${data.emergencyContact.relation})`}
                {' — '}
                <a href={`tel:${data.emergencyContact.phone}`} className="text-blue-600 font-medium">
                  {data.emergencyContact.phone}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value, highlight }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className={`font-semibold ${highlight ? 'text-red-600 text-lg' : 'text-gray-900'}`}>{value ?? '—'}</p>
  </div>
);

const COLOR_CLASSES = {
  amber: 'bg-amber-100 text-amber-700',
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
};

const Section = ({ icon, title, items, empty, color }) => (
  <div>
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <p className="font-semibold text-gray-900">{title}</p>
    </div>
    {items && items.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <span key={i} className={`px-3 py-1 rounded-full text-sm ${COLOR_CLASSES[color]}`}>{it}</span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500">{empty}</p>
    )}
  </div>
);

export default EmergencyAccess;
