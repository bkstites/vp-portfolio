'use client';
import EMSLayout from '../layout';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResultsContent() {
  const params = useSearchParams();
  // Stub: just show the input values for now
  const fields = [
    { label: 'SpO₂ (%)', value: params.get('spo2') },
    { label: 'Respiratory Rate', value: params.get('rr') },
    { label: 'Heart Rate', value: params.get('hr') },
    { label: 'Systolic BP', value: params.get('sbp') },
    { label: 'GCS Eye', value: params.get('gcs_eye') },
    { label: 'GCS Verbal', value: params.get('gcs_verbal') },
    { label: 'GCS Motor', value: params.get('gcs_motor') },
  ];
  return (
    <section className="w-full max-w-2xl mx-auto text-center py-8 px-4">
      <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-4">Predicted Risk</h2>
      <div className="flex justify-center mb-6">
        <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold px-6 py-2 rounded-full text-lg shadow border border-gray-300 dark:border-gray-600">Not calculated (demo)</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {fields.map(f => (
          <div key={f.label} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 text-left border border-gray-200 dark:border-gray-700">
            <div className="font-semibold text-gray-800 dark:text-gray-200">{f.label}</div>
            <div className="text-xl font-bold text-blue-900 dark:text-blue-200">{f.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="font-semibold mb-2 text-gray-800 dark:text-gray-200">System Risk Chart (Coming Soon)</div>
        <div className="h-40 flex items-center justify-center">
          <img src="/file.svg" alt="Chart placeholder" className="h-24 opacity-40" />
        </div>
      </div>
      <div className="text-center mt-8">
        <a href="/ems-ai/triage" className="text-blue-700 dark:text-blue-300 hover:underline font-medium">Try another prediction</a>
      </div>
    </section>
  );
}

export default function EMSResultsPage() {
  return (
    <EMSLayout>
      <Suspense fallback={<div className="text-center py-12">Loading results...</div>}>
        <ResultsContent />
      </Suspense>
    </EMSLayout>
  );
} 