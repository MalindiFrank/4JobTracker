import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Welcome to the Job Application Tracker</h1>
        <p>Your personal tool to manage and track your job applications, helping you stay organized and focused on your career goals.</p>
        <div>
          <Link to="/login">
            Login
          </Link>
          <Link to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;