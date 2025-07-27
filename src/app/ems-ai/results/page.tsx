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
    narrative_risk_score: searchParams.get('narrative_risk_score'),
    narrative_insights: searchParams.get('narrative_insights')?.split('|') || [],
  };

  // Determine risk badge color
  const getRiskBadgeColor = (risk: string | null) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get clinical recommendations based on risk level
  const getClinicalRecommendations = (riskLevel: string | null) => {
    switch (riskLevel) {
      case 'Critical':
        return {
          priority: 'Immediate',
          resources: 'ALS + Air Medical Consideration',
          transport: 'Trauma Center / Critical Care',
          monitoring: 'Continuous monitoring required',
          interventions: 'Advanced airway management, IV access, cardiac monitoring'
        };
      case 'High':
        return {
          priority: 'High',
          resources: 'ALS Required',
          transport: 'Trauma Center / Hospital',
          monitoring: 'Frequent reassessment',
          interventions: 'IV access, cardiac monitoring, frequent vitals'
        };
      case 'Moderate':
        return {
          priority: 'Moderate',
          resources: 'ALS Consideration',
          transport: 'Hospital',
          monitoring: 'Regular reassessment',
          interventions: 'IV access if needed, monitor for deterioration'
        };
      case 'Low':
        return {
          priority: 'Routine',
          resources: 'BLS Acceptable',
          transport: 'Hospital',
          monitoring: 'Standard monitoring',
          interventions: 'Continue current care, reassess as needed'
        };
      default:
        return {
          priority: 'Unknown',
          resources: 'Assess Further',
          transport: 'Hospital',
          monitoring: 'Reassess patient condition',
          interventions: 'Continue assessment'
        };
    }
  };

  const clinical = getClinicalRecommendations(results.risk_level);

  return (
    <EMSLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Risk Assessment Results</h1>
                <p className="text-gray-600 text-sm">Emergency Medical Services - Clinical Assessment</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Assessment ID</div>
                <div className="text-sm font-mono text-gray-700">EMS-{Date.now().toString().slice(-6)}</div>
              </div>
            </div>
          </div>

          {/* Overall Risk Assessment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Risk Stratification</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskBadgeColor(results.risk_level)}`}>
                {results.risk_level || 'Unknown'} Risk
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700">Response Priority</div>
                <div className="text-lg font-semibold text-gray-900">{clinical.priority}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700">Required Resources</div>
                <div className="text-sm font-semibold text-gray-900">{clinical.resources}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700">Transport Destination</div>
                <div className="text-sm font-semibold text-gray-900">{clinical.transport}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-700">Monitoring Level</div>
                <div className="text-sm font-semibold text-gray-900">{clinical.monitoring}</div>
              </div>
            </div>
          </div>

          {/* Clinical Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Vital Signs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Vital Signs</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">SpO₂</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.spo2}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Respiratory Rate</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.rr} bpm</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Heart Rate</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.hr} bpm</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Systolic BP</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.sbp} mmHg</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glasgow Coma Scale */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Glasgow Coma Scale</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Eye Opening</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.gcs_eye}/4</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Verbal Response</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.gcs_verbal}/5</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Motor Response</div>
                    <div className="text-lg font-semibold text-gray-900">{vitals.gcs_motor}/6</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Total Score</div>
                    <div className="text-lg font-semibold text-gray-900">{results.gcs_total}/15</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Scores */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Assessment Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* ROX Score */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">ROX Score</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(results.respiratory_risk)}`}>
                    {results.respiratory_risk}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{results.rox_score}</div>
                <p className="text-xs text-gray-500">SpO₂/FiO₂ ratio ÷ Respiratory Rate</p>
              </div>

              {/* GCS Score */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">GCS Total</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(results.neurological_risk)}`}>
                    {results.neurological_risk}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{results.gcs_total}/15</div>
                <p className="text-xs text-gray-500">Eye + Verbal + Motor Response</p>
              </div>

              {/* RPP Score */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">RPP Score</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(results.cardiovascular_risk)}`}>
                    {results.cardiovascular_risk}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{results.rpp_score?.toLocaleString()}</div>
                <p className="text-xs text-gray-500">Heart Rate × Systolic BP</p>
              </div>

              {/* Narrative Risk Score */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Narrative Risk</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                    parseInt(results.narrative_risk_score || '0') >= 20 ? 'bg-red-100 text-red-800 border-red-200' :
                    parseInt(results.narrative_risk_score || '0') >= 15 ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    parseInt(results.narrative_risk_score || '0') >= 8 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-green-100 text-green-800 border-green-200'
                  }`}>
                    {parseInt(results.narrative_risk_score || '0') >= 20 ? 'Critical' :
                     parseInt(results.narrative_risk_score || '0') >= 15 ? 'High' :
                     parseInt(results.narrative_risk_score || '0') >= 8 ? 'Moderate' :
                     parseInt(results.narrative_risk_score || '0') >= 3 ? 'Low' : 'None'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{results.narrative_risk_score || '0'}</div>
                <p className="text-xs text-gray-500">Keyword-based risk score</p>
              </div>
            </div>
          </div>

          {/* Clinical Recommendations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Recommendations</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Recommended Interventions:</strong> {clinical.interventions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Insights */}
          {results.narrative_insights && results.narrative_insights.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Insights</h3>
              <div className="space-y-3">
                {results.narrative_insights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {insight.includes('🚨') ? (
                        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : insight.includes('⚠️') ? (
                        <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/ems-ai/triage" 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center"
            >
              New Assessment
            </a>
            <a 
              href="/ems-ai/behind-model" 
              className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
            >
              About This Tool
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