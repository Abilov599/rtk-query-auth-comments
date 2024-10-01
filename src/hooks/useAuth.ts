import { useNavigate } from 'react-router-dom';
import { resetStore, selectCurrentUser } from '@/redux/auth-slice';
import { useAppDispatch, useTypedSelector } from './store';

export const useAuth = () => {
  const { accessToken, user } = useTypedSelector(selectCurrentUser);
  const isAuthenticated = Boolean(accessToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(resetStore());
    localStorage.removeItem('accessToken');
    navigate('/login');
    window.location.reload();
  }

  return { isAuthenticated, user, logout };
};
