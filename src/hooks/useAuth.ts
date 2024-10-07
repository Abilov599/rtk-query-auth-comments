import { selectCurrentUser } from '@/redux/auth-slice';
import { useTypedSelector } from './store';

export const useAuth = () => {
  const { accessToken, user } = useTypedSelector(selectCurrentUser);
  const isAuthenticated = Boolean(accessToken);

  function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }

  return { isAuthenticated, user, logout };
};
