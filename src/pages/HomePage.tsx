import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Define the Job type
interface Job {
  id: number;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewed' | 'Rejected';
  dateApplied: string;
}

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    updateUrlParams({ search: event.target.value });
  };

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    updateUrlParams({ status: event.target.value });
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
    updateUrlParams({ sort: event.target.value });
  };

  const updateUrlParams = (paramsToUpdate: { [key: string]: string }) => {
    const params = new URLSearchParams(location.search);
    Object.keys(paramsToUpdate).forEach(key => {
      if (paramsToUpdate[key]) {
        params.set(key, paramsToUpdate[key]);
      } else {
        params.delete(key);
      }
    });
    navigate({ search: params.toString() });
  };

  const deleteJob = async (jobId: number) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await fetch(`http://localhost:5000/jobs/${jobId}`, {
          method: 'DELETE',
        });
        setJobs(jobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

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

  const filteredJobs = jobs
    .filter(job =>
      (job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter ? job.status === statusFilter : true)
    )
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
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
          <p className="text-neutral-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

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
              <span className="text-sm text-neutral-600">
                Welcome back!
              </span>
              <button
                onClick={handleLogout}
                className="btn-ghost text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-custom page-content">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
                Your Applications
              </h1>
              <p className="text-neutral-600">
                Track and manage your job applications in one place
              </p>
            </div>
            <Link to="/add-job" className="btn-primary mt-4 sm:mt-0 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Application
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">{jobs.length}</p>
                  <p className="text-sm text-neutral-600">Total Applications</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-warm-500 to-warm-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">
                    {jobs.filter(job => job.status === 'Interviewed').length}
                  </p>
                  <p className="text-sm text-neutral-600">Interviews</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">
                    {Math.round((jobs.filter(job => job.status === 'Interviewed').length / Math.max(jobs.length, 1)) * 100)}%
                  </p>
                  <p className="text-sm text-neutral-600">Interview Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Search Applications
              </label>
              <input
                type="text"
                placeholder="Search by company or role..."
                value={searchTerm}
                onChange={handleSearch}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={handleFilter}
                className="input"
              >
                <option value="">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interviewed">Interviewed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Sort by Date
              </label>
              <select
                value={sortOrder}
                onChange={handleSort}
                className="input"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Applications */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-brown-100 to-warm-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-neutral-900 mb-2">
                {searchTerm || statusFilter ? 'No applications found' : 'No applications yet'}
              </h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm || statusFilter 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start tracking your job applications by adding your first one'
                }
              </p>
              {!searchTerm && !statusFilter && (
                <Link to="/add-job" className="btn-primary">
                  Add Your First Application
                </Link>
              )}
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <div key={job.id} className="card-elevated animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-brown-500 to-brown-600 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">
                          {job.company.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-semibold text-neutral-900">
                          {job.company}
                        </h3>
                        <p className="text-neutral-600">{job.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Applied {new Date(job.dateApplied).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`badge ${getStatusBadge(job.status)} flex items-center`}>
                      {getStatusIcon(job.status)}
                      <span className="ml-1">{job.status}</span>
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/edit-job/${job.id}`}
                        className="btn-ghost p-2"
                        title="Edit application"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="btn-ghost p-2 text-warm-600 hover:text-warm-700 hover:bg-warm-50"
                        title="Delete application"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;