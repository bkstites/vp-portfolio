import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/headshot.jpg"
            alt="Bryan Stites headshot"
            width={144}
            height={144}
            className="rounded-full shadow-lg object-cover mb-4"
            priority
          />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">About Bryan Stites</h1>
        <p className="mb-6 text-lg text-gray-800">
          I’m Bryan Stites, a technology leader with over a decade of experience at the intersection of operations, systems, and people. I build infrastructure that’s reliable, secure, and designed for real-world users. Having grown up and worked in South Jersey, I’m personally invested in strengthening the technology backbone of our region.
        </p>
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-2 drop-shadow">Leadership Style</h2>
          <p className="text-gray-700">
            My approach to leadership is people-first. Whether supporting engineers, vendors, or senior stakeholders, I bring clarity, steady direction, and accountability. I believe in building resilient, adaptable systems and mentoring high-performing teams to deliver meaningful, local impact.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-2 drop-shadow">Local Commitment</h2>
          <p className="text-gray-700">
            I’m passionate about serving South Jersey and helping organizations modernize and secure their technology infrastructure for the future.
          </p>
        </section>
      </div>
    </main>
  );
} 