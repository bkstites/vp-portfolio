import React from 'react';

const skills = [
  'VMWare', 'GoogleSuite', 'Microsoft 365', 'ServiceNow', 'S3', 'IAM', 'Cisco',
  'AWS', 'Snowflake', 'Postgres', 'Python', 'SQL', 'Jupyter Notebooks',
  'Jira', 'WDesk', 'Google Workspace', 'App Script',
];

const certifications = [
  'ITIL-aligned process knowledge',
  'Valid Driver’s License',
  'Active pursuit of M.S. in Business Analytics',
];

export default function SkillsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Technical Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {skills.map(skill => (
          <span key={skill} className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow">
            {skill}
          </span>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-2">Certifications & Education</h2>
      <ul className="list-disc list-inside">
        {certifications.map(cert => (
          <li key={cert}>{cert}</li>
        ))}
        <li>Rutgers University – Camden, NJ: M.S. in Business Analytics, Expected Dec 2025</li>
        <li>Rowan University – Glassboro, NJ: B.S. in Psychology & Neuroscience</li>
      </ul>
    </main>
  );
} 