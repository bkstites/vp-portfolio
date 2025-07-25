import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">Bryan Stites</h1>
      <h2 className="text-2xl text-gray-700 mb-6">Technology Leader & Infrastructure Strategist</h2>
      <p className="mb-8 text-lg">
        I build resilient, secure, and people-focused technology systems. My mission is to empower technologists and organizations with modern infrastructure, automation, and AI-driven solutions.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link href="/about" className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition">About</Link>
        <Link href="/skills" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">Skills</Link>
        <Link href="/ai-vision" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">AI Vision</Link>
        <Link href="/projects" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">Projects</Link>
        <Link href="/contact" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">Contact</Link>
      </div>
      <p className="text-gray-500">Let’s connect and build the future of technology together.</p>
    </main>
  );
}
