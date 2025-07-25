import EMSLayout from '../layout';
import { useSearchParams } from 'next/navigation';

export default function EMSResultsPage() {
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
    <EMSLayout>
      <section className="w-full max-w-2xl mx-auto text-center py-8 px-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Predicted Risk (Stub)</h2>
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-yellow-200 text-yellow-900 font-bold px-6 py-2 rounded-full text-lg shadow">Risk: (Stub)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {fields.map(f => (
            <div key={f.label} className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 text-left">
              <div className="font-semibold text-gray-700 dark:text-gray-200">{f.label}</div>
              <div className="text-xl font-bold text-blue-800 dark:text-blue-200">{f.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 mb-6">
          <div className="font-semibold mb-2">System Risk Chart (Coming Soon)</div>
          <div className="h-40 flex items-center justify-center text-gray-400">[Radar/Bar Chart Placeholder]</div>
        </div>
        <div className="text-center mt-8">
          <a href="/ems-ai/triage" className="text-blue-700 hover:underline font-medium">Try another prediction</a>
        </div>
      </section>
    </EMSLayout>
  );
} 