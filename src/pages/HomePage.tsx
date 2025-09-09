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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Application Tracker</h1>
        <Link to="/add-job" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Job
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <select onChange={handleFilter} className="p-2 border border-gray-300 rounded w-full md:w-auto">
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select onChange={handleSort} className="p-2 border border-gray-300 rounded w-full md:w-auto">
          <option value="desc">Date Descending</option>
          <option value="asc">Date Ascending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{job.company}</h2>
            <p className="text-gray-600">{job.role}</p>
            <p className={`text-sm font-medium ${job.status === 'Applied' ? 'text-yellow-500' : job.status === 'Interviewed' ? 'text-green-500' : 'text-red-500'}`}>
              {job.status}
            </p>
            <p className="text-xs text-gray-500">Applied on: {new Date(job.dateApplied).toLocaleDateString()}</p>
            <Link to={`/edit-job/${job.id}`} className="text-blue-500 hover:underline mt-2 mr-4 inline-block">Edit</Link>
            <button onClick={() => deleteJob(job.id)} className="text-red-500 hover:underline mt-2 inline-block">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;