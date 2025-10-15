import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import SignIn from './components/auth/SignIn';
import BookingProvider from './context/BookingContext';
import AuthProvider, { useAuth } from './context/AuthContext';

function AppContent() {
  const { user, isLoading, login } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user is authenticated, show sign in page
  if (!user) {
    return <SignIn onLogin={login} />;
  }

  // If admin is authenticated, show admin dashboard
  if (user.type === 'admin') {
    return (
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/*" element={<AdminDashboard />} />
        </Routes>
      </Router>
    );
  }

  // If regular user is authenticated, show landing page
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
