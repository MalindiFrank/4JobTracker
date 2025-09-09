import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditJobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interviewed' | 'Rejected'>('Applied');
  const [dateApplied, setDateApplied] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/jobs/${id}`);
        const data = await response.json();
        setCompany(data.company);
        setRole(data.role);
        setStatus(data.status);
        setDateApplied(new Date(data.dateApplied).toISOString().slice(0, 10));
      } catch (error) {
        console.error('Failed to fetch job:', error);
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedJob = { id, company, role, status, dateApplied };

    try {
      await fetch(`http://localhost:5000/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
      navigate('/home');
    } catch (error) {
      console.error('Failed to update job:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        {/* Form fields are the same as AddJobPage, just pre-filled */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
          <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <input type="text" value={role} onChange={e => setRole(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value as 'Applied' | 'Interviewed' | 'Rejected')} className="shadow border rounded w-full py-2 px-3 text-gray-700">
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date Applied</label>
          <input type="date" value={dateApplied} onChange={e => setDateApplied(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobPage;