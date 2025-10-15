import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const userAuth = localStorage.getItem('userAuth');
    if (userAuth) {
      try {
        const userData = JSON.parse(userAuth);
        if (userData.isAuthenticated) {
          setUser(userData);
        }
      } catch (error) {
        localStorage.removeItem('userAuth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userType, username) => {
    const userData = {
      type: userType,
      username: username,
      isAuthenticated: true
    };
    setUser(userData);
    localStorage.setItem('userAuth', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userAuth');
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.type === 'admin',
    isUser: user?.type === 'user',
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
