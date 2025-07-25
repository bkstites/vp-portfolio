import React from 'react';

export default function AIVisionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">AI Vision</h1>
        <p className="mb-6 text-lg text-gray-800 text-center">
          I see AI as a force multiplier for technologists and organizations. My vision is to harness AI to automate the mundane, surface actionable insights, and build smarter, more resilient systems—always with people at the center.
        </p>
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded shadow text-blue-900 text-center font-semibold">
          "Empowering teams with AI means giving them superpowers—faster decisions, proactive risk management, and seamless user experiences."
        </div>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Automate repetitive tasks to free up creative problem-solving</li>
          <li>Enhance data-driven decision making at every level</li>
          <li>Proactively identify and mitigate risks</li>
          <li>Deliver more reliable, adaptive systems for real-world users</li>
        </ul>
        <p className="text-gray-700 text-center mt-4">
          My approach to AI is practical, ethical, and focused on real business value—empowering technologists to do their best work and drive meaningful change.
        </p>
      </div>
    </main>
  );
} 