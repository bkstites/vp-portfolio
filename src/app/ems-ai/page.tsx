import EMSLayout from './layout';
import Link from 'next/link';

export default function EMSHomePage() {
  return (
    <EMSLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          {/* Hero section with intense styling */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Main title with dramatic styling */}
            <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent animate-pulse">
              Real-Time EMS Risk Triage
            </h1>
            <h1 className="text-4xl sm:text-6xl font-black mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-pulse">
              Using AI
            </h1>

            {/* Subtitle with urgency */}
            <h2 className="text-xl sm:text-2xl text-blue-300 mb-8 font-semibold leading-relaxed">
              Harnessing machine learning to empower pre-hospital emergency decision-making.
            </h2>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-lg font-bold text-blue-200 mb-2">Real-Time Analysis</h3>
                <p className="text-blue-300 text-sm">Instant risk assessment powered by advanced ML algorithms</p>
              </div>
              <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-sm rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">🏥</div>
                <h3 className="text-lg font-bold text-red-200 mb-2">Medical Grade</h3>
                <p className="text-red-300 text-sm">Trained on real-world pre-hospital emergency data</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-green-200 mb-2">Precision Predictions</h3>
                <p className="text-green-300 text-sm">Accurate risk stratification for better patient outcomes</p>
              </div>
            </div>

            {/* Description with enhanced styling */}
            <div className="bg-gradient-to-r from-gray-900/80 to-blue-900/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-blue-500/30">
              <p className="text-lg text-gray-200 font-medium leading-relaxed">
                Enter vital signs and GCS scores to see real-time risk predictions powered by a trained machine learning model. This tool is designed for paramedics, researchers, and the public to better understand patient risk in the field.
              </p>
            </div>

            {/* Call to action with intense styling */}
            <div className="relative">
              <Link 
                href="/ems-ai/triage" 
                className="inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-blue-400 animate-pulse"
              >
                🚨 START TRIAGE NOW 🚨
              </Link>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-75 animate-pulse"></div>
            </div>

            {/* Additional info */}
            <div className="mt-8 text-center">
              <p className="text-blue-300 text-sm font-medium">
                ⚡ Powered by Advanced Machine Learning • 🏥 Medical Grade Accuracy • ⚡ Real-Time Processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </EMSLayout>
  );
} 