import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DeveloperInterviews from './pages/DeveloperInterviews.jsx';
import News from './pages/News.jsx';
import PatchApp from './pages/PatchApp.jsx';
import Reviews from './pages/Reviews.jsx';
import Trends from './pages/Trends.jsx';
import AuthButton from './components/AuthButton.jsx';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Add a proper loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthButton />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/developer-interviews"
            element={
              <ProtectedRoute>
                <DeveloperInterviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patch-notes"
            element={
              <ProtectedRoute>
                <PatchApp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <Trends />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;