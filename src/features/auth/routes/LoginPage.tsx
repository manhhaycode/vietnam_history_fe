import { Button, Card, Divider } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import { useGetGoogleAuthUrlMutation, useVerifyTokenMutation } from '../api';
import toast from 'react-hot-toast';
import { popupWindow } from '@/libs/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetUserProfileMutation } from '@/features/user';
import { useAuthStore } from '@/libs/store';

export default function LoginPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const loginGoogleMutation = useGetGoogleAuthUrlMutation({
    onSuccess: (data) => {
      const handleMessage = (event: MessageEvent<any>) => {
        // check if the origin is the same
        if (event.origin !== window.location.origin || event.data !== 'GoogleOAuthSuccess') return;
        verifyTokenMutation.mutate(data.localToken);
        window.removeEventListener('message', handleMessage);
      };
      const popup = popupWindow(data.url, 'Google Auth', 500, 600);
      setIsPopupOpen(true);
      // when receive message from popup then verify token
      window.addEventListener('message', handleMessage);
      // check if the popup is closed
      const checkPopup = setInterval(() => {
        if (popup?.closed) {
          setIsPopupOpen(false);
          window.removeEventListener('message', handleMessage);
          clearInterval(checkPopup);
        }
      }, 1000);
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const verifyTokenMutation = useVerifyTokenMutation({
    onMutate: () => {
      toast.loading('Login in...', { id: 'login' });
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        userProfileMutation.mutate();
      }
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.', { id: 'login' });
    },
  });

  const userProfileMutation = useGetUserProfileMutation({
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Login successfully', { id: 'login' });
      setTimeout(() => {
        navigate('/');
      }, 200);
    },
  });

  useEffect(() => {
    if (Cookies.get('vn-history-at') || Cookies.get('vn-history-rt')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="h-[calc(100dvh)]">
      <div className="p-6 h-full w-full flex items-center justify-center">
        <Card shadow="lg" className="w-[400px] mx-auto">
          <div className="flex flex-col items-center p-6">
            <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <p className="text-xl font-medium">Welcome To HISVNAI</p>
            <p className="text-small text-default-500">Log in to your account to continue</p>
            <Divider className="my-6" />
            <Button
              isLoading={
                loginGoogleMutation.isPending ||
                isPopupOpen ||
                verifyTokenMutation.isPending ||
                userProfileMutation.isPending
              }
              onClick={() => loginGoogleMutation.mutate(self.location.origin + '/auth/google/callback')}
              fullWidth
              variant="faded"
              startContent={<FcGoogle size={24} />}
            >
              Continue with Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
