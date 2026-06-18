import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import FlashcardSystem from './components/FlashcardSystem';
import AnatomyViewer from './components/AnatomyViewer';
import ProgressDashboard from './components/ProgressDashboard';
import StudyTimer from './components/StudyTimer';
import Notes from './components/Notes';
import Settings from './components/Settings';
import { getAttempts } from './store/quizStore';
import { dayKey } from './utils/streak';
import './styles/theme.css';
import './styles/notes.css';
import './styles/dashboard.css';

function Navigation() {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/study', label: 'Study' },
    { to: '/notes', label: 'Notes' },
    { to: '/anatomy', label: 'Anatomy' },
    { to: '/settings', label: 'Settings' },
  ];
  return (
    <nav>
      <ul>
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className={location.pathname === l.to ? 'active' : ''}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Dashboard() {
  // Derive the set of days the learner has studied from their quiz history.
  const studyDates = getAttempts().map((a) => dayKey(new Date(a.takenAt)));
  return (
    <div className="dashboard">
      <StudyTimer />
      <ProgressDashboard studyDates={studyDates} />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>MedPrep — Medical Study App</h1>
          </header>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/study" element={<FlashcardSystem />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/anatomy" element={<AnatomyViewer />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
