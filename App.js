import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Hom from './Hom';
import Get from './Get';
import Form from './Form';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/hom" element={<Hom />} />
            <Route path="/get" element={<ProtectedRoute><Get /></ProtectedRoute>} />
            <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
