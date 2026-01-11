import { Navigate } from 'react-router-dom';
import { useAuth } from '@shared/hooks/useAuth';
import { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
