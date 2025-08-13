import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // <-- Import Google OAuth Provider
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Patient from './components/Patient';
import Doctor from './components/Doctors';
import Admin from './components/Admins';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Replace with your actual client ID */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
