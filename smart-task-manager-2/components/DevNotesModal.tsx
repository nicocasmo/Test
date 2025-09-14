
import React from 'react';

interface DevNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DevNotesModal: React.FC<DevNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 m-4 max-w-lg w-full transform transition-all duration-300 scale-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Developer Notes</h2>
          <button 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2">Deployment with Vercel & GitHub</h3>
            <p>
              This React application is perfectly structured for deployment on Vercel. 
              Simply connect your GitHub repository to a new Vercel project, and it will handle the build and deployment process automatically.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2">Database Recommendation</h3>
            <p>
              To persist your tasks, you'll need a database. For a seamless experience with Vercel, I recommend one of the following serverless options:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 pl-2">
              <li>
                <strong className="text-primary-600 dark:text-primary-400">Vercel Postgres:</strong> Fully managed, integrates directly into your Vercel project. Excellent performance and scalability.
              </li>
              <li>
                <strong className="text-primary-600 dark:text-primary-400">Supabase:</strong> An open-source Firebase alternative with a Postgres database, authentication, and auto-generated APIs.
              </li>
              <li>
                <strong className="text-primary-600 dark:text-primary-400">Firebase Firestore:</strong> A NoSQL document database that is easy to set up and has great real-time capabilities.
              </li>
            </ul>
            <p className="mt-3">
              All these options have generous free tiers, making them ideal for starting your project.
            </p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevNotesModal;