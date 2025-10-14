import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import BookingProvider from './context/BookingContext';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
