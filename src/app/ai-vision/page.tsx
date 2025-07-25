import React from 'react';

export default function AIVisionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">AI Vision</h1>
        <p className="mb-6 text-lg text-gray-800 text-center">
          My vision for AI is simple: use it to bridge the technology gap for associates and turn data into business insights that drive real impact. AI should empower people, not replace them—giving teams the superpowers they need to make smarter decisions and deliver better outcomes.
        </p>
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded shadow text-blue-900 text-center font-semibold">
          &quot;AI is the great equalizer—bringing advanced capabilities to every associate, and transforming data into action.&quot;
        </div>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Turn raw data into meaningful, actionable metrics</li>
          <li>Empower associates with intuitive, AI-driven tools</li>
          <li>Bridge the technology gap for every team member</li>
          <li>Drive business processes with insight and intelligence</li>
        </ul>
        <p className="text-gray-700 text-center mt-4">
          My approach to AI is practical, ethical, and always people-first—focused on making technology accessible and impactful for everyone.
        </p>
      </div>
    </main>
  );
} 