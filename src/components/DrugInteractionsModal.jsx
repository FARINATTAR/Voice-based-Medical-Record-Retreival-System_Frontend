import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { X, AlertTriangle, ShieldCheck } from 'lucide-react';

// Shows cross-institutional drug interaction warnings for a patient: drugs are
// aggregated from every hospital the patient has visited.
const SEVERITY_STYLE = {
  major: 'bg-red-50 border-red-300 text-red-800',
  moderate: 'bg-amber-50 border-amber-300 text-amber-800',
  minor: 'bg-yellow-50 border-yellow-200 text-yellow-800',
};

const DrugInteractionsModal = ({ patientId, onClose }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/records/${patientId}/interactions`);
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to check interactions');
      } finally {
        setLoading(false);
      }
    })();
  }, [patientId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            <h3 className="text-lg font-bold">Drug Interaction Check</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-6">
          {loading && <p className="text-gray-500 text-center py-6">Checking medications across all hospitals…</p>}
          {error && <p className="text-red-600">{error}</p>}

          {data && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Medications on file (all hospitals):</p>
                <div className="flex flex-wrap gap-2">
                  {data.totalDrugs.length === 0
                    ? <span className="text-sm text-gray-400">None detected</span>
                    : data.totalDrugs.map((d, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm capitalize">{d}</span>
                    ))}
                </div>
              </div>

              {data.warnings.length === 0 ? (
                <div className="flex items-center space-x-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                  <p className="text-emerald-800 font-medium">No known interactions detected.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900">{data.warnings.length} potential interaction(s):</p>
                  {data.warnings.map((w, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${SEVERITY_STYLE[w.severity]}`}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold capitalize">{w.drugs.join(' + ')}</p>
                        <span className="text-xs uppercase font-bold px-2 py-1 rounded bg-white/60">{w.severity}</span>
                      </div>
                      <p className="text-sm">{w.description}</p>
                      {w.sources && (
                        <div className="mt-2 text-xs text-gray-600">
                          {w.sources.map((s, j) => (
                            <span key={j} className="mr-3 capitalize">
                              <strong>{s.drug}</strong>: {s.hospitals.join(', ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrugInteractionsModal;
