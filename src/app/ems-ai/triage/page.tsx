'use client';
import EMSLayout from '../layout';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EMSTriageForm() {
  const [form, setForm] = useState({
    spo2: '',
    rr: '',
    hr: '',
    sbp: '',
    gcs_eye: '',
    gcs_verbal: '',
    gcs_motor: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // For now, just route to results with query params (stub)
    const params = new URLSearchParams(form as Record<string, string>).toString();
    router.push(`/ems-ai/results?${params}`);
  }

  return (
    <EMSLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
        <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">Enter Patient Vitals</h1>
          <p className="mb-6 text-lg text-gray-800 text-center">
            Enter the patient&apos;s vital signs and Glasgow Coma Scale scores to receive real-time risk predictions powered by machine learning.
          </p>
          <form onSubmit={handleSubmit} className="bg-blue-50 rounded-lg shadow p-6 space-y-4 max-w-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-blue-900">SpO₂ (%)</label>
                <input 
                  type="number" 
                  name="spo2" 
                  min="0" 
                  max="100" 
                  required 
                  value={form.spo2} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="95"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-900">Respiratory Rate (breaths/min)</label>
                <input 
                  type="number" 
                  name="rr" 
                  min="0" 
                  max="60" 
                  required 
                  value={form.rr} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="16"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-900">Heart Rate (bpm)</label>
                <input 
                  type="number" 
                  name="hr" 
                  min="0" 
                  max="250" 
                  required 
                  value={form.hr} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="80"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-900">Systolic BP (mmHg)</label>
                <input 
                  type="number" 
                  name="sbp" 
                  min="0" 
                  max="300" 
                  required 
                  value={form.sbp} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-900">GCS Eye</label>
                <input 
                  type="number" 
                  name="gcs_eye" 
                  min="1" 
                  max="4" 
                  required 
                  value={form.gcs_eye} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="4"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-900">GCS Verbal</label>
                <input 
                  type="number" 
                  name="gcs_verbal" 
                  min="1" 
                  max="5" 
                  required 
                  value={form.gcs_verbal} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-blue-900">GCS Motor</label>
                <input 
                  type="number" 
                  name="gcs_motor" 
                  min="1" 
                  max="6" 
                  required 
                  value={form.gcs_motor} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" 
                  placeholder="6"
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition text-lg" 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Predict Risk'}
            </button>
          </form>
        </div>
      </div>
    </EMSLayout>
  );
} 