'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { getUser, verifyToken, logout } from '@/lib/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verificar si hay un usuario en localStorage
        const localUser = getUser();
        if (localUser) {
          setUser(localUser);
          setIsAuthenticated(true);
          
          // Verificar si el token sigue siendo válido
          const isValid = await verifyToken();
          if (!isValid) {
            // Token inválido, limpiar estado
            setUser(null);
            setIsAuthenticated(false);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('user');
            }
          }
        }
      } catch (error) {
        console.error('Error inicializando autenticación:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
