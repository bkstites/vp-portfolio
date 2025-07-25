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
  },
  {
    title: 'New Castle County Government – Paramedic, Emergency Medical Services',
    period: '2012 – 2017',
    description: [
      'Delivered high-acuity care in emergency settings.',
      'Led incident documentation, compliance adherence, and team coordination.',
      'Trained new EMTs in electronic systems and emergency protocols.'
    ]
  }
];

function ProjectCard({ title, period, description }: { title: string, period: string, description: string[] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <span className="text-gray-500 text-sm mb-2 block">{period}</span>
      <ul className="list-disc list-inside text-gray-700">
        {description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Professional Experience</h1>
      {projects.map((proj, idx) => (
        <ProjectCard key={idx} {...proj} />
      ))}
    </main>
  );
} 