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
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      
      // Route to results with the prediction data
      const params = new URLSearchParams({
        ...form,
        ...result,
      }).toString();
      
      router.push(`/ems-ai/results?${params}`);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <EMSLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
        <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-red-900 mb-2 drop-shadow-lg tracking-tight">EMERGENCY PATIENT ASSESSMENT</h1>
            <p className="text-lg text-gray-700 font-medium">Real-time risk assessment for dispatch escalation and field guidance</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded shadow">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🚨</span>
              <h3 className="text-lg font-bold text-red-900">Dispatch Communication Tool</h3>
            </div>
            <p className="text-red-800 text-sm">
              This assessment will automatically calculate risk levels and provide guidance for dispatch escalation. 
              Use standard field measurements - no special equipment required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-blue-50 rounded-lg shadow p-6 space-y-4 max-w-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-blue-900">
                  SpO₂ (%) <span className="text-sm text-gray-600">- Pulse oximeter reading</span>
                </label>
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
                <label className="block mb-1 font-medium text-blue-900">
                  Respiratory Rate <span className="text-sm text-gray-600">- Breaths per minute</span>
                </label>
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
                <label className="block mb-1 font-medium text-blue-900">
                  Heart Rate <span className="text-sm text-gray-600">- BPM from monitor/radial pulse</span>
                </label>
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
                <label className="block mb-1 font-medium text-blue-900">
                  Systolic BP <span className="text-sm text-gray-600">- Manual or automatic cuff</span>
                </label>
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
                <label className="block mb-1 font-medium text-blue-900">
                  GCS Eye <span className="text-sm text-gray-600">- 1-4 scale</span>
                </label>
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
                <label className="block mb-1 font-medium text-blue-900">
                  GCS Verbal <span className="text-sm text-gray-600">- 1-5 scale</span>
                </label>
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
                <label className="block mb-1 font-medium text-blue-900">
                  GCS Motor <span className="text-sm text-gray-600">- 1-6 scale</span>
                </label>
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

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">💡</span>
                <h4 className="font-semibold text-yellow-900">Field Guidance</h4>
              </div>
              <p className="text-yellow-800 text-sm">
                <strong>For less experienced responders:</strong> This tool will provide escalation recommendations and 
                help determine if additional resources (ALS, air medical, trauma center) are needed.
              </p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-red-600 text-white px-4 py-3 rounded font-semibold hover:bg-red-700 transition text-lg" 
              disabled={loading}
            >
              {loading ? '🔄 Processing Assessment...' : '🚨 CALCULATE RISK & GET GUIDANCE'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>This assessment will provide:</p>
            <ul className="mt-2 space-y-1">
              <li>• Real-time risk calculation for dispatch</li>
              <li>• Escalation recommendations for field crews</li>
              <li>• Resource allocation guidance</li>
              <li>• Transport priority assessment</li>
            </ul>
          </div>
        </div>
      </div>
    </EMSLayout>
  );
} 