import React from 'react';

export default function AIVisionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">AI Vision</h1>
        
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded shadow text-blue-900 text-center font-semibold">
          &quot;AI is the great equalizer—bringing advanced capabilities to every associate, and transforming data into action.&quot;
        </div>

        <p className="mb-6 text-lg text-gray-800 text-center">
          My vision is to demonstrate the transformative power of AI integration—showing how intelligent systems can give associates super powers that amplify their capabilities and drive unprecedented business impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-900 mb-3">The Super Power Effect</h3>
            <p className="text-green-800 mb-3">
              When AI is properly integrated into daily operations, associates gain abilities that were previously impossible:
            </p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Predictive Insights:</strong> See patterns before they become problems</li>
              <li>• <strong>Automated Intelligence:</strong> Let AI handle routine tasks while humans focus on strategy</li>
              <li>• <strong>Data Superpowers:</strong> Transform complex data into clear, actionable insights</li>
              <li>• <strong>Process Acceleration:</strong> Complete in minutes what used to take hours</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-purple-900 mb-3">Real Impact Examples</h3>
            <p className="text-purple-800 mb-3">
              Here&apos;s what AI integration actually delivers:
            </p>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• <strong>50% Reduction</strong> in manual data processing time</li>
              <li>• <strong>90% Accuracy</strong> in predictive risk assessments</li>
              <li>• <strong>Real-time Insights</strong> that drive immediate action</li>
              <li>• <strong>Empowered Teams</strong> making data-driven decisions</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-l-4 border-blue-500 mb-6">
          <h3 className="text-xl font-bold text-blue-900 mb-3">The AI Integration Approach</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800 mb-1">1</div>
              <div className="font-semibold text-blue-900">Identify Pain Points</div>
              <div className="text-blue-700">Find where associates struggle with data or repetitive tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800 mb-1">2</div>
              <div className="font-semibold text-blue-900">Design AI Solutions</div>
              <div className="text-blue-700">Build intuitive tools that amplify human capabilities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800 mb-1">3</div>
              <div className="font-semibold text-blue-900">Measure & Scale</div>
              <div className="text-blue-700">Track impact and expand successful implementations</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">See It In Action</h3>
          <p className="text-gray-700 mb-4">
            Experience how AI integration works in practice with our EMS Risk Triage tool—a real example of AI giving medical professionals super powers for better patient care.
          </p>
          <a 
            href="/ems-ai" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try the EMS AI Demo
          </a>
        </div>
      </div>
    </main>
  );
} 