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
    patient_narrative: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
        narrative_insights: result.narrative_insights?.join('|') || '',
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
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Patient Assessment</h1>
                <p className="text-gray-600 text-sm">Emergency Medical Services - Risk Assessment Tool</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Assessment ID</div>
                <div className="text-sm font-mono text-gray-700">EMS-{Date.now().toString().slice(-6)}</div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Enter patient vital signs and Glasgow Coma Scale scores. This assessment will provide risk stratification and resource allocation recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Vital Signs Assessment</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vital Signs Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Vital Signs</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SpO₂ (%)
                    </label>
                    <input 
                      type="number" 
                      name="spo2" 
                      min="0" 
                      max="100" 
                      required 
                      value={form.spo2} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="95"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Respiratory Rate (breaths/min)
                    </label>
                    <input 
                      type="number" 
                      name="rr" 
                      min="0" 
                      max="60" 
                      required 
                      value={form.rr} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="16"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heart Rate (bpm)
                    </label>
                    <input 
                      type="number" 
                      name="hr" 
                      min="0" 
                      max="250" 
                      required 
                      value={form.hr} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="80"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Systolic Blood Pressure (mmHg)
                    </label>
                    <input 
                      type="number" 
                      name="sbp" 
                      min="0" 
                      max="300" 
                      required 
                      value={form.sbp} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="120"
                    />
                  </div>
                </div>

                {/* GCS Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Glasgow Coma Scale</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Eye Opening (1-4)
                    </label>
                    <input 
                      type="number" 
                      name="gcs_eye" 
                      min="1" 
                      max="4" 
                      required 
                      value={form.gcs_eye} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="4"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verbal Response (1-5)
                    </label>
                    <input 
                      type="number" 
                      name="gcs_verbal" 
                      min="1" 
                      max="5" 
                      required 
                      value={form.gcs_verbal} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Motor Response (1-6)
                    </label>
                    <input 
                      type="number" 
                      name="gcs_motor" 
                      min="1" 
                      max="6" 
                      required 
                      value={form.gcs_motor} 
                      onChange={handleChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                      placeholder="6"
                    />
                  </div>
                </div>
              </div>

              {/* Patient Narrative Section */}
              <div className="mt-6 space-y-4">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Patient Narrative</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tell us what's going on
                  </label>
                  <textarea 
                    name="patient_narrative" 
                    rows={3}
                    value={form.patient_narrative} 
                    onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900" 
                    placeholder="Describe the patient's condition, symptoms, or mechanism of injury..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Provide additional context about the patient's condition or mechanism of injury.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Assessment...
                    </div>
                  ) : (
                    'Generate Risk Assessment'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Info */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>This assessment tool provides risk stratification and resource allocation recommendations based on clinical parameters.</p>
          </div>
        </div>
      </div>
    </EMSLayout>
  );
} 