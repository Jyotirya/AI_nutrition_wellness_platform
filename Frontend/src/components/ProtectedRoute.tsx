import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('access');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function Alreadyloggedin({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('access');
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
