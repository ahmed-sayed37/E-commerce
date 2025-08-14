import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

export default function ProtectedRoutes({ children }) {
  const { token, setToken } = useContext(authContext);

  useEffect(() => {
    if (token && !isValidToken(token)) {
      setToken(null);
      localStorage.removeItem('token');
      toast.error('حرامي!❌❌❌');
    }
  }, [token, setToken]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function isValidToken(token) {
  if (!token || typeof token !== 'string' || token.trim() === '') return false;
  return token.length > 20;
}
