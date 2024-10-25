// create hoocs withAuthencation to check if user is authenticated or not and redirect to login page if not authenticated or expired token
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/libs/store';
import Cookies from 'js-cookie';

export default function WithAuthencation() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const rt = Cookies.get('vn-history-rt');
  const at = Cookies.get('vn-history-at');

  useEffect(() => {
    if (!at || !rt) {
      navigate('/login');
    }
  }, [navigate, user, at, rt]);

  return rt && at && <Outlet />;
}
