import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Define the Job type
interface Job {
  id: number;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewed' | 'Rejected';
  dateApplied: string;
  duties?: string;
  requirements?: string;
}

const JobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error('Failed to fetch job:', error);
        navigate('/404');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJob();
  }, [id, navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'badge-info';
      case 'Interviewed':
        return 'badge-warning';
      case 'Rejected':
        return 'badge-neutral';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Applied':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Interviewed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'Rejected':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-brown-50 to-warm-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-brown-600 to-warm-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-neutral-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-brown-50 to-warm-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brown-600 to-warm-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-display font-semibold text-neutral-900">JobTracker</span>
            </Link>
            <button onClick={() => navigate(-1)} className="btn-ghost">
              ← Back
            </button>
          </div>
        </div>
      </nav>

      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="card-elevated mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brown-500 to-brown-600 rounded-2xl flex items-center justify-center mr-6">
                  <span className="text-white font-bold text-2xl">
                    {job.company.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                    {job.company}
                  </h1>
                  <p className="text-xl text-neutral-600 mb-4">{job.role}</p>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Applied {new Date(job.dateApplied).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`badge ${getStatusBadge(job.status)} flex items-center text-lg px-4 py-2`}>
                  {getStatusIcon(job.status)}
                  <span className="ml-2">{job.status}</span>
                </span>
                
                <Link
                  to={`/edit-job/${job.id}`}
                  className="btn-primary flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {job.duties && (
                <div className="card">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    Job Duties
                  </h3>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{job.duties}</p>
                  </div>
                </div>
              )}

              {job.requirements && (
                <div className="card">
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-warm-500 to-warm-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Requirements
                  </h3>
                  <div className="prose prose-neutral max-w-none">
                    <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{job.requirements}</p>
                  </div>
                </div>
              )}

              {!job.duties && !job.requirements && (
                <div className="card text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-brown-100 to-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2">
                    No additional details
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    This application doesn't have additional job duties or requirements recorded.
                  </p>
                  <Link to={`/edit-job/${job.id}`} className="btn-outline">
                    Add Details
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
                  Application Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-brown-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Application Submitted</p>
                      <p className="text-xs text-neutral-500">{new Date(job.dateApplied).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  {job.status === 'Interviewed' && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-warm-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Interview Scheduled</p>
                        <p className="text-xs text-neutral-500">Status updated</p>
                      </div>
                    </div>
                  )}
                  
                  {job.status === 'Rejected' && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-neutral-400 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">Application Closed</p>
                        <p className="text-xs text-neutral-500">Status updated</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    to={`/edit-job/${job.id}`}
                    className="w-full btn-outline flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Application
                  </Link>
                  
                  <button
                    onClick={() => navigate(-1)}
                    className="w-full btn-ghost flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;