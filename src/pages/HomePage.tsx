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

  return (
    <div>
      <div>
        <h1>Job Application Tracker</h1>
        <Link to="/add-job">
          Add Job
        </Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={handleFilter}>
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select onChange={handleSort}>
          <option value="desc">Date Descending</option>
          <option value="asc">Date Ascending</option>
        </select>
      </div>

      <div>
        {filteredJobs.map(job => (
          <div key={job.id}>
            <h2>{job.company}</h2>
            <p>{job.role}</p>
            <p>
              {job.status}
            </p>
            <p>Applied on: {new Date(job.dateApplied).toLocaleDateString()}</p>
            <Link to={`/edit-job/${job.id}`}>Edit</Link>
            <button onClick={() => deleteJob(job.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;