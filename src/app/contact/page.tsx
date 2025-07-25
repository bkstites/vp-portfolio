import React from 'react';

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <div className="mb-6">
        <p className="mb-1">Bryan Stites</p>
        <p className="mb-1">6 Bowling Ln, Hammonton, NJ 08037</p>
        <p className="mb-1">(215) 983-9993</p>
        <p className="mb-1">bryankstites@gmail.com</p>
        <a href="https://linkedin.com/in/bryankstites" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">linkedin.com/in/bryankstites</a>
      </div>
      <form className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Your name" disabled />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" className="w-full border rounded px-3 py-2" placeholder="Your email" disabled />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="Your message" disabled />
        </div>
        <button type="submit" className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>Send (Coming Soon)</button>
      </form>
    </main>
  );
} 