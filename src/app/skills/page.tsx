import React from 'react';

const skills = [
  'Infrastructure Leadership',
  'Cloud & On-Prem Architecture',
  'Automation & Analytics',
  'Risk Management',
  'Team Building & Mentorship',
  'Vendor & Stakeholder Relations',
  'AWS', 'Snowflake', 'Python', 'SQL', 'ServiceNow', 'Microsoft 365', 'VMWare',
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">My Strengths</h1>
        <p className="mb-6 text-lg text-gray-800 text-center">
          I lead with a blend of technical depth and people-first leadership. My experience spans cloud and on-prem infrastructure, automation, risk management, and building high-performing teams. I believe in empowering technologists to do their best work—by providing clarity, mentorship, and the right tools.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {skills.map(skill => (
            <span key={skill} className="inline-block bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-200 transition cursor-pointer" tabIndex={0} aria-label={skill}>{skill}</span>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-blue-800 mb-2 drop-shadow">Education</h2>
          <p className="text-gray-700">M.S. in Business Analytics, Rutgers University (Expected Dec 2025)</p>
          <p className="text-gray-700">B.S. in Psychology & Neuroscience, Rowan University</p>
        </div>
      </div>
    </main>
  );
} 