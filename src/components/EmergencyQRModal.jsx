import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { X, QrCode, Download } from 'lucide-react';

// Generates and displays a patient's emergency QR code. The QR points to the
// public /emergency/:token page that shows life-critical info when scanned.
const EmergencyQRModal = ({ patientId, onClose }) => {
  const [qr, setQr] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post(`/emergency/qr/${patientId}`, {
          origin: window.location.origin
        });
        setQr(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    })();
  }, [patientId]);

  const downloadQR = () => {
    if (!qr?.qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qr.qrDataUrl;
    link.download = `emergency-qr-${qr.patientName || 'patient'}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center space-x-2">
            <QrCode className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-bold">Emergency QR Code</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-6 text-center">
          {loading && <p className="text-gray-500">Generating…</p>}
          {error && <p className="text-red-600">{error}</p>}
          {qr && (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Print this and keep it in a wallet or on a phone lock screen. Anyone can scan it in an
                emergency to see critical info (blood group, allergies, medications) — <strong>no login needed</strong>.
              </p>
              <img src={qr.qrDataUrl} alt="Emergency QR" className="mx-auto border rounded-lg" />
              <p className="text-xs text-gray-400 mt-3 break-all">{qr.url}</p>
              <button
                onClick={downloadQR}
                className="mt-4 inline-flex items-center space-x-2 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Download className="h-4 w-4" />
                <span>Download QR</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyQRModal;
