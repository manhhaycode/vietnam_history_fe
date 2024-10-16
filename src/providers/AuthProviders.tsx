import { useRefreshTokenMutation } from '@/features/auth';
import { useGetUserProfileMutation } from '@/features/user';
import { useAuthStore } from '@/libs/store';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();
  const refreshTokenMutation = useRefreshTokenMutation({
    onSuccess: () => {
      userProfileMutation.mutate();
    },
  });

  const userProfileMutation = useGetUserProfileMutation({
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  useEffect(() => {
    const rt = Cookies.get('vn-history-rt');
    const at = Cookies.get('vn-history-at');
    if (at) {
      userProfileMutation.mutate();
    } else {
      if (rt) {
        refreshTokenMutation.mutate({ refreshToken: rt, userId: '' });
      } else {
        sessionStorage.removeItem('tattus-session');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
