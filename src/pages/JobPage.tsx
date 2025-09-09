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
    <div>
      <div>
        <h1>{job.company}</h1>
        <h2>{job.role}</h2>
        <p>
          Status: {job.status}
        </p>
        <p>Applied on: {new Date(job.dateApplied).toLocaleDateString()}</p>
        {job.duties && <div>
          <h3>Duties:</h3>
          <p>{job.duties}</p>
        </div>}
        {job.requirements && <div>
          <h3>Requirements:</h3>
          <p>{job.requirements}</p>
        </div>}
        <button onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default JobPage;