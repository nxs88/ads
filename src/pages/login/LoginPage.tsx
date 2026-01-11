import { LoginForm } from '@features/auth/ui/LoginForm';
import { useAuth } from '@shared/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const LoginPage = () => {
  const user = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <LoginForm />;
};
