import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { X, ShieldCheck, ShieldAlert, RefreshCw } from 'lucide-react';

// Viewer for the tamper-evident audit hash chain. Lists recent blocks and lets
// an admin verify chain integrity (recomputes every hash on the server).
const AuditTrailModal = ({ onClose }) => {
  const [logs, setLogs] = useState([]);
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/audit?limit=100');
      setLogs(res.data.logs || []);
    } catch (err) {
      console.error('audit fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    setVerifying(true);
    try {
      const res = await axios.get('/audit/verify');
      setVerification(res.data);
    } catch (err) {
      setVerification({ valid: false, reason: 'Verification request failed' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h3 className="text-lg font-bold">Audit Trail (Blockchain Hash Chain)</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">Every record access/change is chained with SHA-256. Tampering breaks the chain.</p>
            <div className="flex space-x-2">
              <button onClick={fetchLogs} className="inline-flex items-center space-x-1 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                <RefreshCw className="h-4 w-4" /><span>Refresh</span>
              </button>
              <button onClick={verify} disabled={verifying}
                className="inline-flex items-center space-x-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 disabled:opacity-60">
                <ShieldCheck className="h-4 w-4" /><span>{verifying ? 'Verifying…' : 'Verify Integrity'}</span>
              </button>
            </div>
          </div>

          {verification && (
            <div className={`mb-4 p-4 rounded-lg flex items-start space-x-3 ${verification.valid ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'}`}>
              {verification.valid ? <ShieldCheck className="h-6 w-6 text-emerald-600" /> : <ShieldAlert className="h-6 w-6 text-red-600" />}
              <div>
                <p className={`font-semibold ${verification.valid ? 'text-emerald-800' : 'text-red-800'}`}>
                  {verification.valid ? 'Chain intact — no tampering detected' : 'TAMPERING DETECTED'}
                </p>
                <p className="text-sm text-gray-700">{verification.reason}</p>
                <p className="text-xs text-gray-500 mt-1">{verification.totalBlocks} blocks verified</p>
              </div>
            </div>
          )}

          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading audit chain…</p>
          ) : logs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No audit entries yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-3">#</th>
                    <th className="py-2 pr-3">Time</th>
                    <th className="py-2 pr-3">Actor</th>
                    <th className="py-2 pr-3">Action</th>
                    <th className="py-2 pr-3">Details</th>
                    <th className="py-2 pr-3">Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((l) => (
                    <tr key={l.index} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-3 font-mono">{l.index}</td>
                      <td className="py-2 pr-3 whitespace-nowrap">{new Date(l.timestamp).toLocaleString()}</td>
                      <td className="py-2 pr-3">{l.actorName || l.actorRole || '—'}<span className="text-xs text-gray-400 block">{l.actorRole}</span></td>
                      <td className="py-2 pr-3"><span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{l.action}</span></td>
                      <td className="py-2 pr-3 max-w-xs truncate" title={l.details}>{l.details}</td>
                      <td className="py-2 pr-3 font-mono text-xs text-gray-400" title={l.hash}>{l.hash?.slice(0, 10)}…</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditTrailModal;
