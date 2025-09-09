import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
      }
    };
    fetchJob();
  }, [id, navigate]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-2">{job.company}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">{job.role}</h2>
        <p className={`text-lg font-medium mb-4 ${job.status === 'Applied' ? 'text-yellow-500' : job.status === 'Interviewed' ? 'text-green-500' : 'text-red-500'}`}>
          Status: {job.status}
        </p>
        <p className="text-md text-gray-600 mb-4">Applied on: {new Date(job.dateApplied).toLocaleDateString()}</p>
        {job.duties && <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Duties:</h3>
          <p className="text-gray-600">{job.duties}</p>
        </div>}
        {job.requirements && <div>
          <h3 className="font-semibold text-gray-800">Requirements:</h3>
          <p className="text-gray-600">{job.requirements}</p>
        </div>}
        <button onClick={() => navigate(-1)} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </div>
    </div>
  );
};

export default JobPage;