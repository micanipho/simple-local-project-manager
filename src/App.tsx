import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import './App.css'; // Minimal styling

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>Simple Project Manager</h1>
          </Link>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;