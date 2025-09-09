import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import JobPage from './pages/JobPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import AddJobPage from './pages/AddJobPage';

import EditJobPage from './pages/EditJobPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/add-job" element={<ProtectedRoute><AddJobPage /></ProtectedRoute>} />
        <Route path="/edit-job/:id" element={<ProtectedRoute><EditJobPage /></ProtectedRoute>} />
        <Route path="/job/:id" element={<ProtectedRoute><JobPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;