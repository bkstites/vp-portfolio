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

  function handleGCSChange(component: string, value: string) {
    setForm({ ...form, [component]: value });
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
                    Enter patient vital signs and complete the Glasgow Coma Scale assessment. This assessment will provide risk stratification and resource allocation recommendations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Patient Assessment</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Vital Signs Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vital Signs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              {/* Glasgow Coma Scale Section */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Glasgow Coma Scale Assessment</h3>
                
                {/* Eye Opening */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Eye Opening Response</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_eye" 
                        value="4" 
                        checked={form.gcs_eye === '4'} 
                        onChange={(e) => handleGCSChange('gcs_eye', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>4 - Spontaneous:</strong> Eyes open without stimulation
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_eye" 
                        value="3" 
                        checked={form.gcs_eye === '3'} 
                        onChange={(e) => handleGCSChange('gcs_eye', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>3 - To Voice:</strong> Eyes open to verbal command
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_eye" 
                        value="2" 
                        checked={form.gcs_eye === '2'} 
                        onChange={(e) => handleGCSChange('gcs_eye', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>2 - To Pain:</strong> Eyes open to painful stimulus
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_eye" 
                        value="1" 
                        checked={form.gcs_eye === '1'} 
                        onChange={(e) => handleGCSChange('gcs_eye', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>1 - None:</strong> No eye opening to any stimulus
                      </span>
                    </label>
                  </div>
                </div>

                {/* Verbal Response */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Verbal Response</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_verbal" 
                        value="5" 
                        checked={form.gcs_verbal === '5'} 
                        onChange={(e) => handleGCSChange('gcs_verbal', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>5 - Oriented:</strong> Patient is alert and oriented to person, place, and time
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_verbal" 
                        value="4" 
                        checked={form.gcs_verbal === '4'} 
                        onChange={(e) => handleGCSChange('gcs_verbal', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>4 - Confused:</strong> Patient responds but is confused or disoriented
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_verbal" 
                        value="3" 
                        checked={form.gcs_verbal === '3'} 
                        onChange={(e) => handleGCSChange('gcs_verbal', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>3 - Inappropriate Words:</strong> Patient speaks but words are inappropriate or random
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_verbal" 
                        value="2" 
                        checked={form.gcs_verbal === '2'} 
                        onChange={(e) => handleGCSChange('gcs_verbal', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>2 - Incomprehensible Sounds:</strong> Patient makes sounds but no words
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_verbal" 
                        value="1" 
                        checked={form.gcs_verbal === '1'} 
                        onChange={(e) => handleGCSChange('gcs_verbal', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>1 - None:</strong> No verbal response
                      </span>
                    </label>
                  </div>
                </div>

                {/* Motor Response */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Motor Response</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_motor" 
                        value="6" 
                        checked={form.gcs_motor === '6'} 
                        onChange={(e) => handleGCSChange('gcs_motor', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>6 - Obeys Commands:</strong> Patient follows simple commands
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_motor" 
                        value="5" 
                        checked={form.gcs_motor === '5'} 
                        onChange={(e) => handleGCSChange('gcs_motor', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>5 - Localizes Pain:</strong> Patient moves toward painful stimulus
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_motor" 
                        value="4" 
                        checked={form.gcs_motor === '4'} 
                        onChange={(e) => handleGCSChange('gcs_motor', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>4 - Withdraws from Pain:</strong> Patient pulls away from painful stimulus
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_motor" 
                        value="3" 
                        checked={form.gcs_motor === '3'} 
                        onChange={(e) => handleGCSChange('gcs_motor', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>3 - Flexion to Pain:</strong> Patient flexes in response to pain (decorticate)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_motor" 
                        value="2" 
                        checked={form.gcs_motor === '2'} 
                        onChange={(e) => handleGCSChange('gcs_motor', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>2 - Extension to Pain:</strong> Patient extends in response to pain (decerebrate)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="gcs_motor" 
                        value="1" 
                        checked={form.gcs_motor === '1'} 
                        onChange={(e) => handleGCSChange('gcs_motor', e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        <strong>1 - None:</strong> No motor response
                      </span>
                    </label>
                  </div>
                </div>

                {/* GCS Summary */}
                {form.gcs_eye && form.gcs_verbal && form.gcs_motor && (
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h5 className="text-sm font-medium text-blue-900 mb-2">GCS Summary</h5>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-blue-700">Eye:</span> {form.gcs_eye}/4
                      </div>
                      <div>
                        <span className="text-blue-700">Verbal:</span> {form.gcs_verbal}/5
                      </div>
                      <div>
                        <span className="text-blue-700">Motor:</span> {form.gcs_motor}/6
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-medium text-blue-900">
                      Total: {parseInt(form.gcs_eye) + parseInt(form.gcs_verbal) + parseInt(form.gcs_motor)}/15
                    </div>
                  </div>
                )}
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