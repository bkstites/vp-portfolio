'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function getRiskBadgeColor(risk: string) {
  switch (risk) {
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Moderate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getClinicalRecommendations(riskLevel: string, chiefComplaint: string, medicalHistory: string) {
  const recommendations = {
    transport_destination: '',
    monitoring_level: '',
    interventions: '',
    special_considerations: '',
  };

  switch (riskLevel) {
    case 'Critical':
      recommendations.transport_destination = 'Trauma Center or Cardiac Center';
      recommendations.monitoring_level = 'Continuous monitoring with ALS';
      recommendations.interventions = 'Immediate ALS interventions, consider advanced airway, IV access';
      recommendations.special_considerations = 'Prepare for rapid deterioration, notify receiving facility';
      break;
    case 'High':
      recommendations.transport_destination = 'Hospital ED';
      recommendations.monitoring_level = 'Frequent reassessment (every 5-10 minutes)';
      recommendations.interventions = 'ALS monitoring, IV access if needed, prepare for escalation';
      recommendations.special_considerations = 'Monitor for deterioration, consider ALS upgrade';
      break;
    case 'Moderate':
      recommendations.transport_destination = 'Hospital ED';
      recommendations.monitoring_level = 'Regular reassessment (every 15 minutes)';
      recommendations.interventions = 'BLS care with ALS consideration';
      recommendations.special_considerations = 'Monitor trends, prepare for escalation if needed';
      break;
    case 'Low':
      recommendations.transport_destination = 'Hospital ED or Urgent Care';
      recommendations.monitoring_level = 'Standard monitoring';
      recommendations.interventions = 'BLS care, comfort measures';
      recommendations.special_considerations = 'Routine transport, monitor for changes';
      break;
  }

  return recommendations;
}

function generateNarrativeInsights(
  riskLevel: string,
  respiratoryRisk: string,
  cardiovascularRisk: string,
  neurologicalRisk: string,
  chiefComplaint: string,
  medicalHistory: string,
  medications: string,
  allergies: string
) {
  const insights = [];

  // Chief complaint analysis
  if (chiefComplaint.toLowerCase().includes('chest pain')) {
    insights.push('🚨 **Cardiac concern**: Chest pain with elevated risk requires immediate cardiac evaluation');
  }
  if (chiefComplaint.toLowerCase().includes('breathing') || chiefComplaint.toLowerCase().includes('dyspnea')) {
    insights.push('🫁 **Respiratory distress**: Monitor airway and oxygenation closely');
  }
  if (chiefComplaint.toLowerCase().includes('fall') || chiefComplaint.toLowerCase().includes('trauma')) {
    insights.push('🦴 **Trauma mechanism**: Assess for associated injuries and neurological changes');
  }

  // Medical history insights
  if (medicalHistory.toLowerCase().includes('diabetes')) {
    insights.push('💉 **Diabetic patient**: Check blood glucose, monitor for DKA or hypoglycemia');
  }
  if (medicalHistory.toLowerCase().includes('heart') || medicalHistory.toLowerCase().includes('cardiac')) {
    insights.push('❤️ **Cardiac history**: Increased risk for cardiac events, monitor ECG');
  }
  if (medicalHistory.toLowerCase().includes('copd') || medicalHistory.toLowerCase().includes('asthma')) {
    insights.push('🫁 **Respiratory history**: Monitor for exacerbation, consider bronchodilators');
  }

  // Medication insights
  if (medications.toLowerCase().includes('blood thinner') || medications.toLowerCase().includes('warfarin') || medications.toLowerCase().includes('coumadin')) {
    insights.push('🩸 **Anticoagulation**: Increased bleeding risk, monitor for hemorrhage');
  }
  if (medications.toLowerCase().includes('insulin')) {
    insights.push('💉 **Insulin dependent**: Check blood glucose, monitor for hypo/hyperglycemia');
  }

  // Allergy insights
  if (allergies && allergies.trim()) {
    insights.push('⚠️ **Allergies present**: Document and communicate to receiving facility');
  }

  // Risk-specific insights
  if (respiratoryRisk === 'Critical' || respiratoryRisk === 'High') {
    insights.push('🫁 **Respiratory compromise**: Prepare for airway management, consider advanced airway');
  }
  if (cardiovascularRisk === 'Critical' || cardiovascularRisk === 'High') {
    insights.push('❤️ **Cardiovascular instability**: Monitor ECG, prepare for cardiac interventions');
  }
  if (neurologicalRisk === 'Critical' || neurologicalRisk === 'High') {
    insights.push('🧠 **Neurological concern**: Monitor GCS trends, prepare for neurological deterioration');
  }

  return insights;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  
  const vitals = {
    spo2: searchParams.get('spo2') || '',
    rr: searchParams.get('rr') || '',
    hr: searchParams.get('hr') || '',
    sbp: searchParams.get('sbp') || '',
    gcs_eye: searchParams.get('gcs_eye') || '',
    gcs_verbal: searchParams.get('gcs_verbal') || '',
    gcs_motor: searchParams.get('gcs_motor') || '',
  };

  const patientHistory = {
    chief_complaint: searchParams.get('chief_complaint') || '',
    medical_history: searchParams.get('medical_history') || '',
    medications: searchParams.get('medications') || '',
    allergies: searchParams.get('allergies') || '',
    last_oral_intake: searchParams.get('last_oral_intake') || '',
    events_leading_to_incident: searchParams.get('events_leading_to_incident') || '',
  };

  const riskLevel = searchParams.get('risk_level') || 'Low';
  const respiratoryRisk = searchParams.get('respiratory_risk') || 'Low';
  const cardiovascularRisk = searchParams.get('cardiovascular_risk') || 'Low';
  const neurologicalRisk = searchParams.get('neurological_risk') || 'Low';
  
  const roxScore = searchParams.get('rox_score') || '0';
  const gcsTotal = searchParams.get('gcs_total') || '0';
  const rppScore = searchParams.get('rpp_score') || '0';

  const recommendations = getClinicalRecommendations(riskLevel, patientHistory.chief_complaint, patientHistory.medical_history);
  const narrativeInsights = generateNarrativeInsights(
    riskLevel,
    respiratoryRisk,
    cardiovascularRisk,
    neurologicalRisk,
    patientHistory.chief_complaint,
    patientHistory.medical_history,
    patientHistory.medications,
    patientHistory.allergies
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Risk Assessment Results</h1>
            <p className="text-gray-600">Clinical decision support based on patient assessment</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Risk Assessment */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Risk Assessment</h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskBadgeColor(riskLevel)}`}>
                    {riskLevel} Risk
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Assessment ID: EMS-{Date.now().toString().slice(-6)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-sm font-medium text-gray-700">Response Priority</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {riskLevel === 'Critical' ? 'Immediate' : riskLevel === 'High' ? 'High' : riskLevel === 'Moderate' ? 'Moderate' : 'Routine'}
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-sm font-medium text-gray-700">Required Resources</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {riskLevel === 'Critical' ? 'ALS Required' : riskLevel === 'High' ? 'ALS Consideration' : 'BLS'}
                  </div>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <div className="text-sm font-medium text-gray-700">Transport Destination</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {recommendations.transport_destination}
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Data */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Data</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vital Signs */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Vital Signs</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">SpO₂:</span>
                      <span className="font-medium">{vitals.spo2}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Respiratory Rate:</span>
                      <span className="font-medium">{vitals.rr} bpm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Heart Rate:</span>
                      <span className="font-medium">{vitals.hr} bpm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Systolic BP:</span>
                      <span className="font-medium">{vitals.sbp} mmHg</span>
                    </div>
                  </div>
                </div>

                {/* Glasgow Coma Scale */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Glasgow Coma Scale</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eye Opening:</span>
                      <span className="font-medium">{vitals.gcs_eye}/4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verbal Response:</span>
                      <span className="font-medium">{vitals.gcs_verbal}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Motor Response:</span>
                      <span className="font-medium">{vitals.gcs_motor}/6</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 font-medium">Total:</span>
                      <span className="font-bold text-lg">{gcsTotal}/15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Assessment Scores */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Assessment Scores</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">ROX Score</h3>
                  <div className="text-2xl font-bold text-blue-900 mb-1">{roxScore}</div>
                  <div className="text-xs text-blue-700">SpO₂/FiO₂ ratio ÷ RR</div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRiskBadgeColor(respiratoryRisk)}`}>
                    {respiratoryRisk}
                  </span>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-900 mb-2">GCS Total</h3>
                  <div className="text-2xl font-bold text-green-900 mb-1">{gcsTotal}/15</div>
                  <div className="text-xs text-green-700">Eye + Verbal + Motor</div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRiskBadgeColor(neurologicalRisk)}`}>
                    {neurologicalRisk}
                  </span>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-900 mb-2">RPP Score</h3>
                  <div className="text-2xl font-bold text-purple-900 mb-1">{rppScore}</div>
                  <div className="text-xs text-purple-700">HR × Systolic BP</div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRiskBadgeColor(cardiovascularRisk)}`}>
                    {cardiovascularRisk}
                  </span>
                </div>
              </div>
            </div>

            {/* Clinical Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Clinical Recommendations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Monitoring Level</h3>
                  <p className="text-gray-900">{recommendations.monitoring_level}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Interventions</h3>
                  <p className="text-gray-900">{recommendations.interventions}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Special Considerations</h3>
                  <p className="text-gray-900">{recommendations.special_considerations}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient History & Narrative Insights */}
          <div className="space-y-8">
            {/* Patient History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient History</h2>
              
              <div className="space-y-4">
                {patientHistory.chief_complaint && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Chief Complaint</h3>
                    <p className="text-gray-900 text-sm">{patientHistory.chief_complaint}</p>
                  </div>
                )}
                
                {patientHistory.events_leading_to_incident && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Events Leading to Incident</h3>
                    <p className="text-gray-900 text-sm">{patientHistory.events_leading_to_incident}</p>
                  </div>
                )}
                
                {patientHistory.medical_history && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Medical History</h3>
                    <p className="text-gray-900 text-sm">{patientHistory.medical_history}</p>
                  </div>
                )}
                
                {patientHistory.medications && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Current Medications</h3>
                    <p className="text-gray-900 text-sm">{patientHistory.medications}</p>
                  </div>
                )}
                
                {patientHistory.allergies && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Allergies</h3>
                    <p className="text-gray-900 text-sm">{patientHistory.allergies}</p>
                  </div>
                )}
                
                {patientHistory.last_oral_intake && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-1">Last Oral Intake</h3>
                    <p className="text-gray-900 text-sm">{patientHistory.last_oral_intake}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Narrative Insights */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Clinical Insights & Focus Areas</h2>
              
              {narrativeInsights.length > 0 ? (
                <div className="space-y-3">
                  {narrativeInsights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-900" dangerouslySetInnerHTML={{ __html: insight }}></p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-blue-700">No specific clinical insights identified. Continue standard monitoring.</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-3">
                <Link
                  href="/ems-ai/triage"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Assessment
                </Link>
                
                <Link
                  href="/ems-ai"
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
} 