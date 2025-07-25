'use client';
import React, { useState } from 'react';
import Footer from '../../components/Footer';

export default function EMSLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-50 text-gray-900 min-h-screen'}>
      <div className="flex justify-end px-4 pt-2">
        <button
          className="rounded px-3 py-1 border text-sm font-medium shadow hover:bg-blue-100 dark:hover:bg-gray-800"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-8 min-h-[80vh]">
        {children}
      </main>
      <Footer />
    </div>
  );
} 