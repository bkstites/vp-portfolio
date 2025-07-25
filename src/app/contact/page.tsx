import React from 'react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex flex-col items-center justify-center">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-lg tracking-tight text-center">Let’s Connect</h1>
        <p className="mb-6 text-lg text-gray-800 text-center">
          Interested in building a more data-driven, empowered organization? I’m always open to connecting with leaders and teams who want to use business insights and AI to bridge technology gaps and unlock new potential for their people.
        </p>
        <form className="bg-blue-50 rounded-lg shadow p-6 space-y-4 max-w-md mx-auto">
          <div>
            <label className="block mb-1 font-medium text-blue-900">Name</label>
            <input type="text" className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your name" disabled />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">Email</label>
            <input type="email" className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your email" disabled />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">Message</label>
            <textarea className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} placeholder="Your message" disabled />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold cursor-not-allowed opacity-70" disabled>Send (Coming Soon)</button>
        </form>
        <div className="mt-6 text-center text-blue-800">
          <p>Email: <a href="mailto:bryankstites@gmail.com" className="underline">bryankstites@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/bryankstites" className="underline" target="_blank" rel="noopener noreferrer">linkedin.com/in/bryankstites</a></p>
        </div>
      </div>
    </main>
  );
} 