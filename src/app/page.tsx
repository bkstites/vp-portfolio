import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-16 px-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/headshot.jpg"
          alt="Bryan Stites headshot"
          width={144}
          height={144}
          className="rounded-full shadow-lg object-cover mb-4"
          priority
        />
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2 drop-shadow-lg tracking-tight">Bryan Stites</h1>
        <h2 className="text-2xl text-blue-700 mb-4 font-semibold drop-shadow">Business Insights Leader & Data-Driven Innovator</h2>
      </div>
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl mb-8">
        <p className="mb-8 text-lg text-gray-800">
          I help organizations unlock meaningful metrics and actionable insights by harnessing the power of data and AI. My mission is to bridge the technology gap for associates—bringing superpowers to people, not just platforms. I believe in using data to inform business processes, drive smarter decisions, and empower teams to achieve more.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <Link href="/about" className="bg-blue-600 text-white px-5 py-2 rounded font-medium hover:bg-blue-700 transition">About</Link>
          <Link href="/skills" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">Strengths</Link>
          <Link href="/ai-vision" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">AI Vision</Link>
          <Link href="/projects" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">Projects</Link>
          <Link href="/contact" className="bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium hover:bg-gray-300 transition">Contact</Link>
        </div>
        <p className="text-gray-500 text-center">Let’s connect and build a smarter, more empowered future together.</p>
      </div>
    </main>
  );
}
