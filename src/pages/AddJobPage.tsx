import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddJobPage: React.FC = () => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interviewed' | 'Rejected'>('Applied');
  const [dateApplied, setDateApplied] = useState(new Date().toISOString().slice(0, 10));
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = { company, role, status, dateApplied };

    try {
      await fetch('http://localhost:5000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      navigate('/home');
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  return (
    <div>
      <h1>Add New Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Applied' | 'Interviewed' | 'Rejected')}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Date Applied</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;