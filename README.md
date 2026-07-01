# 🎙️ VoiceMed - Voice-based Medical Record Retrieval System

> **Frontend** — React + Vite + TailwindCSS

🔗 **Live Demo:** [https://frontend-phi-ashy-42.vercel.app](https://frontend-phi-ashy-42.vercel.app)

🔗 **Backend Repo:** [Voice-based-Medical-Record-Retreival-System_Backend](https://github.com/FARINATTAR/Voice-based-Medical-Record-Retreival-System_Backend)

## Features

- 🎤 **Multilingual Voice Input** — English, Hindi, Tamil, Telugu (OpenAI Whisper)
- 🧠 **Medical NER** — Auto-extract diseases, drugs, vitals from speech (SciSpaCy)
- 🔐 **Role-based Access** — Hospital Admin, Doctor, Patient dashboards
- 📋 **Medical Records** — Create, view, search patient records via voice
- 🆘 **Emergency QR Access** — Generate QR codes for emergency medical data sharing
- 🔗 **Blockchain-inspired Audit Trail** — Tamper-evident record logging
- 💊 **Drug Interaction Checker** — Automated drug safety alerts
- 🔒 **AES-256 Encryption** — Field-level encryption for sensitive data

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS 4 |
| Backend | Node.js, Express 5 |
| Database | MongoDB Atlas |
| ML/NLP | OpenAI Whisper, SciSpaCy |
| Auth | JWT (JSON Web Tokens) |
| Deployment | Vercel (Frontend), Render (Backend) |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

```
VITE_API_URL=https://voicemed-backend.onrender.com/api
```
