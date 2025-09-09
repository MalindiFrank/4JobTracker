import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Job Application Tracker</h1>
        <p className="text-lg text-gray-600 mb-8">Your personal tool to manage and track your job applications, helping you stay organized and focused on your career goals.</p>
        <div className="flex justify-center gap-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
          <Link to="/register" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;