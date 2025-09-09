import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditJobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied' as 'Applied' | 'Interviewed' | 'Rejected',
    dateApplied: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`);
        const data = await response.json();
        setFormData({
          company: data.company,
          role: data.role,
          status: data.status,
          dateApplied: new Date(data.dateApplied).toISOString().slice(0, 10)
        });
      } catch (error) {
        console.error('Failed to fetch job:', error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    if (!formData.dateApplied) {
      newErrors.dateApplied = 'Date applied is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await fetch(`http://localhost:5000/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, id }),
      });
      navigate('/home');
    } catch (error) {
      console.error('Failed to update job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-brown-50 to-warm-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-brown-600 to-warm-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-neutral-600">Loading application...</p>
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
            <Link to="/home" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brown-600 to-warm-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-display font-semibold text-neutral-900">JobTracker</span>
            </Link>
            <Link to="/home" className="btn-ghost">
              ← Back to Applications
            </Link>
          </div>
        </div>
      </nav>

      <div className="container-custom page-content">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
              Edit Application
            </h1>
            <p className="text-neutral-600">
              Update your job application details
            </p>
          </div>

          {/* Form */}
          <div className="card-elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                  Company Name *
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className={`input ${errors.company ? 'input-error' : ''}`}
                  placeholder="Enter company name"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-warm-600">{errors.company}</p>
                )}
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-2">
                  Job Role *
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className={`input ${errors.role ? 'input-error' : ''}`}
                  placeholder="Enter job role or position"
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-warm-600">{errors.role}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-2">
                  Application Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewed">Interviewed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label htmlFor="dateApplied" className="block text-sm font-medium text-neutral-700 mb-2">
                  Date Applied *
                </label>
                <input
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  value={formData.dateApplied}
                  onChange={handleChange}
                  required
                  className={`input ${errors.dateApplied ? 'input-error' : ''}`}
                />
                {errors.dateApplied && (
                  <p className="mt-1 text-sm text-warm-600">{errors.dateApplied}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn-primary flex justify-center items-center py-3"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Application...
                    </>
                  ) : (
                    'Update Application'
                  )}
                </button>
                
                <Link
                  to="/home"
                  className="flex-1 btn-outline flex justify-center items-center py-3"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;