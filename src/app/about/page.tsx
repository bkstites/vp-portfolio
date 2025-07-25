import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
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
      <h1 className="text-4xl font-bold mb-4">About Bryan Stites</h1>
      <p className="mb-6 text-lg">
        I’m Bryan Stites, a technology leader with over a decade of experience at the intersection of operations, systems, and people. I build infrastructure that’s reliable, secure, and designed for real-world users. Having grown up and worked in South Jersey, I’m personally invested in strengthening the technology backbone of our region.
      </p>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Leadership Style</h2>
        <p>
          My approach to leadership is people-first. Whether supporting engineers, vendors, or senior stakeholders, I bring clarity, steady direction, and accountability. I believe in building resilient, adaptable systems and mentoring high-performing teams to deliver meaningful, local impact.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Local Commitment</h2>
        <p>
          I’m passionate about serving South Jersey and helping organizations modernize and secure their technology infrastructure for the future.
        </p>
      </section>
    </main>
  );
} 