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
    const params = new URLSearchParams(form as any).toString();
    router.push(`/ems-ai/results?${params}`);
  }

  return (
    <EMSLayout>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-lg w-full mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-blue-800 mb-2 text-center">Enter Patient Vitals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">SpO₂ (%)</label>
            <input type="number" name="spo2" min="0" max="100" required value={form.spo2} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
          <div>
            <label className="block font-medium mb-1">Respiratory Rate (breaths/min)</label>
            <input type="number" name="rr" min="0" max="60" required value={form.rr} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
          <div>
            <label className="block font-medium mb-1">Heart Rate (bpm)</label>
            <input type="number" name="hr" min="0" max="250" required value={form.hr} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
          <div>
            <label className="block font-medium mb-1">Systolic BP (mmHg)</label>
            <input type="number" name="sbp" min="0" max="300" required value={form.sbp} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
          <div>
            <label className="block font-medium mb-1">GCS Eye</label>
            <input type="number" name="gcs_eye" min="1" max="4" required value={form.gcs_eye} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
          <div>
            <label className="block font-medium mb-1">GCS Verbal</label>
            <input type="number" name="gcs_verbal" min="1" max="5" required value={form.gcs_verbal} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
          <div>
            <label className="block font-medium mb-1">GCS Motor</label>
            <input type="number" name="gcs_motor" min="1" max="6" required value={form.gcs_motor} onChange={handleChange} className="w-full px-3 py-2 rounded border focus:ring-2 focus:ring-blue-400 text-gray-900" />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-800 transition mt-4" disabled={loading}>{loading ? 'Processing...' : 'Predict Risk'}</button>
      </form>
    </EMSLayout>
  );
} 