import EMSLayout from '../layout';
import Image from 'next/image';

export default function BehindModelPage() {
  return (
    <EMSLayout>
      <section className="w-full max-w-2xl mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Behind the Model</h2>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-200 text-center">
          This EMS triage tool uses a Random Forest machine learning model trained on real-world pre-hospital data. The model predicts patient risk based on vital signs and GCS scores, helping paramedics and researchers make informed decisions in the field.
        </p>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Feature Importance (Top 5)</h3>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-100">
            <li>SpO₂</li>
            <li>Respiratory Rate</li>
            <li>Heart Rate</li>
            <li>Systolic BP</li>
            <li>GCS Total</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 mb-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Model Confusion Matrix</h3>
          <div className="flex justify-center">
            <div className="h-40 w-64 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500">[Confusion Matrix Image]</div>
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="/ems-ai" className="text-blue-700 hover:underline font-medium">Back to EMS AI Home</a>
        </div>
      </section>
    </EMSLayout>
  );
} 