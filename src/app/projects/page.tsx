'use client';
import React, { useState } from 'react';

const careerTimeline = [
  {
    period: '2006-2008',
    title: 'Emergency Medical Technician',
    organization: 'Emergency Medical Services',
    industry: 'Healthcare',
    skills: ['Patient Assessment', 'Emergency Response', 'Critical Thinking', 'Team Coordination'],
    impact: 'Developed foundational skills in rapid assessment and emergency response under pressure.',
    description: 'Provided basic life support and emergency response services in pre-hospital settings, developing critical skills in patient assessment, emergency protocols, and team coordination.'
  },
  {
    period: '2009-2010',
    title: 'Emergency Room Technician',
    organization: 'Emergency Medical Services',
    industry: 'Healthcare',
    skills: ['Acute Care', 'Clinical Procedures', 'Medical Technology', 'Patient Monitoring'],
    impact: 'Gained hands-on experience in acute care settings and medical technology integration.',
    description: 'Supported emergency department operations, assisting with patient care procedures and diagnostic tests in high-acuity situations.'
  },
  {
    period: '2010-2013',
    title: 'Paramedic',
    organization: 'Emergency Medical Services',
    industry: 'Healthcare',
    skills: ['Advanced Life Support', 'Clinical Decision Making', 'Leadership', 'Crisis Management'],
    impact: 'Led emergency response teams and developed expertise in rapid clinical decision-making.',
    description: 'Delivered advanced life support interventions in high-pressure emergency situations, mentoring EMT students and contributing to protocol improvements.'
  },
  {
    period: '2013-2019',
    title: 'Business Systems Analyst',
    organization: 'Capital One',
    industry: 'Technology & Finance',
    skills: ['Data Analysis', 'Process Improvement', 'Stakeholder Management', 'Technical Translation'],
    impact: 'Bridged technology and business needs, translating data into actionable insights.',
    description: 'Conducted risk assessments and built dashboards that turned infrastructure data into actionable business intelligence, developing strong analytical and communication skills.'
  },
  {
    period: '2019-Present',
    title: 'Risk Manager, SOX Analytics & Reporting',
    organization: 'Capital One',
    industry: 'Technology & Finance',
    skills: ['Risk Management', 'Team Leadership', 'AI Integration', 'Strategic Analytics'],
    impact: 'Transformed risk management through data-driven insights and AI-powered automation.',
    description: 'Led a 12-person team delivering actionable metrics for 500+ cloud-native controls, building KPI dashboards in AWS QuickSight and empowering teams with modern AI-enabled processes.'
  }
];

const skillCategories: Record<string, string[]> = {
  'Leadership & Management': ['Team Leadership', 'Crisis Management', 'Stakeholder Management'],
  'Technical & Analytical': ['Data Analysis', 'Technical Translation', 'Strategic Analytics', 'AI Integration'],
  'Healthcare & Clinical': ['Patient Assessment', 'Acute Care', 'Advanced Life Support', 'Clinical Decision Making'],
  'Emergency Response': ['Emergency Response', 'Critical Thinking', 'Team Coordination', 'Process Improvement']
};

export default function ProjectsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(careerTimeline[0]);
  const [activeSkillCategory, setActiveSkillCategory] = useState('Leadership & Management');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-blue-900 mb-6 drop-shadow-lg tracking-tight">
            Professional Journey
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            A diverse career spanning emergency medicine, technology, and business leadership - demonstrating adaptability, 
            critical thinking, and the ability to excel in high-pressure environments across industries.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Career Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {careerTimeline.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedPeriod(item)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  selectedPeriod === item
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <div className="text-sm font-semibold">{item.period}</div>
                <div className="text-xs opacity-80">{item.industry}</div>
              </button>
            ))}
          </div>

          {/* Selected Period Details */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">{selectedPeriod.title}</h3>
                <p className="text-blue-700 font-semibold mb-2">{selectedPeriod.organization}</p>
                <p className="text-gray-600 mb-4">{selectedPeriod.description}</p>
                <div className="bg-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Key Impact</h4>
                  <p className="text-blue-800">{selectedPeriod.impact}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Skills Developed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPeriod.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Development Across Industries */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Skill Development Across Industries</h2>
          
          {/* Skill Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSkillCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skill Development Visualization */}
          <div className="grid md:grid-cols-5 gap-4">
            {careerTimeline.map((period, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-semibold text-gray-700 mb-2">{period.period}</div>
                <div className="bg-gray-100 rounded-lg p-3 min-h-[120px]">
                  {skillCategories[activeSkillCategory].map((skill) => {
                    const hasSkill = period.skills.includes(skill);
                    return (
                      <div
                        key={skill}
                        className={`text-xs mb-1 p-1 rounded ${
                          hasSkill
                            ? 'bg-green-200 text-green-800 font-medium'
                            : 'text-gray-400'
                        }`}
                      >
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Transition Story */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">From Emergency Medicine to Technology Leadership</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Healthcare Foundation</h3>
              <p className="text-blue-100 mb-4">
                My background in emergency medicine provided a unique foundation in rapid assessment, 
                critical decision-making, and team coordination under pressure - skills that translate 
                directly to technology leadership and risk management.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Technology Evolution</h3>
              <p className="text-blue-100 mb-4">
                Transitioning to technology and finance, I've applied these foundational skills to 
                data analysis, process improvement, and team leadership, while developing expertise 
                in AI integration and strategic analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 