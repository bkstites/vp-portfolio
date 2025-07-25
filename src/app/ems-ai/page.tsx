import EMSLayout from './layout';
import Link from 'next/link';

export default function EMSHomePage() {
  return (
    <EMSLayout>
      <section className="w-full max-w-2xl mx-auto text-center py-12 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-lg tracking-tight">Real-Time EMS Risk Triage Using AI</h1>
        <h2 className="text-xl sm:text-2xl text-blue-600 mb-8 font-medium">Harnessing machine learning to empower pre-hospital emergency decision-making.</h2>
        <p className="mb-8 text-lg text-gray-800 dark:text-gray-100 font-semibold">
          Enter vital signs and GCS scores to see real-time risk predictions powered by a trained machine learning model. This tool is designed for paramedics, researchers, and the public to better understand patient risk in the field.
        </p>
        <Link href="/ems-ai/triage" className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-800 transition">Start Triage</Link>
      </section>
    </EMSLayout>
  );
} 