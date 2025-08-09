import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthContext';
import Layout from './Layout';
import Dashboard from './Dashboard';
import QuizSystem from './QuizSystem';
import FlashcardSystem from './FlashcardSystem';
import AnatomyViewer from './AnatomyViewer';
import BrainModel from './BrainModel';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="quiz" element={<QuizSystem />} />
              <Route path="flashcards" element={<FlashcardSystem />} />
              <Route path="anatomy" element={<AnatomyViewer />} />
              <Route path="brain" element={<BrainModel />} />
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
    </AuthProvider>
  );
}

export default App;
