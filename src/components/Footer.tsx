import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 mt-8">
      <div className="max-w-3xl mx-auto text-center text-gray-600 text-sm">
        <p>Bryan Stites &middot; Hammonton, NJ &middot; <a href="mailto:bryankstites@gmail.com" className="underline">bryankstites@gmail.com</a> &middot; <a href="https://linkedin.com/in/bryankstites" className="underline" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Bryan Stites. All rights reserved.</p>
      </div>
    </footer>
  );
} 