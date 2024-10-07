import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // Call useAuth to check if the user is authenticated

  // If the user is authenticated, redirect them to the homepage or another protected route
  return isAuthenticated ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <>{children}</> // If not authenticated, render the login or sign-up page
  );
};

export default AuthRoute;
