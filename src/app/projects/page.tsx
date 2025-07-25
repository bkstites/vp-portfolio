import React from 'react';

const projects = [
  {
    title: 'Capital One – Risk Manager, SOX Analytics & Reporting',
    period: '2021 – Present',
    description: [
      'Lead a 12-person team responsible for SOX control testing, ITGC evaluation, and analytics across 500+ cloud-native controls.',
      'Developed Snowflake/Python automation for IAM reconciliation, cutting manual review time by 60%.',
      'Oversaw policy analysis for 1,500+ S3 buckets to improve data governance.',
      'Transitioned controls from spreadsheets to Python/SQL-based audit tooling.'
    ]
  },
  {
    title: 'Capital One – Sr. Associate → Principal Associate, Technology Risk Management',
    period: '2018 – 2021',
    description: [
      'Conducted infrastructure risk assessments across AWS and on-prem systems.',
      'Built and maintained centralized control dashboards for infrastructure SLAs and risk exposure.',
      'Led workshops to streamline issue resolution and clarify control ownership.'
    ]
  },
  {
    title: 'Mauricetown Truck Repair – Business Systems Administrator',
    period: '2017 – 2021',
    description: [
      'Designed and maintained the company’s entire IT infrastructure.',
      'Directed vendor management and negotiated contracts.',
      'Executed Office 365 migration and implemented endpoint management systems.'
    ]
  }
];

const ProjectCard = ({ title, period, description }: { title: string, period: string, description: string[] }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-transform transform hover:-translate-y-1 hover:shadow-2xl border border-gray-100">
    <h3 className="text-2xl font-bold text-blue-800 mb-1 tracking-tight">{title}</h3>
    <span className="text-gray-500 text-sm mb-2 block">{period}</span>
    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
      {description.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-10 text-center drop-shadow-lg tracking-tight">Professional Experience</h1>
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </main>
  );
} 