import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AlumniForm from './AlumniForm';
import FilterPage from './FilterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Alumni Portal</h1>
        <nav>
          <button className="nav-button">
            <Link to="/form">Fill Alumni Form</Link>
          </button>
          <button className="nav-button">
            <Link to="/filter">Filter Alumni Records</Link>
          </button>
        </nav>

        <Routes>
          <Route path="/form" element={<AlumniForm />} />
          <Route path="/filter" element={<FilterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
