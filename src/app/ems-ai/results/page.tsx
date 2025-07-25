'use client';
import { Suspense } from 'react';
import EMSLayout from '../layout';
import { useSearchParams } from 'next/navigation';

function ResultsContent() {
  const searchParams = useSearchParams();
  
  // Extract vital signs
  const vitals = {
    spo2: searchParams.get('spo2'),
    rr: searchParams.get('rr'),
    hr: searchParams.get('hr'),
    sbp: searchParams.get('sbp'),
    gcs_eye: searchParams.get('gcs_eye'),
    gcs_verbal: searchParams.get('gcs_verbal'),
    gcs_motor: searchParams.get('gcs_motor'),
  };

  // Extract prediction results
  const results = {
    rox_score: searchParams.get('rox_score'),
    gcs_total: searchParams.get('gcs_total'),
    rpp_score: searchParams.get('rpp_score'),
    respiratory_risk: searchParams.get('respiratory_risk'),
    neurological_risk: searchParams.get('neurological_risk'),
    cardiovascular_risk: searchParams.get('cardiovascular_risk'),
    overall_risk: searchParams.get('overall_risk'),
    risk_level: searchParams.get('risk_level'),
  };

  // Determine risk badge color
  const getRiskBadgeColor = (risk: string | null) => {
    switch (risk) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Moderate': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Get dispatch recommendations based on risk level
  const getDispatchRecommendations = (riskLevel: string | null) => {
    switch (riskLevel) {
      case 'Critical':
        return {
          priority: 'IMMEDIATE',
          resources: 'ALS + Air Medical Consideration',
          transport: 'Trauma Center / Critical Care',
          guidance: 'Expedite transport, consider air medical if available'
        };
      case 'High':
        return {
          priority: 'HIGH',
          resources: 'ALS Required',
          transport: 'Trauma Center / Hospital',
          guidance: 'ALS transport recommended, monitor closely'
        };
      case 'Moderate':
        return {
          priority: 'MODERATE',
          resources: 'ALS Consideration',
          transport: 'Hospital',
          guidance: 'Consider ALS upgrade, standard transport acceptable'
        };
      case 'Low':
        return {
          priority: 'ROUTINE',
          resources: 'BLS Acceptable',
          transport: 'Hospital',
          guidance: 'BLS transport appropriate, continue monitoring'
        };
      default:
        return {
          priority: 'UNKNOWN',
          resources: 'Assess Further',
          transport: 'Hospital',
          guidance: 'Reassess patient condition'
        };
    }
  };

  const dispatch = getDispatchRecommendations(results.risk_level);

  return (
    <EMSLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
        <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-4xl w-full">
          <h1 className="text-4xl font-extrabold text-red-900 mb-4 drop-shadow-lg tracking-tight text-center">DISPATCH ASSESSMENT RESULTS</h1>
          
          {/* Overall Risk Badge */}
          <div className="text-center mb-8">
            <span className={`inline-block px-6 py-3 rounded-full text-xl font-bold shadow-lg ${getRiskBadgeColor(results.risk_level)}`}>
              {results.risk_level || 'Unknown'} RISK PATIENT
            </span>
          </div>

          {/* Dispatch Recommendations */}
          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6 rounded shadow">
            <h2 className="text-2xl font-bold text-red-900 mb-4">🚨 DISPATCH RECOMMENDATIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-red-800">Response Priority: <span className="text-red-600">{dispatch.priority}</span></h3>
                <p className="text-red-700 text-sm">Recommended resource level and urgency</p>
              </div>
              <div>
                <h3 className="font-bold text-red-800">Required Resources: <span className="text-red-600">{dispatch.resources}</span></h3>
                <p className="text-red-700 text-sm">Personnel and equipment needs</p>
              </div>
              <div>
                <h3 className="font-bold text-red-800">Transport Destination: <span className="text-red-600">{dispatch.transport}</span></h3>
                <p className="text-red-700 text-sm">Recommended facility type</p>
              </div>
              <div>
                <h3 className="font-bold text-red-800">Field Guidance: <span className="text-red-600">{dispatch.guidance}</span></h3>
                <p className="text-red-700 text-sm">Immediate action recommendations</p>
              </div>
            </div>
          </div>

          {/* Vital Signs Summary */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">📊 PATIENT VITALS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600">SpO₂</div>
                <div className="text-xl font-bold text-blue-900">{vitals.spo2}%</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Respiratory Rate</div>
                <div className="text-xl font-bold text-blue-900">{vitals.rr} bpm</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Heart Rate</div>
                <div className="text-xl font-bold text-blue-900">{vitals.hr} bpm</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">Systolic BP</div>
                <div className="text-xl font-bold text-blue-900">{vitals.sbp} mmHg</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">GCS Eye</div>
                <div className="text-xl font-bold text-blue-900">{vitals.gcs_eye}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">GCS Verbal</div>
                <div className="text-xl font-bold text-blue-900">{vitals.gcs_verbal}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">GCS Motor</div>
                <div className="text-xl font-bold text-blue-900">{vitals.gcs_motor}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">GCS Total</div>
                <div className="text-xl font-bold text-blue-900">{results.gcs_total}/15</div>
              </div>
            </div>
          </div>

          {/* Risk Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* ROX Score */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-2">ROX Score</h3>
              <div className="text-3xl font-bold text-blue-800 mb-2">{results.rox_score}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskBadgeColor(results.respiratory_risk)}`}>
                {results.respiratory_risk} Respiratory Risk
              </div>
              <p className="text-sm text-blue-700 mt-2">SpO₂/FiO₂ ratio ÷ Respiratory Rate</p>
            </div>

            {/* GCS Score */}
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-green-900 mb-2">GCS Total</h3>
              <div className="text-3xl font-bold text-green-800 mb-2">{results.gcs_total}/15</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskBadgeColor(results.neurological_risk)}`}>
                {results.neurological_risk} Neurological Risk
              </div>
              <p className="text-sm text-green-700 mt-2">Eye + Verbal + Motor Response</p>
            </div>

            {/* RPP Score */}
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-purple-900 mb-2">RPP Score</h3>
              <div className="text-3xl font-bold text-purple-800 mb-2">{results.rpp_score?.toLocaleString()}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskBadgeColor(results.cardiovascular_risk)}`}>
                {results.cardiovascular_risk} Cardiovascular Risk
              </div>
              <p className="text-sm text-purple-700 mt-2">Heart Rate × Systolic BP</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/ems-ai/triage" 
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-center"
            >
              🚨 New Assessment
            </a>
            <a 
              href="/ems-ai/behind-model" 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition text-center"
            >
              📋 About This Tool
            </a>
          </div>
        </div>
      </div>
    </EMSLayout>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
} 