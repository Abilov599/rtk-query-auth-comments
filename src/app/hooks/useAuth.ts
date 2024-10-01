import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/auth-slice/auth-slice';

export const useAuth = () => {
  const { user, accessToken } = useSelector(selectCurrentUser);

  const isAuthenticated = Boolean(accessToken && user);

  return useMemo(() => isAuthenticated, [isAuthenticated]);
};
