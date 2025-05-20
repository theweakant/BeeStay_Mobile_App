// redux/hooks/useAuth.js
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token, role, loading, error } = useSelector((state) => state.auth);
  return { user, token, role, loading, error };
};
