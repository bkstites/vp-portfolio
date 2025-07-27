import React from 'react';

const projects = [
  {
    title: 'Capital One – Risk Manager, SOX Analytics & Reporting',
    period: '2019 – Present',
    impact: 'Transformed risk management by building data-driven insights and empowering teams with automation and AI.',
    description: [
      'Led a 12-person team to deliver actionable metrics and analytics for 500+ cloud-native controls, driving smarter business decisions.',
      'Automated IAM reconciliation with Snowflake/Python, reducing manual review time by 60% and enabling real-time insights.',
      'Improved data governance by overseeing policy analysis for 1,500+ S3 buckets, making data more accessible and secure.',
      'Transitioned controls from spreadsheets to Python/SQL-based audit tooling, empowering associates with modern, AI-enabled processes.',
      'Built KPI dashboards and leadership reporting in AWS QuickSight to articulate risks and drive strategic decision-making.'
    ]
  },
  {
    title: 'Capital One – Business Systems Analyst',
    period: '2013 – 2019',
    impact: 'Enabled business growth and compliance by translating data into insights and fostering a culture of continuous improvement.',
    description: [
      'Conducted risk assessments and built dashboards that turned infrastructure data into actionable business intelligence.',
      'Collaborated across teams to clarify ownership and streamline processes, empowering associates to resolve issues faster.',
      'Supported automation projects that made compliance and onboarding more intuitive for everyone.',
      'Developed data pipelines and analytics solutions to support risk management and compliance initiatives.'
    ]
  },
  {
    title: 'Emergency Medical Services – Paramedic',
    period: '2010 – 2013',
    impact: 'Provided critical pre-hospital emergency care and developed expertise in rapid assessment and clinical decision-making.',
    description: [
      'Delivered advanced life support interventions in high-pressure emergency situations.',
      'Conducted rapid patient assessments and implemented evidence-based treatment protocols.',
      'Collaborated with hospital teams to ensure seamless patient care transitions.',
      'Mentored EMT students and contributed to continuous improvement of emergency response protocols.'
    ]
  },
  {
    title: 'Emergency Medical Services – Emergency Room Technician',
    period: '2009 – 2010',
    impact: 'Supported emergency department operations and gained hands-on experience in acute care settings.',
    description: [
      'Assisted physicians and nurses with patient care procedures and emergency interventions.',
      'Performed diagnostic tests and monitored patient vital signs in high-acuity situations.',
      'Maintained emergency equipment and ensured readiness for critical care scenarios.',
      'Developed strong clinical assessment skills and emergency response capabilities.'
    ]
  },
  {
    title: 'Emergency Medical Services – Emergency Medical Technician',
    period: '2006 – 2008',
    impact: 'Provided basic life support and emergency response services in pre-hospital settings.',
    description: [
      'Responded to emergency calls and provided basic life support interventions.',
      'Conducted patient assessments and implemented BLS protocols under medical direction.',
      'Maintained emergency vehicles and equipment to ensure operational readiness.',
      'Developed foundational skills in emergency medicine and patient care.'
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
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">
            A diverse career spanning emergency medicine, technology, and business leadership - demonstrating adaptability, 
            critical thinking, and the ability to excel in high-pressure environments.
          </p>
        </div>
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </main>
  );
} 