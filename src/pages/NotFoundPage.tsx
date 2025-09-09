import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-brown-50 to-warm-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-brown-100 to-warm-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-6xl font-display font-bold text-brown-400">404</div>
          </div>
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Link to="/" className="btn-primary w-full flex items-center justify-center py-3">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <Link to="/home" className="btn-outline w-full flex items-center justify-center py-3">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Applications
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-neutral-500">
          <p>If you think this is an error, please check the URL or try again later.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;