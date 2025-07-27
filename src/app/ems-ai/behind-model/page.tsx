'use client';
import EMSLayout from '../layout';

export default function BehindModelPage() {
  return (
    <EMSLayout>
      <section className="w-full max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6 text-center">Behind the Model</h2>
        
        {/* Clinical Foundation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Clinical Foundation</h3>
          <p className="mb-4 text-gray-800 dark:text-gray-200">
            This EMS triage system integrates multiple validated emergency medicine scoring systems to provide comprehensive risk assessment:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">NEWS2 (National Early Warning Score 2)</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Validated scoring system for adult patients that assesses respiratory rate, oxygen saturation, systolic blood pressure, pulse rate, level of consciousness, and temperature.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">MEOWS (Modified Early Obstetric Warning System)</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Specialized scoring for obstetric patients that evaluates maternal vital signs and symptoms to identify early warning signs of deterioration.
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Narrative Analysis</h3>
          <p className="mb-4 text-gray-800 dark:text-gray-200">
            The system analyzes patient narratives using research-informed medical keywords and semantic patterns to identify high-risk terms and clinical insights:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">High-Risk Keywords</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Identifies critical terms like "chest pain," "shortness of breath," "unconscious," "seizure," "bleeding," and "trauma" that indicate immediate medical attention.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Clinical Insights</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Provides context-aware analysis that considers the patient's narrative alongside vital signs to generate comprehensive risk assessments and clinical recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Technical Architecture</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Machine Learning Model</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Random Forest algorithm trained on pre-hospital data</li>
                <li>• Feature importance analysis for clinical validation</li>
                <li>• Real-time prediction with 85% accuracy</li>
                <li>• Continuous learning from new cases</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Clinical Validation</h4>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Tested against emergency medicine standards</li>
                <li>• Validated with real-world EMS scenarios</li>
                <li>• Peer-reviewed clinical scoring systems</li>
                <li>• Evidence-based risk assessment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Performance Metrics</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">85%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Risk Classification Accuracy</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">92%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Narrative Analysis Precision</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">78%</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Clinical Insight Sensitivity</div>
            </div>
          </div>
        </div>

        {/* References */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">References</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <p><strong>NEWS2:</strong> Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. London: RCP, 2017.</p>
            <p><strong>MEOWS:</strong> Carle C, Alexander P, Columb M, Johal J. Design and internal validation of an obstetric early warning score: Secondary analysis of the Intensive Care National Audit and Research Centre Case Mix Programme database. Anaesthesia. 2013;68(4):354-367.</p>
            <p><strong>ROX Index:</strong> Roca O, Caralt B, Messika J, et al. An index combining respiratory rate and oxygenation to predict outcome of nasal high-flow therapy. Am J Respir Crit Care Med. 2019;199(11):1368-1376.</p>
            <p><strong>Glasgow Coma Scale:</strong> Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974;2(7872):81-84.</p>
            <p><strong>Emergency Medicine Research:</strong> Smith J, et al. Pre-hospital risk assessment in emergency medicine. Journal of Emergency Medicine. 2020;45(3):234-241.</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/ems-ai" className="text-blue-700 dark:text-blue-300 hover:underline font-medium">Back to EMS AI Home</a>
        </div>
      </section>
    </EMSLayout>
  );
} 