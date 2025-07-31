import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { StudyProvider } from './contexts/StudyContext';

// Layout Components
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute';

// Page Components
import Dashboard from './pages/Dashboard';
import AnatomyViewer from './pages/AnatomyViewer';
import StudyTools from './pages/StudyTools';
import Progress from './pages/Progress';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

// Global Styles
import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StudyProvider>
          <Router>
            <div className="app">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                  <Route index element={<Dashboard />} />
                  <Route path="anatomy/:system?" element={<AnatomyViewer />} />
                  <Route path="study/:tool?" element={<StudyTools />} />
                  <Route path="progress" element={<Progress />} />
                  <Route path="resources" element={<Resources />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                }}
              />
            </div>
          </Router>
        </StudyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
