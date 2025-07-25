import React from 'react';

const projects = [
  {
    title: 'Capital One – Risk Manager, SOX Analytics & Reporting',
    period: '2021 – Present',
    impact: 'Driving operational excellence and risk reduction through data-driven leadership and automation.',
    description: [
      'Led a 12-person team to deliver SOX control testing and analytics for 500+ cloud-native controls, ensuring compliance and uptime.',
      'Automated IAM reconciliation with Snowflake/Python, reducing manual review time by 60% and boosting audit reliability.',
      'Improved data governance by overseeing policy analysis for 1,500+ S3 buckets.',
      'Transitioned controls from spreadsheets to Python/SQL-based audit tooling, increasing automation and repeatability.'
    ]
  },
  {
    title: 'Capital One – Sr. Associate → Principal Associate, Technology Risk Management',
    period: '2018 – 2021',
    impact: 'Enabled resilient infrastructure and compliance through cross-team collaboration and risk management.',
    description: [
      'Conducted infrastructure risk assessments across AWS and on-prem systems.',
      'Built and maintained centralized control dashboards for infrastructure SLAs and risk exposure.',
      'Led workshops to streamline issue resolution and clarify control ownership.'
    ]
  },
  {
    title: 'Mauricetown Truck Repair – Business Systems Administrator',
    period: '2017 – 2021',
    impact: 'Modernized IT operations and empowered business growth through hands-on leadership and vendor management.',
    description: [
      'Designed and maintained the company’s entire IT infrastructure.',
      'Directed vendor management and negotiated contracts.',
      'Executed Office 365 migration and implemented endpoint management systems.'
    ]
  }
];

const checkIcon = (
  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

const ProjectCard = ({ title, period, impact, description }: { title: string, period: string, impact: string, description: string[] }) => (
  <div className="bg-gradient-to-br from-blue-100 via-white to-gray-50 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border-l-8 border-blue-700 flex flex-col max-w-xl mx-auto w-full">
    <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-800 mb-1 tracking-tight leading-tight">{title}</h3>
    <span className="text-gray-600 text-sm sm:text-base mb-2 block font-semibold">{period}</span>
    <p className="mb-4 text-base sm:text-lg text-blue-900 font-medium italic leading-snug">{impact}</p>
    <ul className="space-y-2 text-gray-800">
      {description.map((item, idx) => (
        <li key={idx} className="flex items-start">
          {checkIcon}
          <span className="ml-2 text-sm sm:text-base leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-8 px-2 sm:py-12 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-900 mb-8 sm:mb-10 text-center drop-shadow-lg tracking-tight">Professional Experience</h1>
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </main>
  );
} 