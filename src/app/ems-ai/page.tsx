import EMSLayout from './layout';
import Link from 'next/link';

export default function EMSHomePage() {
  return (
    <EMSLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Real-Time EMS Risk Triage Using AI</h1>
              <h2 className="text-xl text-gray-600 mb-4">Harnessing machine learning to empower pre-hospital emergency decision-making</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                This application demonstrates how AI can bridge technical gaps and make previously unachievable capabilities 
                accessible to regular people. Built during graduate studies in data science, this prototype showcases the 
                potential of AI to transform emergency medicine through real-world applications.
              </p>
            </div>
          </div>

          {/* Education & Motivation */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">From Education to Real-World Impact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">Graduate Education in Data Science</h4>
                <p className="text-blue-100 mb-4">
                  During my graduate studies, I developed a passion for applying machine learning to solve real-world problems. 
                  My background in emergency medicine provided unique insights into the challenges faced by pre-hospital providers.
                </p>
                <p className="text-blue-100">
                  This project represents the intersection of my clinical experience and technical education - demonstrating how 
                  AI can enhance rather than replace human expertise in critical situations.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Real-World AI Applications</h4>
                <p className="text-blue-100 mb-4">
                  This prototype showcases how AI can be used to reduce barriers to entry and give skills to people who 
                  wouldn't necessarily have them, reducing time to identification of risks in emergency situations.
                </p>
                <p className="text-blue-100">
                  The goal is to demonstrate how AI can empower lay people with "superpowers" - access to multi-functional 
                  tools that bridge technical gaps and make the previously unachievable achievable.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Tool Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Assessment</h3>
              <p className="text-gray-700 mb-4">
                This tool provides real-time risk assessment based on patient vital signs, Glasgow Coma Scale scores, 
                and narrative analysis. Designed for emergency medical personnel to support clinical decision-making in the field.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Risk Stratification</p>
                    <p className="text-sm text-gray-600">Automated assessment using validated emergency medicine scoring systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Narrative Analysis</p>
                    <p className="text-sm text-gray-600">AI-powered keyword detection and clinical insights from patient descriptions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Clinical Support</p>
                    <p className="text-sm text-gray-600">Evidence-based recommendations for field crews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assessment Parameters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Parameters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Vital Signs</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">SpO₂</span>
                      <span className="text-gray-600 ml-1">(% saturation)</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">Respiratory Rate</span>
                      <span className="text-gray-600 ml-1">(breaths/min)</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">Heart Rate</span>
                      <span className="text-gray-600 ml-1">(bpm)</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">Systolic BP</span>
                      <span className="text-gray-600 ml-1">(mmHg)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Glasgow Coma Scale</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">Eye Opening</span>
                      <span className="text-gray-600 ml-1">(1-4)</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">Verbal</span>
                      <span className="text-gray-600 ml-1">(1-5)</span>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="font-medium">Motor</span>
                      <span className="text-gray-600 ml-1">(1-6)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Patient Narrative</h4>
                  <div className="bg-gray-50 rounded p-2 text-sm">
                    <span className="font-medium">AI Analysis</span>
                    <span className="text-gray-600 ml-1">(keyword detection and clinical insights)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Features */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Machine Learning</h4>
                <p className="text-sm text-gray-600">Random Forest algorithm with 85% accuracy in risk classification</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Clinical Validation</h4>
                <p className="text-sm text-gray-600">Based on NEWS2 and MEOWS emergency medicine scoring systems</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-Time Analysis</h4>
                <p className="text-sm text-gray-600">Instant risk assessment with narrative insights and clinical recommendations</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Begin Patient Assessment</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Enter patient vital signs, Glasgow Coma Scale scores, and narrative to receive real-time risk assessment 
              and clinical recommendations powered by AI.
            </p>
            <Link 
              href="/ems-ai/triage" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Assessment
            </Link>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>This tool provides clinical decision support and should be used in conjunction with professional medical judgment.</p>
            <p className="mt-2">Built as a graduate school project to demonstrate real-world AI applications in emergency medicine.</p>
          </div>
        </div>
      </div>
    </EMSLayout>
  );
} 