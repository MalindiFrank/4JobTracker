import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-brown-50 to-warm-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brown-600 to-warm-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-display font-semibold text-neutral-900">JobTracker</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 mb-6 leading-tight">
                Track Your
                <span className="bg-gradient-to-r from-brown-600 to-warm-600 bg-clip-text text-transparent"> Career Journey</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Your personal tool to manage and track job applications, helping you stay organized and focused on your career goals with a warm, intuitive interface.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Start Tracking Today
                </Link>
                <Link to="/login" className="btn-outline text-lg px-8 py-4">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white/50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Streamline your job search with powerful features designed to keep you organized and motivated.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card-elevated animate-slide-up">
                <div className="w-12 h-12 bg-gradient-to-br from-brown-500 to-brown-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                  Application Management
                </h3>
                <p className="text-neutral-600">
                  Keep track of all your job applications in one place with detailed status updates and notes.
                </p>
              </div>

              <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-warm-500 to-warm-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                  Progress Tracking
                </h3>
                <p className="text-neutral-600">
                  Visualize your job search progress with intuitive charts and analytics to stay motivated.
                </p>
              </div>

              <div className="card-elevated animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-gradient-to-br from-brown-500 to-warm-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                  Smart Reminders
                </h3>
                <p className="text-neutral-600">
                  Never miss a follow-up with intelligent reminders and deadline tracking for each application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card-elevated bg-gradient-to-br from-brown-50 to-warm-50 border-brown-200">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                Ready to Take Control of Your Career?
              </h2>
              <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have streamlined their job search with our intuitive tracking system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-ghost text-lg px-8 py-4">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-300 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-brown-600 to-warm-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-display font-semibold text-white">JobTracker</span>
            </div>
            <p className="text-sm text-neutral-400">
              © 2024 JobTracker. Built with care for your career success.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;