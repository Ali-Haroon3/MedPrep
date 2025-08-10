import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav>
      <ul>
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link></li>
        <li><Link to="/study" className={location.pathname === '/study' ? 'active' : ''}>Study Tools</Link></li>
        <li><Link to="/anatomy" className={location.pathname === '/anatomy' ? 'active' : ''}>Anatomy</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>MedPrep - Medical Study App</h1>
          <p>Welcome to your medical study platform!</p>
        </header>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={
              <div className="dashboard">
                <h2>Dashboard</h2>
                <p>Your study dashboard is coming soon!</p>
                <p>Track your progress, view study statistics, and manage your learning goals.</p>
              </div>
            } />
            <Route path="/study" element={
              <div className="study-tools">
                <h2>Study Tools</h2>
                <p>Quiz and flashcard systems coming soon!</p>
                <p>Practice with interactive quizzes and review with spaced repetition flashcards.</p>
              </div>
            } />
            <Route path="/anatomy" element={
              <div className="anatomy">
                <h2>3D Anatomy Viewer</h2>
                <p>Interactive anatomy models coming soon!</p>
                <p>Explore detailed 3D models of human anatomy with interactive features.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
